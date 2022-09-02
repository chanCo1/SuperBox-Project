import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';

const API_URL = 'http://localhost:3001/api/inquiry/';

/** 
 * 1:1문의 사용자 조회
 */
 export const getUserInquiry = createAsyncThunk('inquirySlice/getUserInquiry', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.get(`${API_URL}getUserInquiry`, {
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
    };

  } catch(err) {
    // console.error(err.response.data);
    result = rejectWithValue(err);
  }
  return result;
});

/** 
 * 1:1문의 등록
 */
export const postInquiry = createAsyncThunk('inquirySlice/postInquiry', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.post(`${API_URL}`, payload);
    console.log(result)

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch(err) {
    // console.error(err.response.data);
    result = rejectWithValue(err);
  }
  return result;
});


/**
 * @description 1:1문의 취소
 * @param payload
 */
 export const putCancelInquiry = createAsyncThunk('ReceptionSlice/putCancelInquiry', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload)

  try {
    result = await axios.put(`${API_URL}putCancelInquiry`, payload);
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
const InquirySlice = createSlice({
  name: 'inquiry',
  initialState: {
    data: null,
    loading: false,
    error: null,
    inquiryImg: null,
  },

  extraReducers: {
    // 1:1문의 사용자 조회
    [getUserInquiry.pending]: pending,
    [getUserInquiry.fulfilled]: fulfilled,
    [getUserInquiry.rejected]: rejected,

    // 회원가입 reducer
    [postInquiry.pending]: pending,
    [postInquiry.fulfilled]: fulfilled,
    [postInquiry.rejected]: rejected,

    // 1:1문의 취소
    [putCancelInquiry.pending]: pending,
    [putCancelInquiry.fulfilled]: fulfilled,
    [putCancelInquiry.rejected]: rejected,
  }
});

export default InquirySlice.reducer;
// export const { setInquiryImg } = InquirySlice.actions;