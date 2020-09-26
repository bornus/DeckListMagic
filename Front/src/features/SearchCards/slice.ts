import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { RootState } from 'authentificatedPages/rootReducer';
import { SearchCards, Card, Error } from './types';

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
const timeout = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const searchCards = (name: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<void> => {
  try {
    dispatch(authSlice.actions.searchCards());
    console.log('Search with: ', name);

    // const response = await axios.get(`https://api.scryfall.com/cards/search?order=cmc&q=${encodeURI(name)}`);
    const { data } = await axios.request<Card[]>({
      url: `https://api.magicthegathering.io/v1/cards?name=${encodeURI(name)}`,
      // url: `https://api.scryfall.com/cards/search?order=cmc&q=${encodeURI(name)}`,
      // transformResponse: (r: CardSearchServerResponse) => r.data,
    });

    // const { cardsFound } = getState().searchCards;
    dispatch(authSlice.actions.searchCardsSuccess(data));
  } catch (e) {
    dispatch(authSlice.actions.searchCardsError(e));
  }
};
