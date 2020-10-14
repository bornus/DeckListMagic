import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeckCreation, EnhancedCard, SelectedDeck } from './types';

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
      state.loading = false;
      state.deck = {
        type: 'test',
        selected: SelectedDeck.main,
        mainDeck: [],
        sideDeck: [],
      };
    },
    addCardToMainDeck(state: DeckCreation, action: PayloadAction<EnhancedCard>): void {
      state.loading = false;
      state.deck?.mainDeck.push(action.payload);
    },
    addCardToSideDeck(state: DeckCreation, action: PayloadAction<EnhancedCard>): void {
      state.loading = false;
      state.deck?.sideDeck.push(action.payload);
    },
  },
});

export default slice.reducer;

export const { newDeck, addCardToMainDeck, addCardToSideDeck } = slice.actions;
