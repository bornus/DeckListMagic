import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
