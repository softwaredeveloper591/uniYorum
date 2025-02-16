import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { University } from '../types/types';

interface UniversityState {
    universities: University[];
    loading: boolean;
    error: string | null;
  }

  const initialState: UniversityState = {
    universities: [],
    loading: false,
    error: null,
  };

  export const fetchUniversities = createAsyncThunk('universities/fetchUniversities', async () => {
    const response = await axios.get('http://localhost:3000/universities');
    return response.data as University[];
  });


    const universitySlice = createSlice({
        name: 'universities',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            .addCase(fetchUniversities.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchUniversities.fulfilled, (state, action: PayloadAction<University[]>) => {
              state.universities = action.payload;
              state.loading = false;
            })
            .addCase(fetchUniversities.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || 'Failed to fetch universities';
            });
        },
      });

      export default universitySlice.reducer;

