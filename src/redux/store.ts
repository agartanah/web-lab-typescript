import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from './modalsSlice';
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
