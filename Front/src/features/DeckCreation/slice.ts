import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from 'mtgsdk-ts';
import { API, Auth } from 'aws-amplify';
import axios from 'axios';

import { DeckCreation } from './types';
import { EnhancedCard, DeckListConfig } from 'models/deckTypes';
import { CardInfo, DeckConfig as BackDeckConfig } from 'models/backTypes';
import { putAction, postAction, getAction } from 'utils/apiUtils';
import { fromBackModel, toBackModel } from 'models/deckTypes/convert';
// import { Commander } from './deckTypes/commander';
// import { Test } from './deckTypes/test';
import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { RootState } from 'authentificatedPages/rootReducer';

const initialState: DeckCreation = {
  selectedList: 0,
  deckListConfig: undefined,
  loading: false,
  error: undefined,
  save: {
    loading: false,
    error: undefined,
  },
  load: {
    loading: false,
    error: undefined,
  },
};

const slice = createSlice({
  name: 'deckCreation',
  initialState,
  reducers: {
    newDeck(state: DeckCreation, action: PayloadAction<DeckListConfig>): void {
      state.loading = false;
      state.deckListConfig = {
        ...action.payload,
        canAddCard: action.payload.canAddCard,
        canAddCardToMainDeck: action.payload.canAddCardToMainDeck,
        canAddCardToSideDeck: action.payload.canAddCardToSideDeck,
      };
      console.log('deckListConfig', action.payload, state.deckListConfig);
      // state.deckListConfig.lists = Array(action.payload.listCount).fill([]);
      state.selectedList = 0;
    },
    addCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckListConfig) {
        if(
          (state.selectedList == 0 && state.deckListConfig.canAddCardToMainDeck(action.payload))
          || (state.selectedList == 1 && state.deckListConfig.canAddCardToSideDeck(action.payload))
        ) {
          const deck = state.selectedList == 0 ? state.deckListConfig.mainDeck : state.deckListConfig.sideDeck

          const index = deck.map(({ id }) => id).indexOf(action.payload.id);
          if (index > -1) {
            deck[index].quantity += 1;
          } else deck.push({ ...action.payload, quantity: 1 });
        }
      }
    },
    removeCard(state: DeckCreation, action: PayloadAction<EnhancedCard | Card>): void {
      if (state.deckListConfig) {
        const deck = state.selectedList == 0 ? state.deckListConfig.mainDeck : state.deckListConfig.sideDeck
        const index = deck.map(({ id }) => id).indexOf(action.payload.id);
        if (index > -1) {
          if (deck[index].quantity > 1)
            deck[index].quantity -= 1;
          else deck.splice(index, 1);
        }
      }
    },
    selectDeck(state: DeckCreation, action: PayloadAction<number>): void {
      if (state.deckListConfig) {
        state.selectedList = action.payload;
      }
    },

    saveDeckListStart(state: DeckCreation) {
      state.save.loading = true;
    },
    saveDeckListSuccess(state: DeckCreation) {
      state.save.loading = false;
    },
    saveDeckListError(state: DeckCreation, action: PayloadAction<Error>) {
      state.save.loading = false;
      state.save.error = action.payload;
    },

    loadDeckListStart(state: DeckCreation) {
      state.load.loading = true;
      state.loading = true;
    },
    loadDeckListSuccess(state: DeckCreation, action: PayloadAction<DeckListConfig>) {
      state.load.loading = false;
      state.loading = false;
      state.deckListConfig = {
        ...action.payload,
        canAddCard: action.payload.canAddCard,
      };
      state.selectedList = 0;
    },
    loadDeckListError(state: DeckCreation, action: PayloadAction<Error>) {
      state.load.loading = false;
      state.loading = true;
      state.load.error = action.payload;
    },
  },
});

export default slice.reducer;

export const { newDeck, addCard, removeCard, selectDeck } = slice.actions;

export const saveDeckListConfig = (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { deckListConfig } = getState().deckCreation;
    if (deckListConfig) {
      dispatch(slice.actions.saveDeckListStart());

      const deckToSave = toBackModel(deckListConfig);
      if(deckToSave.Id) {
        await putAction({
          body: deckToSave,
          path: 'deck',
        });
      } else {
        await postAction({
          body: deckToSave,
          path: 'deck',
        });
      }

      dispatch(slice.actions.saveDeckListSuccess());
    }
  } catch (e) {
    dispatch(slice.actions.saveDeckListError(e));
  }
};

type CardIdServerResponse = {
  card: Card
}

export const loadDeckListConfig = (id: string): AppThunk => async (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  try {
    dispatch(slice.actions.loadDeckListStart());

    const deckConfig:BackDeckConfig = await getAction({ path: 'deck' });

    if (deckConfig) {
      const newDeckConfig = fromBackModel(deckConfig)
      dispatch(slice.actions.loadDeckListSuccess(newDeckConfig));

      // Use Set to remove duplicates and push into an array
      const idsSet:Set<String> = new Set();
      
      if(newDeckConfig.mainDeck) {
        newDeckConfig.mainDeck.map(card => {
          idsSet.add(card.id)
        })
      }
      if(newDeckConfig.sideDeck) {
        newDeckConfig.sideDeck.map(card => {
          idsSet.add(card.id)
        })
      }

      const ids:String[] = Array.from(idsSet);

      // TODO: Securise if too many calls
      ids.map(async id => {
        const {
          data: { card:updatedCard },
        } = await axios.request<CardIdServerResponse>({
          url: `https://api.magicthegathering.io/v1/cards/${id}`,
        });


        if(newDeckConfig.mainDeck) {
          newDeckConfig.mainDeck.filter((card) => card.id === id).map(card => {
            card = {...card, ...updatedCard }
          })
        }
        if(newDeckConfig.sideDeck) {
          newDeckConfig.sideDeck.filter((card) => card.id === id).map(card => {
            card = {...card, ...updatedCard }
          })
        }
      })

    } else {
      dispatch(slice.actions.loadDeckListError(new Error("Votre deck liste n'a pas été trouvé")));
    }
  } catch (e) {
    dispatch(slice.actions.loadDeckListError(e));
  }
};
