/** 패키지 참조 */
import { configureStore } from '@reduxjs/toolkit';

// slice 참조
import LoginSlice from './slices/LoginSlice';

const Store = configureStore({
  reducer: {
    login: LoginSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;