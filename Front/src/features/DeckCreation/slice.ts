import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Magic, { Card } from 'mtgsdk-ts';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { RootState } from 'authentificatedPages/rootReducer';
import { DeckCreation, EnhancedCard } from './types';

const initialState: DeckCreation = {
  deck: undefined,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {
    newDeck(state: DeckCreation): void {
      state.loading = true;
    },
    addCardToMainDeck(state: DeckCreation, action: PayloadAction<EnhancedCard>): void {
      state.loading = false;
      state.deck?.mainDeck.push(action.payload);
    },
  },
});

export default slice.reducer;

export const { newDeck, addCardToMainDeck } = slice.actions;
