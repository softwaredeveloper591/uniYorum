import { configureStore } from '@reduxjs/toolkit'
import universityReducer from './universitiesSlice';
import studentFileReducer from './studentFilesSlice';

const store = configureStore({
  reducer: {
    universities: universityReducer,
    studentFiles: studentFileReducer
  },
})
 
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch