import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import generalReducer from '../features/general/generalSlice';
// import listenerMiddleware from '../features/general/listener';

const store = configureStore({
  reducer: {
    user: userReducer,
    general: generalReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
