/** 패키지 참조 */
import { configureStore } from '@reduxjs/toolkit';

// slice 참조
import userSlice from './slices/UserSlice';
import receptionSlice from './slices/ReceptionSlice'
import inquirySlice from './slices/InquirySlice';
import ReviewSlice from './slices/ReviewSlice';
import ProfileSlice from './slices/ProfileSlice';

const Store = configureStore({
  reducer: {
    user: userSlice,
    reception: receptionSlice,
    inquiry: inquirySlice,
    review: ReviewSlice,
    profile: ProfileSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default Store;