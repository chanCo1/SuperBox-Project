/**
 * 메인 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../Meta';
import { ScrollEvent } from '../utils/Event';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';
import reception from '../assets/image/reception-screenshot.png';

// 아이콘 참조
import { FaRegComment, FaUserFriends } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { RiUserReceivedFill, RiCustomerServiceLine } from 'react-icons/ri';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDoubleArrow } from 'react-icons/md';

/** 메인페이지 로고 섹션 스타일 */
const MainLogoContainer = styled.div`
  width: 100%;
  text-align: center;
  
  .main-logo-wrap {
    width: 1200px;
    height: 100vh;
    margin: auto;
    padding: 225px 0 120px; 
    font-weight: 500;
    transition: 1s ease-in-out;
    
    .logo {
      position: relative;
      width: 30rem;
      animation: fly-logo 13s ease infinite;

      @keyframes fly-logo {
        0% {
          transform: translate(-1500px, -300px);
        }
        20% {
          transform: translate(0, 0);
        }
        80% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(1500px, -400px);
        }
      }
    }
  
    h2 {
      color: #f3b017;
      font-size: 4rem;
      margin: 10px 0 40px;
    }
  
    p {
      font-size: 1.5rem;
      margin: 10px 0;
      color: #404040;
  
      span {
        color: #f3b017;
      }
    }
  }
`;

/** 메인페이지 접수 섹션 스타일 */
const MainReceptionContainer = styled.div`
  width: 100%;
  padding: 40px 0 0;
  background-color: #f7f8fb;

  .main-reception-wrap {
    position: relative;
    display: flex;
    width: 1200px;
    margin: auto;
    justify-content: space-between;

    .reception-text {
      width: 50%;
      padding: 40px 0;
      color: #404040;
      font-weight: 500;
      transition: 1s ease-in-out;

      p:nth-child(1) {
        font-size: 1.5rem;
        margin: 0 0 30px;
      }
      p:nth-child(2) {
        font-size: 2.5rem;
        margin: 0;
      }
      p:nth-child(3) {
        font-size: 1.2rem;
      }
    }

    .reception-img {
      padding: 40px 0 0;
      width: 50%;
      transition: 1s ease-in-out;

      img {
        width: 100%;
      }
    }
  }
`;

/** 메인페이지 고객후기 섹션 스타일 */
const MainReviewContainer = styled.div`
  width: 100%;
  padding: 40px 0;

  .main-review-wrap {
    position: relative;
    display: flex;
    width: 1200px;
    margin: auto;

    .review-icon-wrap {
      width: 50%;
      color:#2a3768;
      padding: 50px 0;
      transition: 1s ease-in-out;
      
      .review-icon1 {
        font-size: 18rem;
        margin: 10% 0 0 10%;
      }
      .review-icon2 {
        position: absolute;
        font-size: 10rem;
      }

      img {
        position: absolute;
        width: 8%;
        top: 20%;
        left: 31%;
      }
    }

    .review-text {
      width: 50%;
      color: #404040;
      font-weight: 500;
      margin: auto 0;
      transition: 1s ease-in-out;

      h3 {
        font-size: 3rem;
        color: #f3b017;
        margin: 0 0 20px;
      }

      p:nth-child(2) {
        font-size: 1.6rem;
        margin: 0 0 10px;
      }
      p:nth-child(3) {
        font-size: 1.3rem;
        margin: 0;
      }
    }
  }
`;

/** 메인페이지 고객센터 섹션 스타일 */
const MainCustomerContainer = styled.div`
  width: 100%;
  background-color: #f7f8fb;
  padding: 90px 0;
  
  .main-customer-wrap {
    display: flex;
    width: 1200px;
    margin: auto;

    .customer-text {
      width: 60%;
      color: #404040;
      font-weight: 500;
      margin: auto 0;
      transition: 1s ease-in-out;

      h3 {
        color: #f3b017;
        font-size: 1.5rem;
      }

      p:nth-child(2) {
        font-size: 2.5rem;
        margin-bottom: 30px;
      }
      p:nth-child(3) {
        font-size: 1.2rem;
      }
    }

    .customer-icon {
      position: relative;
      display: flex;
      justify-content: center;
      width: 40%;
      font-size: 20rem;
      color: #2a3768;
      transition: 1s ease-in-out;
    }
  }
`;

/** 메인페이지 사용해볼까요 섹션 스타일 */
const MainUseStartContainer = styled.div`
  width: 100%;
  padding: 130px 0;
  text-align: center;

  .main-useStart-wrap {
    width: 1200px;
    margin: auto;
    
    P {
      font-size: 2rem;
      font-weight: 500;
      color: #404040;
      margin-bottom: 50px;
      transition: 1s ease-in-out;

      span {
        color: #f3b017;
      }
    }

    .useStart-btn-wrap {
      display: flex;
      justify-content: space-around;
      transition: 1s ease-in-out;

      .useStart-btn {
        display: flex;
        flex-direction: column;

        .start-btn {
          font-size: 1.5rem;
          border: 3px solid #f3b017;
          border-radius: 20%;
          background-color: #fff;
          padding: 30px;
          margin-bottom: 20px;
          cursor: pointer;
          transition: .3s ease-out;

          &:hover {
            transform: scale(1.1, 1.1);
          }
          &:active {
            transform: scale(.9, .9);
          }

          .btn-icon {
            color: #2a3768;
            font-size: 10rem;
          }
        }

        span {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 500;
          padding: 0 20%;
          color: #404040;
          justify-content: space-around;
        }
      }
    }
  }
`;

const MainPage = memo(({ loginPageState }) => {

  /** Store를 통해 상태값 호출 */
  const { loading, isLogin } = useSelector(state => state.user);

  /** 사용할 useRef 호출 */
  const logoRef = useRef();
  const receptionTextRef = useRef();
  const receptionImgRef = useRef();
  const reviewImgRef = useRef();
  const reviewTextRef = useRef();
  const customerTextRef = useRef();
  const customerImgRef = useRef();
  const useStartTextRef = useRef();
  const useStartBtnRef = useRef();

  /** 스크롤 이벤트 함수 호출 */
  useEffect(() => {
    ScrollEvent(logoRef, receptionTextRef, receptionImgRef, reviewImgRef, reviewTextRef, customerTextRef, customerImgRef, useStartTextRef, useStartBtnRef);
  }, []);

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
    <div>
      <Meta title={'SuperBox :: 메인페이지'} />

      <MainLogoContainer>
        <div className='main-logo-wrap' ref={logoRef}>
          <img className='logo' src={logo} alt="superbox-logo" />
          <h2>SuperBox</h2>
          <p>누구나 한번 쯤은 택배 상자를 받고 설레는 기분을 느꼈을거예요.</p>
          <p>그 기분, <span>SuperBox</span>를 통해 더 오래, 더 많이 느껴보세요.</p>
        </div>
      </MainLogoContainer>

      <MainReceptionContainer>
        <div className='main-reception-wrap'>
          <div className='reception-text' ref={receptionTextRef}>
            <p>언제 어디서든<br />쉽고, 간편하게</p>
            <p>저희에게 설렘을 접수하세요.</p>
            <p>전국 어디든 원하시는 분에게 전달해 드립니다.</p>
          </div>
          <div className='reception-img' ref={receptionImgRef}>
            <img src={reception} alt="reception-img" />
          </div>
        </div>
      </MainReceptionContainer>

      <MainReviewContainer>
        <div className='main-review-wrap'>
          <div className='review-icon-wrap' ref={reviewImgRef}>
            <FaUserFriends className='review-icon1' />
            <FaRegComment className='review-icon2' />
            <img src={logo} alt="superbox-lgo" />
          </div>
          <div className='review-text' ref={reviewTextRef}>
            <h3>고객후기</h3>
            <p>저희 서비스를 이용하시고 생생한 후기를 공유 해주세요!</p>
            <p>후기를 통해 여러분들에게 한 발자국 더 다가서겠습니다.</p>
          </div>
        </div>
      </MainReviewContainer>

      <MainCustomerContainer>
        <div className='main-customer-wrap'>
          <div className='customer-text' ref={customerTextRef}>
            <h3>고객센터</h3>
            <p>궁금한게 있으면 언제든지 물어보세요.</p>
            <p>공지사항과 자주찾는 질문,<br />1:1 문의는 여러분들을 위해 항상 열려있습니다.</p>
          </div>
          <div className='customer-icon' ref={customerImgRef}>
            <AiOutlineFileSearch />
          </div>
        </div>
      </MainCustomerContainer>

      <MainUseStartContainer>
        <div className='main-useStart-wrap'>
          <p ref={useStartTextRef}>그럼 <span>Superbox</span> 한 번 사용해 볼까요?</p>
          <div className='useStart-btn-wrap' ref={useStartBtnRef}>
            <Link to={'/reception'} className='useStart-btn' onClick={connectReceptionPage}>
              <button className='start-btn'>
                <RiUserReceivedFill className='btn-icon' />
              </button>
              <span>배송접수<MdDoubleArrow /></span>
            </Link>
            <Link to={'/review'} className='useStart-btn'>
              <button className='start-btn'>
                <BsPencilSquare className='btn-icon'/>
              </button>
              <span>고객후기<MdDoubleArrow /></span>
            </Link>
            <Link to={'/customer/inquiry'} className='useStart-btn'>
              <button className='start-btn'>
                <RiCustomerServiceLine className='btn-icon' />
              </button>
              <span>1:1 문의<MdDoubleArrow /></span>
            </Link>
          </div>
        </div>
      </MainUseStartContainer>
    </div>
  );
});

export default MainPage;