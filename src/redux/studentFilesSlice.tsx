import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { StudentFile } from '../types/types';

interface StudentFileState {
    studentFiles: StudentFile[];
    loading: boolean;
    error: string | null;
}

const initialState: StudentFileState = {
    studentFiles: [],
    loading: false,
    error: null,
};


export const fetchStudentFiles = createAsyncThunk('/file', async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL+'/universities');
    return response.data as StudentFile[];
  });

const studentFileSlice = createSlice({
    name: 'studentFiles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentFiles.fulfilled, (state, action: PayloadAction<StudentFile[]>) => {
                state.studentFiles = action.payload;
                state.loading = false;
            })
            .addCase(fetchStudentFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch student files';
            });
    },
});

export default studentFileSlice.reducer;
