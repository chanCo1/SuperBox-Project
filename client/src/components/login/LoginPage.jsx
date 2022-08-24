/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import swal from 'sweetalert2';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { tokenVerify } from '../../slices/UserSlice';

// 컴포넌트 참조
import Meta from '../../Meta';
import Logo from './Logo';
import InputBox from './InputBox';
import Spinner from '../Spinner';
import { LoginPageContainer } from '../../styles/LoginStyle';

import RegexHelper from '../../libs/RegexHelper';

// 아이콘 참조
import { FiUser } from 'react-icons/fi';
import { CgCloseR } from 'react-icons/cg';
import { BsKey } from 'react-icons/bs';

/**
 * 로그인 페이지
 */
const LoginPage = memo(({ loginPageState }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  /** 로그인 입력 상태값 관리 */
  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });

  // 에러 메세지 및 스타일 정의
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [idErrorStyle, setIdErrorStyle] = useState({ color: '#bcbcbc' });
  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [passErrorStyle, setPassErrorStyle] = useState({ color: '#bcbcbc' });

  /** input 입력값을 state에 저장 */
  const { userId, password } = login;
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });

      if (userId) {
        setIdErrorMsg('');
        setIdErrorStyle({ color: '#404040' });
      }
      if (password) {
        setPassErrorMsg('');
        setPassErrorStyle({ color: '#404040' });
      }
    },
    [login, userId, password]
  );

  /** 로그인 버튼의 submit 이벤트 발생시 */
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // 이벤트가 발생한 폼 객체
      const current = e.target;

      // 입력값에 대한 유효성 검사
      try {
        RegexHelper.value(current.userId, '아이디를 입력해주세요.');
        RegexHelper.value(current.password, '비밀번호를 입력해주세요.');

      } catch (err) {
        if (err.message === '아이디를 입력해주세요.') {
          setIdErrorMsg(err.message);
          setIdErrorStyle({ color: 'red' });
        } else if (err.message === '비밀번호를 입력해주세요.') {
          setPassErrorMsg(err.message);
          setPassErrorStyle({ color: 'red' });
        }
        err.field.focus();
        return;
      }

      try {
        const response = await axios.post('http://localhost:3001/api/users/login', login);

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        // 로컬스토리지에 토큰 저장
        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);

        // Redux 값 갱신 요청
        dispatch(tokenVerify(accessToken));

        swal.fire({
          icon: 'success',
          iconColor: '#f3b017',
          text:'로그인 되었습니다.',
          showConfirmButton: false,
          timer: 1500,
          footer: '만나서 반가워요! 😆'
        }).then(() => {
          loginPageState(false);
        });

      } catch (e) {
        const errMsg = e.response.data.message;
        console.log(e);

        if (errMsg === '아이디가 존재하지 않습니다.') {
          setIdErrorMsg(errMsg);
          setIdErrorStyle({ color: 'red' });
        } else if (errMsg === '비밀번호가 틀렸습니다.') {
          setPassErrorMsg(errMsg);
          setPassErrorStyle({ color: 'red' });
        } else {
          swal.fire({
            icon: 'success',
            iconColor: '#f3b017',
            text:'로그인에 실패하였습니다.',
            confirmButtonColor: '#f3b017',
          });
        }
        return;
      }
    },
    [login, dispatch, loginPageState]
  );

  /** input에 입력이 없을시 초기상태로 변환 */
  useEffect(() => {
    if (!userId) setIdErrorStyle({ color: '#bcbcbc' });
    if (!password) setPassErrorStyle({ color: '#bcbcbc' });
  }, [userId, password]);

  // 헤더의 로그인 버튼 클릭시 app.jsx에서 받은 상태값을 false 바꾼다.
  const loginCloseBtnClick = useCallback(() => {
    loginPageState(false);
  }, [loginPageState]);

  // retrun 시작
  return (
    <div>
      <Meta title={'SuperBox :: 로그인'} />
      <Spinner visible={loading} />
      <LoginPageContainer>
        <Logo />
        <div className="login-wrap">
          <div className="close-btn" onClick={loginCloseBtnClick}>
            <CgCloseR />
          </div>
          <div className="login-text">
            <h3>SuperBox</h3>
            <p>만나서 반가워요!</p>
            <p>더 멋진 서비스 제공을 위해 로그인 해주세요.</p>
          </div>
          <form className="login-input" onSubmit={onSubmit}>
            <InputBox
              icon={<FiUser />}
              errStyle={idErrorStyle}
              type={'text'}
              name={'userId'}
              // value={userId || ''}
              placeholder={'아이디를 입력하세요.'}
              onChange={onChange}
              errMsg={idErrorMsg}
            />

            <InputBox
              icon={<BsKey />}
              errStyle={passErrorStyle}
              type={'password'}
              name={'password'}
              // value={password || ''}
              placeholder={'비밀번호를 입력하세요.'}
              onChange={onChange}
              errMsg={passErrorMsg}
            />

            <button type="submit">로그인</button>
          </form>
          <div className="login-sign-up">
            <p>아직 계정이 없으신가요?</p>
            <Link to={'/register'} onClick={loginCloseBtnClick}>
              회원가입
            </Link>
          </div>
        </div>
      </LoginPageContainer>
    </div>
  );
});

export default LoginPage;

{
  /* 
<div className='input-with-icon'>
  <span className='input-icon'>
  <BsKey style={passErrorStyle} />
  </span>
  <input 
    className='input-area' 
    type="password" 
    name='password' 
    value={password} 
    placeholder='비밀번호' 
    onChange={onPassChange} 
  />
  </div> 
*/
}

{
  /* 에러메세지 */
}
{
  /* 
<div className='error-msg'>
  {passErrorMsg}
</div> 
*/
}

{
  /* 
              <div className='input-with-icon'>
                <span className='input-icon'>
                <BsKey style={passErrorStyle} />
                </span>
                <input 
                  className='input-area' 
                  type="password" 
                  name='password' 
                  value={password} 
                  placeholder='비밀번호' 
                  onChange={onPassChange} 
                />
              </div> 
              */
}

{
  /* 에러메세지 */
}
{
  /* 
              <div className='error-msg'>
                {passErrorMsg}
              </div> 
              */
}
