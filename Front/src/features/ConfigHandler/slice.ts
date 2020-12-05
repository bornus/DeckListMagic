import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Card } from 'mtgsdk-ts';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { ConfigHandler } from './types';
import { EnhancedCard, DeckListConfig } from 'models/deckTypes';
import { CardInfo, DeckConfig as BackDeckConfig } from 'models/backTypes';
import { decodeLinksFromHeader } from 'utils/apiUtils';
import { RootState } from 'authentificatedPages/rootReducer';

const initialState: ConfigHandler = {
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'searchCards',
  initialState,
  reducers: {

    // saveDeckListStart(state: ConfigHandler) {
    //   state.save.loading = true;
    // },
    // saveDeckListSuccess(state: ConfigHandler) {
    //   state.save.loading = false;
    // },
    // saveDeckListError(state: ConfigHandler, action: PayloadAction<Error>) {
    //   state.save.loading = false;
    //   state.save.error = action.payload;
    // },

    // loadDeckListStart(state: ConfigHandler) {
    //   state.load.loading = true;
    //   state.loading = true;
    // },
    // loadDeckListSuccess(state: ConfigHandler, action: PayloadAction<DeckListConfig>) {
    //   state.load.loading = false;
    //   state.loading = false;
    //   // state.deckListConfig = {
    //   //   ...action.payload,
    //   //   canAddCard: action.payload.canAddCard,
    //   // };
    //   state.selectedList = 0;
    // },
    // loadDeckListError(state: ConfigHandler, action: PayloadAction<Error>) {
    //   state.load.loading = false;
    //   state.loading = true;
    //   state.load.error = action.payload;
    // },
  },
});

export default slice.reducer;

// export const saveDeckListConfig = (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     const { deckListConfig } = getState().ConfigHandler;
//     if (deckListConfig) {
//       dispatch(slice.actions.saveDeckListStart());

//       const deckToSave = baseDeckType.toBackModel(deckListConfig);
//       if(deckToSave.Id) {
//         await putAction({
//           body: deckToSave,
//           path: 'deck',
//         });
//       } else {
//         await postAction({
//           body: deckToSave,
//           path: 'deck',
//         });
//       }

//       dispatch(slice.actions.saveDeckListSuccess());
//     }
//   } catch (e) {
//     dispatch(slice.actions.saveDeckListError(e));
//   }
// };

// type CardIdServerResponse = {
//   card: Card
// }

// export const loadDeckListConfig = (id: string): AppThunk => async (
//   dispatch: AppDispatch,
//   getState: () => RootState,
// ) => {
//   try {
//     dispatch(slice.actions.loadDeckListStart());

//     const deckConfig:BackDeckConfig = await getAction({ path: 'deck' });

//     if (deckConfig) {
//       const newDeckConfig = baseDeckType.fromBackModel(deckConfig)
//       dispatch(slice.actions.loadDeckListSuccess(newDeckConfig));

//       // Use Set to remove duplicates and push into an array
//       const idsSet:Set<String> = new Set();
      
//       if(newDeckConfig.mainDeck) {
//         newDeckConfig.mainDeck.map(card => {
//           idsSet.add(card.id)
//         })
//       }
//       if(newDeckConfig.sideDeck) {
//         newDeckConfig.sideDeck.map(card => {
//           idsSet.add(card.id)
//         })
//       }

//       const ids:String[] = Array.from(idsSet);

//       // TODO: Securise if too many calls
//       ids.map(async id => {
//         const {
//           data: { card:updatedCard },
//         } = await axios.request<CardIdServerResponse>({
//           url: `https://api.magicthegathering.io/v1/cards/${id}`,
//         });


//         if(newDeckConfig.mainDeck) {
//           newDeckConfig.mainDeck.filter((card) => card.id === id).map(card => {
//             card = {...card, ...updatedCard }
//           })
//         }
//         if(newDeckConfig.sideDeck) {
//           newDeckConfig.sideDeck.filter((card) => card.id === id).map(card => {
//             card = {...card, ...updatedCard }
//           })
//         }
//       })

//     } else {
//       dispatch(slice.actions.loadDeckListError(new Error("Votre deck liste n'a pas été trouvé")));
//     }
//   } catch (e) {
//     dispatch(slice.actions.loadDeckListError(e));
//   }
// };
