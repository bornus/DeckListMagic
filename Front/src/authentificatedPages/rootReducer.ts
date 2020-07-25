import { combineReducers } from '@reduxjs/toolkit';
import auth from 'features/auth/authSlice';
import clientCredentials from 'features/ClientCredentials/slice';

const rootReducer = combineReducers({
  auth,
  clientCredentials,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
