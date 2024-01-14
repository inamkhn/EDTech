import { combineReducers,configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileSlice from './redux/profileSlice';
import subscribeSlice from './redux/subscribeSlice';
import courseSlice from './redux/courseSlice';
import adminSlice from './redux/adminSlice'

const rootReducer = combineReducers({ user: userSlice,profile:profileSlice,
  subscription:subscribeSlice,course:courseSlice,admin:adminSlice});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);