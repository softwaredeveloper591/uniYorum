import { configureStore } from '@reduxjs/toolkit'
import universityReducer from './universitiesSlice';

const store = configureStore({
  reducer: {
    universities: universityReducer,
  },
})
 
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch