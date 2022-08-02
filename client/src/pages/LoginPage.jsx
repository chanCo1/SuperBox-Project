/** 패키지 참조 */
import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { MdOutlineMail } from 'react-icons/md';
import { CgCloseR } from 'react-icons/cg';

// 컴포넌트 참조
import Meta from '../Meta';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

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
      right: 10%;
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

      input {
        padding: 10px 20px;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #999;
        outline: none;
        color: #404040;
        font-size: 1.2rem;

        &::-webkit-input-placeholder {
          color: #999;
        }
      }

      button {
        margin: 30px 0;
        padding: 10px;
        border: none;
        border: 1px solid #f3b017;
        border-radius: 10px;
        color: #f3b017;
        background-color: #fff;
        font-size: 1.1rem;
        cursor: pointer;
        transition: .3s ease;

        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
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

const CloseButton = styled.div`
  position: absolute;
`;

const LoginPage = memo(({loginPageState}) => {
  
  // 로그인 버튼 클릭시 app.jsx에서 받은 상태값을 false 바꾼다.
  const loginCloseBtnClick = useCallback(() => {
    loginPageState(false);
  }, [loginPageState]);

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
            <form className='login-input'>
              <input type="email" id='email' placeholder='Email' />
              <input type="password" id='password' placeholder='Password' />
              <button>로그인</button>
            </form>
            <div className='login-sign-up'>
              <p>아직 계정이 없으신가요?</p>
              <Link to={'/join'}>가입하기</Link>
            </div>
          </div>
        </LoginPageContainer>
      </>
    </div>
  );
});

export default LoginPage;