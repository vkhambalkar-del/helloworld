import { configureStore } from '@reduxjs/toolkit';
import { helloSlice } from '../features/hello';

export const store = configureStore({
  reducer: {
    [helloSlice.reducerPath]: helloSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helloSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
