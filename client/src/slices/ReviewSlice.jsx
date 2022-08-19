/** 패키지 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

const API_URL = 'http://localhost:3001/api/review/';

/**
 * reducer 정의
 */
const ReviewSlice = createSlice({
  name: 'review',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: {

  }
});

export default ReviewSlice.reducer;