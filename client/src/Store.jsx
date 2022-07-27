import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({
  reducer: {

  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true,
});

export default Store;