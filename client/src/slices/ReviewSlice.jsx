/** 패키지 참조 */
import axios from '../config/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';
import { cloneDeep } from 'lodash';

const API_URL = 'http://localhost:3001/api/review/';

/**
 * 후기 조회
 */
 export const getReviewList = createAsyncThunk('ReviewSlice/getReviewList', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.get(`${API_URL}getReview`, {
      params: {
        query: payload?.query || '',
        // rows: payload?.rows || 10,
        // page: payload?.page || 1,
        sort: payload?.sort || 'review_no',
      }
    });
    console.log(result);

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch(err) {
    console.error(err.response.data);
    result = rejectWithValue(err);
  }

  return result;
});

/**
 * 사용자 후기 조회
 */
 export const getUserReview = createAsyncThunk('ReviewSlice/getUserReview', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload);

  try {
    result = await axios.get(`${API_URL}getUserReview`, {
      params: {
        user_no: payload?.user_no || '', 
      }
    });
    console.log(result);

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch(err) {
    console.error(err.response.data);
    result = rejectWithValue(err);
  }

  return result;
});


/**
 * 후기 등록
 */
export const postReview = createAsyncThunk('ReviewSlice/postReview', async (payload, { rejectWithValue }) => {
  let result = null;

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
    console.error(err.response.data);
    result = rejectWithValue(err);
  }

  return result;
});


/**
 * 후기 수정
 */
 export const putReview = createAsyncThunk('ReviewSlice/putReview', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload)

  try {
    result = await axios.put(`${API_URL}put`, payload);
    console.log(result);

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch(err) {
    console.error(err.response.data);
    result = rejectWithValue(err);
  }

  return result;
});


/**
 * 후기 삭제
 */
export const deleteReview = createAsyncThunk('ReviewSlice/deleteReview', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.delete(`${API_URL}delete`, {
      params: {
        review_no: payload,
      }
    });
    console.log(result);

    // 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다
    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch(err) {
    console.error(err.response.data);
    result = rejectWithValue(err);
  }

  return result;
});

/**
 * reducer
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
    [getReviewList.pending]: pending,
    [getReviewList.fulfilled]: fulfilled,
    [getReviewList.rejected]: rejected,

    /** 사용자 후기 조회 */
    [getUserReview.pending]: pending,
    [getUserReview.fulfilled]: fulfilled,
    [getUserReview.rejected]: rejected,

    /** 데이터 저장을 위한 액션 함수 */
    [postReview.pending]: pending,
    [postReview.fulfilled]: (state, { payload }) => {

      // 기존의 상태값을 복사 -> 원본이 JSON 이므로 깊은 복사를 수행
      if(payload?.data?.success) {
        const data = cloneDeep(state.data);

        // 새로 저장된 결과를 기존 상태값 배열의 맵 앞에 추가한다.
        data.item.unshift(payload.data.item);
  
        // 기존의 상태값 배열에서 맨 마지막 항목은 삭제한다.
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

    /** 데이터 수정을 위한 액션 함수 */
    [putReview.pending]: pending,
    [putReview.fulfilled]: (state, { meta, payload }) => {
      // 기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야 한다.)
      const data = cloneDeep(state.data);
      console.log(data);

      // 기존의 데이터에서 수정이 요청된 항목의 위치를 검색한다.
      const index = data.item.findIndex(v => v.review_no === parseInt(meta.arg.review_no));

      // 해당 위치으 인덱스를 바꾼다.
      if(index !== undefined) data.item.splice(index, 1, payload.data.item);

      return {
        data: data,
        loading: false,
        error: null,
      }
    },
    [putReview.rejected]: rejected,

    /** 데이터 삭제를 위한 액션 함수 */
    [deleteReview.pending]: pending,
    [deleteReview.fulfilled]: (state, { meta, payload }) => {
      console.log('meta >>>', meta);

      // 기존의 상태값을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야 한다.)
      const data = cloneDeep(state.data);

      // 기존의 데이터에서 삭제가 요청된 항목의 위치를 검색한다.
      let index = null
      if(data.item) index = data.item.findIndex(v => v.review_no === parseInt(meta.arg));

      // 검색이 되었다면 해당 항목을 삭제
      if(index !== undefined) data.item.splice(index, 1);

      return {
        data: data,
        loading: false,
        error: null,
      }
    },
    [deleteReview.rejected]: rejected,
  }
});

export default ReviewSlice.reducer;