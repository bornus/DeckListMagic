import { combineReducers } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';
import clientCredentials from 'features/ClientCredentials/slice';
import deckCreation from 'features/DeckCreation/slice';

const rootReducer = combineReducers({
  auth,
  clientCredentials,
  deckCreation,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
