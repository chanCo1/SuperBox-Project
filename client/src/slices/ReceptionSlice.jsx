/** 패키치 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';

const API_URL = '/api/reception/';

/** 
 * @description 배송 접수 조회
 * @param payload
 */
export const getReception = createAsyncThunk('ReceptionSlice/getReception', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.get(`${API_URL}getReception`, {
      params: {
        user_no: payload?.user_no,
      }
    });
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
 * @discription 배송 접수
 * @param payload 배송 접수 내용 from ReceptionPage.jsx
 */
export const postReception = createAsyncThunk('ReceptionSlice/postReception', async (payload, { rejectWithValue }) => {
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
 * @description 배송 접수 수정
 * @param payload
 */
export const putReception = createAsyncThunk('ReceptionSlice/putReception', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload)

  try {
    result = await axios.put(`${API_URL}putReception`, payload);
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
const ReceptionSlice = createSlice({
  name: 'reception',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: {
    // 배송 접수
    [postReception.pending]: pending,
    [postReception.fulfilled]: fulfilled,
    [postReception.rejected]: rejected,

    // 배송 조회
    [getReception.pending]: pending,
    [getReception.fulfilled]: fulfilled,
    [getReception.rejected]: rejected,

    // 배송 접수 취소
    [putReception.pending]: pending,
    [putReception.fulfilled]: fulfilled,
    [putReception.rejected]: rejected,
  }
});

export default ReceptionSlice.reducer;