/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Spinner from './Spinner';
import { setIsLogin } from '../slices/UserSlice';
import { ShowSlideItem, HideSlideItem } from '../utils/Event';

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
  /* border-bottom: 2px solid #f3b017; */
  background-color: #fff;
  /* opacity: .9; */
  z-index: 9;
  
  .header-wrap {
    position: relative;
    width: 1200px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 1200px) {
      width: 90%;
      margin: 0 auto;
    }
    
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
        transition: .4s ease;
        opacity: 0;
        max-height: 0;
        
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
      &:active { transform: scale(0.9, 0.9); }
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
  ${(props) => props.state && css` max-height: 100vh; `}
`;

/** 
 * 나타낼 값 시작
 */
const Header = memo(({ loginPageState }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subMenuRef = useRef();

  /** Store를 통해 user 상태값 호출 */
  const { loading, isLogin } = useSelector(state => state.user);

  // 로그인 버튼 클릭시 app.jsx에서 받은 상태값을 true 바꾼다.
  const loginBtnClick = useCallback(() => {
    loginPageState(true);
  }, [loginPageState]);

  // 로그아웃 버튼
  const logoutBtnClick = useCallback((e) => {
    window.localStorage.clear();
    dispatch(setIsLogin(false));

    Swal.fire({
      icon: 'info',
      iconColor: '#f3b017',
      text:'로그아웃 되었습니다.',
      showConfirmButton: false,
      timer: 1000,
    });

    navigate('/main');
  }, [dispatch, navigate]);

  // 로그인 상태가 false면 배송접수 버튼 차단
  const connectReceptionPage = useCallback(e => {
    if(!isLogin) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#f3b017',
        text:'로그인 후 이용해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        loginPageState(true);
      });

      e.preventDefault();
    }
  }, [isLogin, loginPageState])

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
            <NavLink className="NavLink nav" to={'/reception'} onClick={connectReceptionPage}><li>배송접수</li></NavLink>
            <NavLink className="NavLink nav" to={'/review'}><li>고객후기</li></NavLink>
            <li 
              className="NavLink nav" 
              onMouseOver={() => ShowSlideItem(subMenuRef)}
              onMouseOut={() => HideSlideItem(subMenuRef)}
            >
              고객센터
              <ul className='customer-Subnav' ref={subMenuRef}>
                <Link to={'/customer/notice'}><li>공지사항</li></Link>
                <Link to={'/customer/faq'}><li>자주 찾는 질문</li></Link>
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
            <button className='login-button' onClick={logoutBtnClick}>로그아웃</button>
          ) : (
            <button className='login-button' onClick={loginBtnClick}>로그인</button>
          )}
        </div>
      </HeaderContainer>
    </>
  );
});

export default Header;
