// 로딩 상태
const pending = (state, { payload }) => {
  return { 
    ...state, 
    loading: true,
  };
};

// ajax 처리 완료시
const fulfilled = (state, { payload }) => {
  return {
    data: payload?.data,
    loading: false,
    error: null,
    // isLogin: true,
  };
};

// 에러 발생시
const rejected = (state, { payload }) => {
  const res = payload.response;

  return {
    ...state, 
    loading: false,
    isLogin: false,
    error: {
      code: res?.status ? res.status : 500,
      message: res?.data.message ? res.data.message : 'Server Error',
      success: res?.data.success ? true : res.data.success,
    }
  };
};

export { pending, fulfilled, rejected };