// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./usersApi";
import authReducer from "./authSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Enable automatic cache invalidation and refetching for RTQ
setupListeners(store.dispatch);

// Export the API slice
export { usersApi };
