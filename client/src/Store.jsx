/** 패키지 참조 */
import { configureStore } from '@reduxjs/toolkit';

// slice 참조
import userSlice from './slices/UserSlice';
import receptionSlice from './slices/ReceptionSlice'
import inquirySlice from './slices/InquirySlice';

const Store = configureStore({
  reducer: {
    user: userSlice,
    reception: receptionSlice,
    inquiry: inquirySlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;