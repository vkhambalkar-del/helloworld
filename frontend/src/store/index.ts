import { configureStore } from '@reduxjs/toolkit';
import { helloSlice } from '../features/hello';
import { usersReducer } from '../features/users';

export const store = configureStore({
  reducer: {
    [helloSlice.reducerPath]: helloSlice.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helloSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
