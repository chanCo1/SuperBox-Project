/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 컴포넌트 참조
import Meta from '../Meta';
import Logo from './Logo';
import InputBox from './InputBox';
import LoginPageContainer from '../styles/LoginStyle';
import RegexHelper from '../libs/RegexHelper';

// slice 참조
import { login } from '../slices/LoginSlice';

// 아이콘 참조
import { AiOutlineMail } from 'react-icons/ai';
import { CgCloseR } from 'react-icons/cg';
import { BsKey } from 'react-icons/bs';

const LoginPage = memo(({ loginPageState }) => {

  const dispatch = useDispatch();

  /** Store를 통해 상태값 호출 */
  // const { data, loading, error } = useSelector(state => state.login);

  /** 로그인 입력 상태값 관리 */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 메세지 및 스타일 정의
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailErrorStyle, setEmailErrorStyle] = useState({color: '#bcbcbc'})
  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [passErrorStyle, setPassErrorStyle] = useState({color: '#bcbcbc'})

  /** input 입력값을 state에 저장 */
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

  /** 로그인 버튼의 submit 이벤트 발생시 */
  const onSubmit = useCallback( async (e) => {
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
        return;
      }
      if(err.message === '비밀번호를 입력해주세요.') {
        setPassErrorMsg(err.message);
        setPassErrorStyle({color: 'red'});
        return;
      }
      err.field.focus();
      return;
    }

    // 값의 존재 여부 확인을 위한 추가 ajax 통신
    try {
      const result = await axios.post('http://localhost:3001/api/users/login',{
        email: email,
        password: password,
      });
      console.log(result)

      // window.sessionStorage.setItem("accessToken", "test");
      loginPageState(false);
    } catch(e) {
      console.error(e);
      
      if(e.response.data.message === '이메일이 존재하지 않습니다.') {
        setEmailErrorMsg(e.response.data.message);
        setEmailErrorStyle({color: 'red'});
      } else if(e.response.data.message === '비밀번호가 틀렸습니다.') {
        setPassErrorMsg(e.response.data.message);
        setPassErrorStyle({color: 'red'});
      } else {
        alert('로그인에 실패하였습니다.');
      }
    }

    // Redux 값 갱신 요청
    dispatch(login({
      email: email,
      password: password,
    }));
    
  }, [email, password, dispatch, loginPageState]);

  /** input에 입력이 없을시 초기상태로 변환 */
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
              <InputBox 
                icon={<AiOutlineMail />} 
                errStyle={emailErrorStyle} 
                type={'email'} 
                name={'email'}
                value={email}
                placeholder={'이메일을 입력하세요.'}
                onChange={onEmailChange}
                errMsg={emailErrorMsg}
              />

              <InputBox 
                icon={<BsKey />} 
                errStyle={passErrorStyle} 
                type={'password'} 
                name={'password'}
                value={password}
                placeholder={'비밀번호를 입력하세요.'}
                onChange={onPassChange}
                errMsg={passErrorMsg}
              />

              <button type='submit'>로그인</button>
            </form>
            <div className='login-sign-up'>
              <p>아직 계정이 없으신가요?</p>
              <Link to={'/register'} onClick={loginCloseBtnClick}>회원가입</Link>
            </div>
          </div>
        </LoginPageContainer>
      </>
    </div>
  );
});

export default LoginPage;






{/* 
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
*/}

{/* 에러메세지 */}
{/* 
<div className='error-msg'>
  {passErrorMsg}
</div> 
*/}


{/* 
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
              */}

              {/* 에러메세지 */}
              {/* 
              <div className='error-msg'>
                {passErrorMsg}
              </div> 
              */}