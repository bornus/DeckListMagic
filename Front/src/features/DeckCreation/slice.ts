import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'mtgsdk-ts';

import { DeckCreation, EnhancedCard, DeckListConfig } from './types';
// import { Commander } from './deckTypes/commander';
// import { Test } from './deckTypes/test';

const initialState: DeckCreation = {
  selectedList: 0,
  deckListConfig: undefined,
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {
    newDeck(state: DeckCreation, action: PayloadAction<DeckListConfig>): void {
      state.loading = false;
      state.deckListConfig = {
        ...action.payload, 
        canAddCard: action.payload.canAddCard,
      };
      console.log('deckListConfig', action.payload, state.deckListConfig)
      // state.deckListConfig.lists = Array(action.payload.listCount).fill([]);
      state.selectedList = 0;
    },
    addCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckListConfig) {
        if (state.deckListConfig.canAddCard(action.payload, state.selectedList)) {
          const index = state.deckListConfig.lists[state.selectedList].map(({ id }) => id).indexOf(action.payload.id);
          if (index > -1) {
            state.deckListConfig.lists[state.selectedList][index].quantity += 1;
          } else state.deckListConfig.lists[state.selectedList].push({ ...action.payload, quantity: 1 });
        }
      }
    },
    setCommander(state: DeckCreation, action: PayloadAction<Card>): void {
      if (state.deckListConfig?.hasCommander) {
        state.deckListConfig.commander = action.payload;
      }
    },
    unsetCommander(state: DeckCreation): void {
      if (state.deckListConfig?.hasCommander) {
        state.deckListConfig.commander = null;
      }
    },
    removeCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckListConfig) {
        const index = state.deckListConfig.lists[state.selectedList].map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          if (state.deckListConfig.lists[state.selectedList][index].quantity > 1)
            state.deckListConfig.lists[state.selectedList][index].quantity -= 1;
          else state.deckListConfig.lists[state.selectedList].splice(index, 1);
        }
      }
    },
    selectDeck(state: DeckCreation, action: PayloadAction<number>): void {
      if (state.deckListConfig) {
        state.selectedList = action.payload;
      }
    },
  },
});

export default slice.reducer;

export const { newDeck, addCard, setCommander, unsetCommander, removeCard, selectDeck } = slice.actions;
