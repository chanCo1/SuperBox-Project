/** 패키지 참조 */
import React, { memo, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';

// 마이페이지 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';

/** 
 * Header 부분 스타일 정의 
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
    padding: 20px 10px;
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

      .nav {
        color: #404040;
        font-size: 20px;
        margin-right: 30px;
        cursor: pointer;
      }

      .NavLink {
        &:hover {
          text-decoration: underline #f3b017;
          text-underline-position: under;
          text-decoration-thickness: 5px;
        }
      }

      .active {
        text-decoration: underline #f3b017;
        text-underline-position: under;
        text-decoration-thickness: 5px;
      }
    }

    .login-button {
      background-color: #fff;
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

// 고객센터 서브메뉴 css 처리
const CustomerSubnav = styled.ul`
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
  
  a {
    display: flex;
    justify-content: end;

    .user-circle {
      color: #999;
      border-radius: 50%;
      transition: ease .3s;
  
      &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      }
      &:active {
        transform: scale(0.9, 0.9);
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
const Header = memo(() => {
  // 로그인 상태값 -> 로그인 구현하면 활용할 예정
  const [login, setLogin] = useState(false);
  // 고객센터 서브메뉴 on/off -> 최대높이값을 주는걸로 해결
  const [customerStyle, setCustomerStyle] = useState({ maxHeight: 0, opacity: 0 });

  // // active 상태값
  // const [isActive, setActive] = useState(false);

  // // 패스파라미터 값 가져오기
  // const params = useParams();

  // 고객센터 서브메뉴를 마우스 상태에 따라 
  const onMouseOver = useCallback(() => {
    setCustomerStyle({ maxHeight: '100vh', opacity: 1 });
  }, []);
  const onMouseOut = useCallback(() => {
    setCustomerStyle({ maxHeight: 0, opacity: 0 });
  }, []);

  // // active 클래스 추가를 위한 boolean 값 도출
  // const onClickActive = useCallback(() => {
  //   setActive(params.path ? true : false);
  // }, [params]);

  return (
    <>
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
              <CustomerSubnav style={customerStyle}>
                <Link to={'/customer/notice'}><li>공지사항</li></Link>
                <Link to={'/customer/faq'}><li>자주찾는 질문</li></Link>
                <Link to={'/customer/inqury'}><li>1:1 문의</li></Link>
              </CustomerSubnav>
            </li>
          </ul>

          <MyPage state={login}>
            <Link to={'/mypage'}>
              <FaUserCircle className='user-circle'/>
            </Link>
          </MyPage>

          <Link to={'/login'}>
            <button className='login-button'>로그인</button>
          </Link>
        </div>
      </HeaderContainer>
    </>
  );
});

export default Header;
