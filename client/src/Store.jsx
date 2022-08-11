/** 패키지 참조 */
import { configureStore } from '@reduxjs/toolkit';

// slice 참조
import userSlice from './slices/UserSlice';
import receptionSlice from './slices/ReceptionSlice'

const Store = configureStore({
  reducer: {
    user: userSlice,
    reception: receptionSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;