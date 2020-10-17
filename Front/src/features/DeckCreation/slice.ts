import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'mtgsdk-ts';

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
    addCardToMainDeck(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deck) {
        const index = state.deck.mainDeck.map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          state.deck.mainDeck[index].quantity += 1;
        } else state.deck.mainDeck.push({ ...action.payload, quantity: 1 });
      }
    },
    addCardToSideDeck(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deck) {
        const index = state.deck.sideDeck.map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          state.deck.sideDeck[index].quantity += 1;
        } else state.deck.sideDeck.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCardToMainDeck(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deck) {
        const index = state.deck.mainDeck.map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          if (state.deck.mainDeck[index].quantity > 1) state.deck.mainDeck[index].quantity -= 1;
          else state.deck.mainDeck.splice(index, 1);
        }
      }
    },
    removeCardToSideDeck(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deck) {
        const index = state.deck.sideDeck.map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          if (state.deck.sideDeck[index].quantity > 1) state.deck.sideDeck[index].quantity -= 1;
          else state.deck.sideDeck.splice(index, 1);
        }
      }
    },
    selectDeck(state: DeckCreation, action: PayloadAction<SelectedDeck>): void {
      if (state.deck) {
        state.deck.selected = action.payload;
      }
    },
  },
});

export default slice.reducer;

export const {
  newDeck,
  addCardToMainDeck,
  addCardToSideDeck,
  removeCardToMainDeck,
  removeCardToSideDeck,
  selectDeck,
} = slice.actions;
