/** 패키지 참조 */
import axios from '../config/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';
import { cloneDeep } from 'lodash';

const API_URL = 'http://localhost:3001/api/review/';

/**
 * 후기 조회
 */
 export const getReview = createAsyncThunk('ReviewSlice/getReview', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.get(`${API_URL}`);
    console.log(result);

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
 * 후기 등록
 */
export const postReview = createAsyncThunk('ReviewSlice/postReview', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.post(`${API_URL}post`, payload);
    console.log(result);

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

    /** 데이터 조회를 위한 액션 함수 */
    [getReview.pending]: pending,
    [getReview.fulfilled]: fulfilled,
    [getReview.rejected]: rejected,

    /** 데이터 저장을 위한 액션 함수 */
    [postReview.pending]: pending,
    [postReview.fulfilled]: (state, { payload }) => {

      // 기존의 상태값을 복사 -> 원본이 JSON 이므로 깊은 복사를 수행
      if(payload?.data?.success) {
        const data = cloneDeep(state.data);

        // 새로 저장된 결과를 기존 상태값 배열의 맵 앞에 추가한다.
        data.item.unshift(payload.data.item);
  
        // // 기존의 상태값 배열에서 맨 마지막 항목은 삭제한다.
        // data.item.pop();
  
        return {
          ...state,
          data: data,
          loadin: false,
          error: null,
        };

      } else {
        return {
          ...state,
          loading: false,
        }
      };

    },
    [postReview.rejected]: rejected,

  }
});

export default ReviewSlice.reducer;