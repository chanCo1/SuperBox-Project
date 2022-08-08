/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin } from '../slices/UserSlice';

import Spinner from './Spinner';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

// 마이페이지 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';

/** 
 * Header 스타일 정의 
 */
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  border-bottom: 4px solid #f3b017;
  background-color: #fff;
  z-index: 1;

  .header-wrap {
    position: relative;
    width: 1200px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .logo {
      display: flex;
      align-items: center;

      img {
        width: 85px;
        height: 50px;
      }

      h1 {
        margin: 0 10px;
        color: #f3b017;
        font-size: 26px;
        font-weight: 500;
      }
    }

    .nav-wrap {
      display: flex;
      width: 60%;
      padding: 0;

      .NavLink {
        &:hover {
          text-decoration: underline #f3b017;
          text-underline-position: under;
          text-decoration-thickness: 5px;
        }
      }

      .nav {
        color: #404040;
        font-size: 20px;
        margin-right: 30px;
        cursor: pointer;
      }

      .active {
        text-decoration: underline #f3b017;
        text-underline-position: under;
        text-decoration-thickness: 5px;
      }

      .customer-Subnav {
        position: absolute;
        background-color: #fff;
        padding: 0 20px;
        margin-top: 10px;
        border: 1px solid #f3b017;
        border-radius: 15px;
        overflow: hidden;
        transition: .3s ease-in;

        li {
          margin: 0;
          padding: 10px 0;
          font-size: 17px;
          color: #404040;

          &:hover {
            text-decoration: underline #f3b017;
            text-underline-position: under;
            text-decoration-thickness: 3px;
          }
        }
      }
    }

    .login-button {
      background-color: #fff;
      width: 101px;
      border: 1px solid #f3b017;
      color: #f3b017;
      padding: 5px 20px;
      cursor: pointer;
      transition: ease .3s;
      border-radius: 5px;
      font-size: 16px;

      &:hover {
        background-color: #f3b017;
        color: #fff;
      }
      &:active {
        transform: scale(0.9, 0.9);
      }
    }
  }
`;

// 로그인 상태값에 따른 css 처리
const MyPage = styled.div`
  display: flex;
  font-size: 2.5rem;
  cursor: pointer;
  overflow: hidden;
  max-height: 0;
  border-radius: 50%;
  transition: ease .3s;

  &:hover {  
    transform: scale(1.2, 1.2);
  }
  
  a {
    display: flex;
    justify-content: end;
    
    .user-circle {
      color: #999;
      transition: ease .3s;
      
      &:active {
        transform: scale(0.8, 0.8);
      }
    }
  }

  // props로 css 상태값 변경
  ${(props) => props.state && css`
    max-height: 100vh;
  `}
`;

/** 
 * 나타낼 값 시작
 */
const Header = memo(({ loginPageState }) => {

  const dispatch = useDispatch();

  /** Store를 통해 상태값 호출 */
  const { loading, isLogin } = useSelector(state => state.user);
  console.log('isLogin>>>>>',isLogin);


  // // 로그인 상태값 -> 로그인 구현하면 활용할 예정
  // const [login, setLogin] = useState(false);

  // // 로그인 성공 시 마이페이지 아이콘 표시
  // useEffect(() => {
  //   if(data?.message === '로그인 성공') {
  //     setLogin(true);
  //   }
  // }, [data]);

  // 고객센터 서브메뉴 on/off -> 최대높이값을 주는걸로 해결
  const [customerStyle, setCustomerStyle] = useState({ maxHeight: 0, opacity: 0 });

  // 고객센터 서브메뉴를 마우스 상태에 따라 변환
  const onMouseOver = useCallback(() => {
    setCustomerStyle({ maxHeight: '100vh', opacity: 1 });
  }, []);
  const onMouseOut = useCallback(() => {
    setCustomerStyle({ maxHeight: 0, opacity: 0 });
  }, []);

  // 로그인 버튼 클릭시 app.jsx에서 받은 상태값을 true 바꾼다.
  const loginBtnClick = useCallback(() => {
    loginPageState(true);
  }, [loginPageState]);

  // 로그아웃 버튼
  const logoutBtn = useCallback((e) => {
    window.localStorage.clear();
    dispatch(setIsLogin(false));
    alert('로그아웃 되었습니다.');
  }, [dispatch]);

  return (
    <>
      <Spinner visible={loading} />

      <HeaderContainer>
        <div className="header-wrap">

          <Link to={'/main'}>
            <div className="logo">
              <img src={logo} alt="superbox-logo" />
              <h1>SuperBox</h1>
            </div>
          </Link>

          <ul className="nav-wrap">
            <NavLink className="NavLink nav" to={'/receive'}><li>배송접수</li></NavLink>
            <NavLink className="NavLink nav" to={'/review'}><li>고객후기</li></NavLink>
            <li className="NavLink nav" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
              고객센터
              <ul className='customer-Subnav' style={customerStyle}>
                <Link to={'/customer/notice'}><li>공지사항</li></Link>
                <Link to={'/customer/faq'}><li>자주찾는 질문</li></Link>
                <Link to={'/customer/inquiry'}><li>1:1 문의</li></Link>
              </ul>
            </li>
          </ul>

          <MyPage state={isLogin}>
            <Link to={'/mypage'}>
              <FaUserCircle className='user-circle'/>
            </Link>
          </MyPage>

          {isLogin ? (
            <button className='login-button' onClick={logoutBtn}>로그아웃</button>
          ) : (
            <button className='login-button' onClick={loginBtnClick}>로그인</button>
          )}
          {/* <Link to={'/login'}>
          </Link> */}
        </div>
      </HeaderContainer>
    </>
  );
});

export default Header;
