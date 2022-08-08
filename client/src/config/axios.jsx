/**
 * axios 통신 할 때 인터셉트하여 정보를 추가하여 보내거나 받는다.
 */
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.request.use(
  (request) => {
    request.headers['access-token'] = window.localStorage.getItem('accessToken');
    // request.headers['refresh-token'] = window.localStorage.getItem('refreshToken');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;

    if (response.status === 401) {
      const { data } = await axios.get('api/users/refresh', {
        baseURL: 'http://localhost:3001',
        params: {
          token: window.localStorage.getItem('refreshToken'),
        },
      });

      const { accessToken } = data;
      window.localStorage.setItem('accessToken', accessToken); //새 액세스 토큰을 로컬스토리지에 저장
      config.headers['access-token'] = accessToken; //새 액세스 토큰을 헤더에 설정
      return await axios(config); //재요청
    }
    return Promise.reject(error);
  }
);

export default axios;
