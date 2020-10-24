import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'mtgsdk-ts';

import { DeckCreation, EnhancedCard, DeckConfig } from './types';
// import { Commander } from './deckTypes/commander';
// import { Test } from './deckTypes/test';

const initialState: DeckCreation = {
  lists: [[]],
  selectedList: 0,
  deckConfig: undefined,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {
    newDeck(state: DeckCreation, action: PayloadAction<DeckConfig>): void {
      state.loading = false;
      state.deckConfig = { ...action.payload };
      state.lists = Array(action.payload.listCount).fill([]);
      state.selectedList = 0;
    },
    addCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckConfig && state.lists) {
        if (state.deckConfig.canAddCard(action.payload)) {
          const index = state.lists[state.selectedList].map(({ id }) => id).indexOf(action.payload.id);
          if (index > -1) {
            state.lists[state.selectedList][index].quantity += 1;
          } else state.lists[state.selectedList].push({ ...action.payload, quantity: 1 });
        }
      }
    },
    removeCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckConfig && state.lists) {
        const index = state.lists[state.selectedList].map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          if (state.lists[state.selectedList][index].quantity > 1) state.lists[state.selectedList][index].quantity -= 1;
          else state.lists[state.selectedList].splice(index, 1);
        }
      }
    },
    selectDeck(state: DeckCreation, action: PayloadAction<number>): void {
      if (state.deckConfig) {
        state.selectedList = action.payload;
      }
    },
  },
});

export default slice.reducer;

export const { newDeck, addCard, removeCard, selectDeck } = slice.actions;
