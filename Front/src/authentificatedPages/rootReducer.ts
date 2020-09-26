import { combineReducers } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';
import clientCredentials from 'features/ClientCredentials/slice';
import searchCards from 'features/SearchCards/slice';

const rootReducer = combineReducers({
  auth,
  clientCredentials,
  searchCards,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
