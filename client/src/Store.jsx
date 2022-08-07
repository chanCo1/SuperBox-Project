/** 패키지 참조 */
import { configureStore } from '@reduxjs/toolkit';

// slice 참조
import userSlice from './slices/UserSlice';

const Store = configureStore({
  reducer: {
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;