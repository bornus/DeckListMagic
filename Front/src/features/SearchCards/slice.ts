import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Card } from 'mtgsdk-ts';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { SearchCards, Error, CardSearchServerResponse } from './types';

const initialState: SearchCards = {
  cardsFound: [],
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {
    searchCards(state: SearchCards): void {
      state.loading = true;
    },
    searchCardsSuccess(state: SearchCards, action: PayloadAction<Card[]>): void {
      state.loading = false;
      state.cardsFound = action.payload;
    },
    searchCardsError(state: SearchCards, action: PayloadAction<Error>): void {
      state.loading = false;
      state.cardsFound = [];
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;

// For mock and demo
// const timeout = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const searchCards = (name: string): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(authSlice.actions.searchCards());

    // See https://github.com/MagicTheGathering/mtg-sdk-typescript
    // const cards = await Magic.Cards.where({ name: encodeURI(name) });
    const {
      data: { cards },
    } = await axios.request<CardSearchServerResponse>({
      url: `https://api.magicthegathering.io/v1/cards?name=${encodeURI(name)}`,
    });

    dispatch(
      authSlice.actions.searchCardsSuccess(
        // Filter all cards to remove CardName duplicates
        cards.filter(({ name: refName }, pos, arr) => arr.map(({ name }) => name).indexOf(refName) === pos),
      ),
    );
  } catch (e) {
    dispatch(authSlice.actions.searchCardsError(e));
  }
};
