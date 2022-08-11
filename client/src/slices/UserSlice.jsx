/** 패키치 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';

const API_URL = 'http://localhost:3001/api/users/';

/** 
 * 토큰에 대한 유효성 확인 백엔드 통신
 */
export const tokenVerify = createAsyncThunk('userSlice/tokenVerify', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get(`${API_URL}token`, {
      params: {
        token: payload,
      },
    });

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
 * 회원가입에 대한 백엔드 통신
 */
export const postRegister = createAsyncThunk('userSlice/register', async (payload, {rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.post(`${API_URL}register`, payload);
    console.log(result);

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
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    memberData: null,
    error: null,
    isLogin: false,
  },

  // 내부적으로 로그인 상태값 사용
  reducers: {
    setIsLogin: (state, { payload }) => {
      if(!payload) {
        return { ...state, isLogin: payload };
      }
    }
  },

  extraReducers: {
    // 로그인 reducer
    [tokenVerify.pending]: (state,  { payload }) => {
      return { ...state, loading: true };
    },
    [tokenVerify.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        data: payload?.data,
        memberData: payload?.data.memberData,
        loading: false,
        error: null,
        isLogin: true,
      };
    },
    [tokenVerify.rejected]: rejected,

    // 회원가입 reducer
    [postRegister.pending]: pending,
    [postRegister.fulfilled]: fulfilled,
    [postRegister.rejected]: rejected,
  }
});

export default UserSlice.reducer;
export const { setIsLogin } = UserSlice.actions;