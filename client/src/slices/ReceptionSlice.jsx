/** 패키치 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';

const API_URL = 'http://localhost:3001/api/reception';

/** 
 * 배송 접수
 */
export const postReception = createAsyncThunk('receptionSlice/postReception', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.post(`${API_URL}`, payload);
    console.log(result)

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    }

  } catch(err) {
    // console.error(err.response.data);
    result = rejectWithValue(err);
  }
  return result;
});

/** 
 * reducer 정의 
 */
const receptionSlice = createSlice({
  name: 'reception',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: {
    // 회원가입 reducer
    [postReception.pending]: pending,
    [postReception.fulfilled]: fulfilled,
    [postReception.rejected]: rejected,
  }
});

export default receptionSlice.reducer;