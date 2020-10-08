import { combineReducers } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';
import clientCredentials from 'features/ClientCredentials/slice';
import deckCreation from 'features/DeckCreation/slice';
import searchCards from 'features/SearchCards/slice';

const rootReducer = combineReducers({
  auth,
  clientCredentials,
  deckCreation,
  searchCards,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
