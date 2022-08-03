/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// 컴포넌트 참조
import Meta from '../Meta';
import Logo from './Logo';
import RegexHelper from '../libs/RegexHelper';

// slice 참조
import { login } from '../slices/LoginSlice';

// 아이콘 참조
import { AiOutlineMail } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { BsKey } from 'react-icons/bs';

/** 로그인 페이지 스타일 정의 */
const LoginPageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
  z-index: 9;

  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 50px 80px;
    background-color: #fff;
    border-radius: 20px;
    border: 1px solid #f3b017;
    color: #404040;

    .close-btn {
      position: absolute;
      top: 7%;
      right: 8%;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;

      &:hover {
        color: #404040;
      }
    }

    .login-text {
      margin-bottom: 30px;

      h3 {
        color: #f3b017;
        font-size: 2em;
        font-weight: 500;
      }
      p:nth-child(2) {
        font-size: 2.5rem;
        font-weight: 500;
      }
    }

    .login-input {
      display: flex;
      flex-direction: column;

      .input-with-icon {
        position: relative;
        margin: 10px 0;

        .input-icon {
          position: absolute;
          display: flex;
          top: 20%;
          left: 2%;
          font-size: 1.7rem;
        }

        .input-area {
          width: 100%;
          border: none;
          border-bottom: 2px solid #bcbcbc;
          outline: none;
          padding: 10px 40px;
          font-size: 1.1rem;

          &::-webkit-input-placeholder {
            color: #bcbcbc;
          }
          
          &:focus {
            border-color: #404040;
            color: #404040;
          }
        }
      }

      .error-msg {
        position: relative;
        font-size: 12px;
        color: red;
        height: 10px;
      }

      button {
        margin: 30px 0;
        padding: 10px;
        border: none;
        border-radius: 10px;
        color: #fff;
        background-color: #f3b017;
        font-size: 1.1rem;
        cursor: pointer;
        transition: .3s ease;

        &:active {
          transform: scale(.9, .9);
        }
      }
    }

    .login-sign-up {
      text-align: center;
      & > p {
        margin: 10px 0;
      }
      & > a {
        color: #999;
        text-decoration: underline;
      }
    }
  }
`;

const LoginPage = memo(({ loginPageState }) => {

  const dispatch = useDispatch();

  /** Store를 통해 상태값 호출 */
  const { data, loading, error } = useSelector(state => state.login);

  /** 로그인 입력 상태값 관리 */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailErrorStyle, setEmailErrorStyle] = useState({color: '#bcbcbc'})
  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [passErrorStyle, setPassErrorStyle] = useState({color: '#bcbcbc'})

  // input 입력값을 state에 저장
  const onEmailChange = useCallback((e) => {
    e.preventDefault();

    setEmail(e.currentTarget.value);

    if(email) {
      setEmailErrorMsg('');
      setEmailErrorStyle({color: '#404040'});
    }
  }, [email]);

  const onPassChange = useCallback((e) => {
    e.preventDefault();

    setPassword(e.currentTarget.value);

    if(password) {
      setPassErrorMsg('');
      setPassErrorStyle({color: '#404040'});
    }
  }, [password]);

  // 로그인 버튼의 submit 이벤트 발생시
  const onSubmit = useCallback((e) => {
    e.preventDefault();

    // 이벤트가 발생한 폼 객체
    const current = e.target;
    
    // 입력값에 대한 유효성 검사
    try {
      RegexHelper.value(current.email, '이메일을 입력해주세요.');
      RegexHelper.value(current.password, '비밀번호를 입력해주세요.');

    } catch(err) {
      
      if(err.message === '이메일을 입력해주세요.') {
        setEmailErrorMsg(err.message);
        setEmailErrorStyle({color: 'red'});
      }

      if(err.message === '비밀번호를 입력해주세요.') {
        setPassErrorMsg(err.message);
        setPassErrorStyle({color: 'red'});
      }

      err.field.focus();
      return;
    }

    // if(email === '') {
    //   setEmailErrorMsg('이메일을 입력해주세요.');
    //   setEmailErrorStyle({color: 'red'});
    // } else if(password === '') {
    //   setPassErrorMsg('비밀번호를 입력해주세요.');
    //   setPassErrorStyle({color: 'red'});
    // }
    
    dispatch(login({
      email: email,
      password: password,
    })).then(() => {
      loginPageState(false);
    });
    
  }, [email, password, dispatch, loginPageState]);

  // input에 아무 입력이 없을시 초기상태로 변환
  useEffect(() => {
    if(!email) {
      setEmailErrorMsg('');
      setEmailErrorStyle({color: '#bcbcbc'})
    } 
    
    if(!password) {
      setPassErrorMsg('');
      setPassErrorStyle({color: '#bcbcbc'});
    }
  }, [email, password]);
  
  // 헤더의 로그인 버튼 클릭시 app.jsx에서 받은 상태값을 false 바꾼다.
  const loginCloseBtnClick = useCallback(() => {
    loginPageState(false);
  }, [loginPageState]);

  // retrun 시작
  return (
    <div>
      <>
        <Meta title={'SuperBox :: 로그인'} />

        <LoginPageContainer>
          <Logo />
          <div className='login-wrap'>
            <div className='close-btn' onClick={loginCloseBtnClick}>
              <CgCloseR />
            </div>
            <div className='login-text'>
              <h3>SuperBox</h3>
              <p>만나서 반가워요!</p>
              <p>더 멋진 서비스 제공을 위해 로그인 해주세요.</p>
            </div>
            <form className='login-input' onSubmit={onSubmit}>
              <div className='input-with-icon'>
                <AiOutlineMail className='input-icon' style={emailErrorStyle} />
                <input 
                  className='input-area' 
                  type="email" 
                  name='email' 
                  value={email} 
                  placeholder={'이메일'} 
                  onChange={onEmailChange} 
                />
              </div>
              
              {/* 에러메세지 */}
              <div className='error-msg'>
                {emailErrorMsg}
              </div>

              <div className='input-with-icon'>
                <BsKey className='input-icon' style={passErrorStyle} />
                <input 
                  className='input-area' 
                  type="password" 
                  name='password' 
                  value={password} 
                  placeholder='비밀번호' 
                  onChange={onPassChange} 
                />
              </div>

              {/* 에러메세지 */}
              <div className='error-msg'>
                {passErrorMsg}
              </div>

              <button type='submit'>로그인</button>
            </form>
            <div className='login-sign-up'>
              <p>아직 계정이 없으신가요?</p>
              <Link to={'/register'}>회원가입</Link>
            </div>
          </div>
        </LoginPageContainer>
      </>
    </div>
  );
});

export default LoginPage;