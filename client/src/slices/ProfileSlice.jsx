/** 패키치 참조 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { pending, fulfilled, rejected } from '../utils/ExtraReducers';

const API_URL = 'http://localhost:3001/api/profile/';

/** 
 * @description 회원정보 수정
 * @param payload
 */
export const putProfile = createAsyncThunk('ProfileSlice/putProfile', async (payload, { rejectWithValue }) => {
  let result = null;
  console.log(payload)

  try {
    result = await axios.put(`${API_URL}putProfile`, payload);
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
 const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },

  extraReducers: {
    // 배송 접수
    [putProfile.pending]: pending,
    [putProfile.fulfilled]: fulfilled,
    [putProfile.rejected]: rejected,
  }
});

export default ProfileSlice.reducer;