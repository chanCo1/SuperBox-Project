/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Spinner from './Spinner';
import { setIsLogin } from '../slices/UserSlice';
import { ShowSlideItem, HideSlideItem } from '../utils/Event';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

// 아이콘
import { FaUserCircle } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc';

/**
 * @description 헤더 영역 정의
 * @param loginPageState 현재 로그인 상태값 / app.jsx
 */
const Header = memo(({ memberData, loading, isLogin, loginPageState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subMenuRef = useRef();
  const navItem = useRef();

  /**
   * 로그인 버튼 클릭시
   * app.jsx에서 받은 상태값을 true 바꾼다.
   */
  const loginBtnClick = useCallback(() => {
    loginPageState(true);
  }, [loginPageState]);

  /** 
   * 로그아웃 버튼 클릭시
   * 세션스토리지의 토큰 삭제
   */
  const logoutBtnClick = useCallback(
    (e) => {
      window.sessionStorage.clear();
      dispatch(setIsLogin(false));

      Swal.fire({
        icon: 'info',
        iconColor: '#f3b017',
        text: '로그아웃 되었습니다.',
        showConfirmButton: false,
        timer: 1500,
        footer: '다음에 또 만나요! 👋',
      });

      navigate('/main');
    },
    [dispatch, navigate]
  );

  /** 
   * 반응형에 따른 more버튼
   * @description 클릭시 open 클래스 toggle
   */
  const showBars = useCallback((e) => {
    navItem.current.classList.toggle("open");
  }, []);

  // // 로그인 상태가 false면 배송접수 버튼 차단
  // const connectReceptionPage = useCallback(e => {
  //   if(!isLogin) {
  //     Swal.fire({
  //       icon: 'warning',
  //       iconColor: '#f3b017',
  //       text:'로그인 후 이용해주세요.',
  //       confirmButtonText: '확인',
  //       confirmButtonColor: '#f3b017',
  //     }).then(() => {
  //       loginPageState(true);
  //     });

  //     e.preventDefault();
  //   }
  // }, [isLogin, loginPageState])

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

          <ul className="nav-wrap" ref={navItem}>
            <NavLink className="NavLink nav" to={'/reception'}>
              <li>배송접수</li>
            </NavLink>
            {/* <NavLink className="NavLink nav" to={'/mypage/reception'} onClick={connectReceptionPage}>
              <li>접수현황</li>
            </NavLink> */}
            <NavLink className="NavLink nav" to={'/review'}>
              <li>고객후기</li>
            </NavLink>
            <li
              className="NavLink nav"
              onMouseOver={() => ShowSlideItem(subMenuRef)}
              onMouseOut={() => HideSlideItem(subMenuRef)}
            >
              고객센터
              <ul className="customer-Subnav" ref={subMenuRef}>
                {/* <Link to={'/customer/notice'}><li>공지사항</li></Link> */}
                <Link to={'/customer/faq'}>
                  <li>자주 찾는 질문</li>
                </Link>
                <Link to={'/customer/inquiry'}>
                  <li>1:1 문의</li>
                </Link>
              </ul>
            </li>
          </ul>

          <MyPage state={isLogin}>
            <Link to={'/mypage'}>
              {memberData?.profile_img ? (
                <>
                  <img
                    src={memberData?.profile_img}
                    alt={`${memberData?.user_name} 프로필 이미지`}
                    className="profile-img"
                  />
                  <span>마이페이지</span>
                </>
              ) : (
                <>
                  <FaUserCircle className="profile-img-default" />
                  <span>마이페이지</span>
                </>
              )}
            </Link>
          </MyPage>

          {isLogin ? (
            <button className="login-button" onClick={logoutBtnClick}>
              로그아웃
            </button>
          ) : (
            <button className="login-button" onClick={loginBtnClick}>
              로그인
            </button>
          )}

          <div className="bars" onClick={showBars}>
            <VscThreeBars />
          </div>
        </div>
      </HeaderContainer>
    </>
  );
});

export default Header;

/**
 * Header 스타일
 */
const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  /* border-bottom: 2px solid #f3b017; */
  background-color: #fff;
  /* opacity: .9; */
  z-index: 99;

  .header-wrap {
    position: relative;
    max-width: 1200px;
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
        padding: 10px 20px;
        margin-top: 10px;
        border: 1px solid #f3b017;
        border-radius: 15px;
        overflow: hidden;
        transition: 0.4s ease;
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
      transition: ease 0.3s;
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

    .bars { display: none; }
  }

  /** responsive */
  @media (max-width: 767px) {
    .header-wrap {
      padding: 3vw;

      .logo {
        img {
          width: 12vw;
          height: 8vw;
        }

        h1 { font-size: 6vw; }
      }

      .nav-wrap { 
        position: absolute;
        padding: 5vw 5vw;
        width: 100%;
        right: -100%;
        min-height: 0;
        top: 15vw;
        border-top: 1px solid #404040;
        transition: 1s ease;

        .NavLink {
          visibility: hidden;
        }

        &.open {
          position: absolute;
          display: flex;
          flex-direction: column;
          top: 15vw;
          right: 0;
          max-height: 100vh;
          background-color : #fff;

          .NavLink { 
            visibility: visible;
            font-size: 5vw;
            line-height: 12vw;

            .customer-Subnav {
              li {
                font-size: 4vw;
                line-height: 5vw;
              }
            }
          }
        }
      }

      .login-button { display: none; }

      .bars { 
        display: flex;
        font-size: 8vw;
        color: #404040;
      }
    }
  }
`;

// 로그인 상태값에 따른 css 처리
const MyPage = styled.div`
  display: flex;
  font-size: 2.5rem;
  overflow: hidden;
  /* max-height: 0; */
  /* border: 1px solid #bcbcbc; */
  border-radius: 50%;
  transition: ease 0.3s;
  cursor: pointer;
  visibility: hidden;

  /* &:hover { transform: scale(1.1, 1.1); } */

  a {
    display: flex;
    justify-content: end;

    .profile-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: 0.3s ease;

      &:active {
        transform: scale(0.8, 0.8);
      }
    }

    .profile-img-default {
      color: #bcbcbc;
      transition: 0.3s ease;

      &:active {
        transform: scale(0.8, 0.8);
      }
    }
  }

  span {
    position: absolute;
    font-size: 11px;
    top: 70%;
    right: 11.3%;
    color: #999;
  }

  // props로 css 상태값 변경
  /* ${(props) => props.state && css` max-height: 100vh; `} */
  ${(props) => props.state && css` visibility: visible; `}

  /* responsive */
  @media (max-width: 767px) {
    /* a { display: none; } */
  }
`;
