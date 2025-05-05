import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { animeApi } from '../api/anime-api';
import reviewReducer from '../slices/review-slice';
import Api from './api';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    review: reviewReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(Api.middleware, animeApi.middleware),
  // devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
