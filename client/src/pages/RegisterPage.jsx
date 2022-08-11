/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../Meta';
import Logo from '../components/login/Logo';
import InputBox from '../components/login/InputBox';
import LoginPageContainer from '../styles/LoginStyle';
import Spinner from '../components/Spinner';

import RegexHelper from '../libs/RegexHelper';

// slice 참조
import { postRegister } from '../slices/UserSlice';

// 아이콘 참조
import { FiUser, FiSmile } from 'react-icons/fi';
import { BsKey } from 'react-icons/bs';
import { AiOutlineMail, AiOutlineCheckCircle } from 'react-icons/ai';
import { MdPhoneIphone } from 'react-icons/md';

const RegisterPage = memo(({ loginPageState }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(state => state.user);

  /** 
   * 회원가입 입력 상태값 관리 
   */
  const [register, setRegister] = useState({
    userId: '',
    password: '',
    passwordCheck: '',
    userName: '',
    email: '',
    phoneNumber: '',
  });

  /** 
   * 에러 메세지 및 스타일 정의 
   */
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [idErrorStyle, setIdErrorStyle] = useState({color: '#bcbcbc'});

  const [passErrorMsg, setPassErrorMsg] = useState('');
  const [passErrorStyle, setPassErrorStyle] = useState({color: '#bcbcbc'});

  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState('');
  const [pwCheckErrorStyle, setPwCheckErrorStyle] = useState({color: '#bcbcbc'});

  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [nameErrorStyle, setNameErrorStyle] = useState({color: '#bcbcbc'});

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailErrorStyle, setEmailErrorStyle] = useState({color: '#bcbcbc'});

  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [phoneErrorStyle, setPhoneErrorStyle] = useState({color: '#bcbcbc'});

  /** 
   * input 입력값을 state에 저장 
   */
  const { userId, password, passwordCheck, userName, email, phoneNumber } = register;

  const onChange = useCallback((e) => {
    e.preventDefault();

    const { name, value } = e.target;
    // 회원가입 상태값 갱신
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
    if(userName) {
      setNameErrorMsg('');
      setNameErrorStyle({color: '#404040'});
    }
    if(email) {
      setEmailErrorMsg('');
      setEmailErrorStyle({color: '#404040'});
    }
    if(phoneNumber) {
      setPhoneErrorMsg('');
      setPhoneErrorStyle({color: '#404040'});
    }
  }, [register, userId, password, passwordCheck, userName, email, phoneNumber]);

  /** 
   * 회원가입 버튼의 submit 이벤트 발생시 
   */
  const onSubmit = useCallback( async (e) => {
    e.preventDefault();

    const current = e.target;

    try {
      // 아이디 유효성 검사
      RegexHelper.value(current.userId, '아이디를 입력해주세요.');
      RegexHelper.idCheck(current.userId, '4~10자리의 영문(소문자)과 숫자만 가능합니다.');

      // 비밀번호 유효성 검사
      RegexHelper.value(current.password,  '비밀번호를 입력해주세요.');
      RegexHelper.pwCheck(current.password,  '8~20자리의 영문(대/소문자)+숫자+특수문자만 가능합니다.');

      RegexHelper.value(current.passwordCheck, '비밀번호를 확인해주세요.');
      RegexHelper.compare(current.password, current.passwordCheck, '비밀번호가 일치하지 않습니다.');

      // 이름 유효성 검사
      RegexHelper.value(current.userName, '이름을 입력해주세요.');
      RegexHelper.nameCheck(current.userName, '2~10자리의 영문(소문자), 한글만 가능합니다.');

      // 이메일 유효성 검사
      RegexHelper.value(current.email, '이메일을 입력해주세요.');
      RegexHelper.emailCheck(current.email, '이메일 형식에 맞지 않습니다.');

      // 전화번호 유효성 검사
      RegexHelper.value(current.phoneNumber, '전화번호를 입력해주세요.');
      RegexHelper.cellphone(current.phoneNumber, '전화번호 형식에 맞지 않습니다. "-"이 있다면 빼고 입력해주세요.');

    } catch(err) {
      // 에러 메세지와 이모티콘 색 지정
      if(
        err.message === '아이디를 입력해주세요.' ||
        err.message === '4~10자리의 영문(소문자)과 숫자만 가능합니다.'
      ) {
        setIdErrorMsg(err.message);
        setIdErrorStyle({color: 'red'});
      }
      if(
        err.message === '비밀번호를 입력해주세요.' ||
        err.message === '8~20자리의 영문(대/소문자)+숫자+특수문자만 가능합니다.'
      ) {
        setPassErrorMsg(err.message);
        setPassErrorStyle({color: 'red'});
      }
      if(
        err.message === '비밀번호를 확인해주세요.' ||
        err.message === '비밀번호가 일치하지 않습니다.'
      ) {
        setPwCheckErrorMsg(err.message);
        setPwCheckErrorStyle({color: 'red'});
      }
      if(
        err.message === '이름을 입력해주세요.' ||
        err.message === '2~10자리의 영문(소문자), 한글만 가능합니다.'
      ) {
        setNameErrorMsg(err.message);
        setNameErrorStyle({color: 'red'});
      }
      if(
        err.message === '이메일을 입력해주세요.' ||
        err.message === '이메일 형식에 맞지 않습니다.'
      ) {
        setEmailErrorMsg(err.message);
        setEmailErrorStyle({color: 'red'});
      }
      if(
        err.message === '전화번호를 입력해주세요.' ||
        err.message === '전화번호 형식에 맞지 않습니다. "-"이 있다면 빼고 입력해주세요.'
      ) {
        setPhoneErrorMsg(err.message);
        setPhoneErrorStyle({color: 'red'});
      }

      err.field.focus();
      return;
    }

    // 아이디, 이메일, 전화번호 값 존재 여부 확인
    try {
      await axios.post('http://localhost:3001/api/users/check', register);

      Swal.fire({
        icon: 'success',
        iconColor: '#f3b017',
        text:'회원가입이 완료되었습니다.',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        navigate('/main');
        loginPageState(true);
      });

    } catch(e) {
      const errMsg = e.response.data.message;
      console.log(e);
      
      if(errMsg === '같은 아이디가 존재합니다.') {
        setIdErrorMsg(errMsg);
        setIdErrorStyle({color: 'red'});
      } 
      if(errMsg === '같은 이메일이 존재합니다.') {
        setEmailErrorMsg(errMsg);
        setEmailErrorStyle({color: 'red'});
      }
      return;
    };
    
    // Redux 값 갱신 요청
    dispatch(postRegister(register));

  }, [dispatch, register, navigate, loginPageState]);

  /** 
   * input에 입력이 없을 시 초기상태로 변환 
   */
  useEffect(() => {
    if(!userId) setIdErrorStyle({color: '#bcbcbc'})
    if(!password) setPassErrorStyle({color: '#bcbcbc'});
    if(!passwordCheck) setPwCheckErrorStyle({color: '#bcbcbc'});
    if(!userName) setNameErrorStyle({color: '#bcbcbc'});
    if(!email) setEmailErrorStyle({color: '#bcbcbc'});
    if(!phoneNumber) setPhoneErrorStyle({color: '#bcbcbc'});
  }, [register, userId, password, passwordCheck, userName, email, phoneNumber]);

  return (
    <div>
      <>
        <Meta title={'SuperBox :: 회원가입'} />
        <Spinner visible={loading} />

        <LoginPageContainer style={{background: '#f7f8fb'}}>
          <Logo />
          <div className='login-wrap'>
            <div className='login-text'>
              <h3>SuperBox</h3>
              <p>회원가입</p>
              <p>지금 가입하고 다양한 서비스를 누리세요!</p>
            </div>
            <form className='login-input' onSubmit={onSubmit}>
              <InputBox
                icon={<FiUser />}
                errStyle={idErrorStyle}
                type={'text'}
                name={'userId'}
                // value={userId || ''}
                placeholder={'아이디를 입력하세요. (필수)'}
                onChange={onChange}
                errMsg={idErrorMsg}
              />
              {/* <button style={
                {
                  position: 'absolute',
                  width: '15%',
                  top: '22%',
                  right: '16%',
                  fontSize: '13px',
                }
              }>중복확인</button> */}

              <InputBox
                icon={<BsKey />}
                errStyle={passErrorStyle}
                type={'password'}
                name={'password'}
                // value={password || ''}
                placeholder={'비밀번호를 입력하세요. (필수)'}
                onChange={onChange}
                errMsg={passErrorMsg}
              />

              <InputBox
                icon={<AiOutlineCheckCircle />}
                errStyle={pwCheckErrorStyle}
                type={'password'}
                name={'passwordCheck'}
                // value={passwordCheck || ''}
                placeholder={'비밀번호를 확인해주세요. (필수)'}
                onChange={onChange}
                errMsg={pwCheckErrorMsg}
              />

              <InputBox
                icon={<FiSmile />}
                errStyle={nameErrorStyle}
                type={'text'}
                name={'userName'}
                // value={userName || ''}
                placeholder={'이름을 입력하세요. (필수)'}
                onChange={onChange}
                errMsg={nameErrorMsg}
              />

              <InputBox
                icon={<AiOutlineMail />}
                errStyle={emailErrorStyle}
                type={'email'}
                name={'email'}
                // value={email || ''}
                placeholder={'이메일을 입력하세요. (필수)'}
                onChange={onChange}
                errMsg={emailErrorMsg}
              />

              <InputBox
                icon={<MdPhoneIphone />}
                errStyle={phoneErrorStyle}
                type={'text'}
                name={'phoneNumber'}
                // value={phoneNumber || ''}
                placeholder={'" - " 제외, 연락처를 입력하세요.(필수)'}
                onChange={onChange}
                errMsg={phoneErrorMsg}
              />

              <button type='submit'>회원가입</button>
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