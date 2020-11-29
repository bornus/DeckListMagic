import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Card } from 'mtgsdk-ts';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { SearchCards, Error, CardSearchServerResponse } from './types';
import { decodeLinksFromHeader } from 'utils/apiUtils';
import { RootState } from 'authentificatedPages/rootReducer';

const initialState: SearchCards = {
  cardsFound: [],
  loading: false,
  error: undefined,
  requestId: 0,
};

const authSlice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {
    searchCards(state: SearchCards, action: PayloadAction<number>): void {
      state.loading = true;
      state.requestId = action.payload;
    },
    searchCardsSuccess(state: SearchCards, action: PayloadAction<Card[]>): void {
      state.loading = false;
      state.cardsFound = action.payload;
    },
    searchCardsPush(state: SearchCards, action: PayloadAction<Card[]>): void {
      state.loading = false;
      state.cardsFound = state.cardsFound.concat(action.payload);
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

// Load up to 100 cards
export const searchCards = (name: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<void> => {
  try {
    let { requestId: originRequestId } = getState().searchCards;
    originRequestId = originRequestId + 1;
    dispatch(authSlice.actions.searchCards(originRequestId));

    let nextRequest:string = `https://api.magicthegathering.io/v1/cards?name=${encodeURI(name)}`;
    let hasNext = true;
    do {
      // See https://github.com/MagicTheGathering/mtg-sdk-typescript
      // const cards = await Magic.Cards.where({ name: encodeURI(name) });
      const {
        data: { cards },
        headers,
        status,
      } = await axios.get<CardSearchServerResponse>(nextRequest);

      // Check if success and if the request is alway expexted
      if (status === 200 && getState().searchCards.requestId === originRequestId) {
        dispatch(
          authSlice.actions.searchCardsPush(
            // Filter all cards to remove CardName duplicates
            cards.filter(({ name: refName }, pos, arr) => arr.map(({ name }) => name).indexOf(refName) === pos),
          ),
        );

        const links = decodeLinksFromHeader(headers.link);
        if(links.next) {
          nextRequest = links.next;
        } else {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }
    } while (hasNext && getState().searchCards.cardsFound.length < 100);

  } catch (e) {
    dispatch(authSlice.actions.searchCardsError(e));
  }
};
