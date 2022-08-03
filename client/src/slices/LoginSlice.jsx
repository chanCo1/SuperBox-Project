/** 패키치 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/users/';

/** 비동기 처리 함수 구현 */
export const login = createAsyncThunk('loginSlice/login', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    // result = await axios.post(`${API_URL}login`);
    result = await axios.post('http://localhost:3001/api/users/login', payload);

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    }

  } catch(err) {
    // console.error(err);
    result = rejectWithValue(err);
  }

  return result;
});

/** Slice 정의 */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: {
    // 로딩 상태
    [login.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    // ajax 처리 완료시
    [login.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    // 에러 발생시
    [login.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusTxt ? payload.statusText : 'Server Error',
        }
      };
    }
  }
});

export default loginSlice.reducer;