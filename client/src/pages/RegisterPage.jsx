/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트 참조
import Meta from '../Meta';
import Logo from '../components/Logo';
import InputBox from '../components/InputBox';
import LoginPageContainer from '../styles/LoginStyle';

import RegexHelper from '../libs/RegexHelper';

// 아이콘 참조
import { FiUser } from 'react-icons/fi';
import { BsKey } from 'react-icons/bs';
import { AiOutlineMail, AiOutlinePhone, AiOutlineCheckCircle } from 'react-icons/ai';

const RegisterPage = memo(() => {

  const dispatch = useDispatch();

  /** 회원가입 입력 상태값 관리 */
  const [register, setRegister] = useState({
    userId: '',
    password: '',
    passwordCheck: '',
    email: '',
    phoneNumber: '',
  });
  console.log(register);

  /** 에러 메세지 및 스타일 정의 */
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [idErrorStyle, setIdErrorStyle] = useState({color: '#bcbcbc'});

  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [passErrorStyle, setPassErrorStyle] = useState({color: '#bcbcbc'});

  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState('');
  const [pwCheckErrorStyle, setPwCheckErrorStyle] = useState({color: '#bcbcbc'});

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailErrorStyle, setEmailErrorStyle] = useState({color: '#bcbcbc'});

  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [phoneErrorStyle, setPhoneErrorStyle] = useState({color: '#bcbcbc'});

  /** input 입력값을 state에 저장 */
  const { userId, password, passwordCheck, email, phoneNumber } = register;
  const onChange = useCallback((e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });

    if(userId) {
      setIdErrorMsg('');
      setIdErrorStyle({color: '#404040'});
    }
    if(password) {
      setPassErrorMsg('');
      setPassErrorStyle({color: '#404040'});
    }
    if(passwordCheck) {
      setPwCheckErrorMsg('');
      setPwCheckErrorStyle({color: '#404040'});
    }
    if(email) {
      setEmailErrorMsg('');
      setEmailErrorStyle({color: '#404040'});
    }
    if(phoneNumber) {
      setPhoneErrorMsg('');
      setPhoneErrorStyle({color: '#404040'});
    }
  }, [register, userId, password, passwordCheck, email, phoneNumber]);

  /** input에 입력이 없을시 초기상태로 변환 */
  useEffect(() => {
    if(!userId) {
      setIdErrorMsg('');
      setIdErrorStyle({color: '#bcbcbc'})
    } 
    if(!password) {
      setPassErrorMsg('');
      setPassErrorStyle({color: '#bcbcbc'});
    }
    if(!passwordCheck) {
      setPwCheckErrorMsg('');
      setPwCheckErrorStyle({color: '#bcbcbc'});
    }
    if(!email) {
      setEmailErrorMsg('');
      setEmailErrorStyle({color: '#bcbcbc'});
    }
    if(!phoneNumber) {
      setPhoneErrorMsg('');
      setPhoneErrorStyle({color: '#bcbcbc'});
    }
  }, [register, userId, password, passwordCheck, email, phoneNumber]);

  return (
    <div>
      <>
        <Meta title={'SuperBox :: 회원가입'} />

        <LoginPageContainer style={{background: '#f7f8fb'}}>
          <Logo />
          <div className='login-wrap'>
            <div className='login-text'>
              <h3>SuperBox</h3>
              <p>회원가입</p>
              <p>지금 가입하고 다양한 서비스를 누리세요!</p>
            </div>
            <form className='login-input'>
              <InputBox
                icon={<FiUser />}
                errStyle={idErrorStyle}
                type={'text'}
                name={'userId'}
                value={userId || ''}
                placeholder={'아이디를 입력하세요.'}
                onChange={onChange}
                errMsg={idErrorMsg}
              />

              <InputBox
                icon={<BsKey />}
                errStyle={passErrorStyle}
                type={'password'}
                name={'password'}
                value={password || ''}
                placeholder={'비밀번호를 입력하세요.'}
                onChange={onChange}
                errMsg={passErrorMsg}
              />

              <InputBox
                icon={<AiOutlineCheckCircle />}
                errStyle={pwCheckErrorStyle}
                type={'password'}
                name={'passwordCheck'}
                value={passwordCheck || ''}
                placeholder={'비밀번호를 확인해주세요.'}
                onChange={onChange}
                errMsg={pwCheckErrorMsg}
              />

              <InputBox
                icon={<AiOutlineMail />}
                errStyle={emailErrorStyle}
                type={'email'}
                name={'email'}
                value={email || ''}
                placeholder={'이메일을 입력하세요.'}
                onChange={onChange}
                errMsg={emailErrorMsg}
              />

              <InputBox
                icon={<AiOutlinePhone />}
                errStyle={phoneErrorStyle}
                type={'text'}
                name={'phoneNumber'}
                value={phoneNumber || ''}
                placeholder={"전화번호를 입력하세요.(' - ' 제외)"}
                onChange={onChange}
                errMsg={phoneErrorMsg}
              />

              <button type='submit'>함께하기</button>
            </form>
            <div className='login-sign-up'>
              <Link to={'/main'}>메인화면으로</Link>
            </div>
          </div>

        </LoginPageContainer>
      </>
    </div>
  );
});

export default RegisterPage;