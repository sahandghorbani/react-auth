import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Auth/index';

const store = configureStore({
  reducer: {
    AuthSlice: AuthReducer,
  },
});

export default store;