/**
 * 메인 페이지 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../Meta';
import { ScrollEvent } from '../utils/Event';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';
import reception from '../assets/image/reception.png';
import customerCenter from '../assets/image/customer2.png';
import review from '../assets/image/review.png';
// import delivery from '../assets/image/delivery.png';
import receptionIcon from '../assets/image/reception-icon2.png';
import reviewIcon from '../assets/image/review-icon.png';
import inquirynIcon from '../assets/image/inquiry-icon.png';

// 아이콘 참조
import { MdDoubleArrow } from 'react-icons/md';

/** 
 * 메인페이지
 */
const MainPage = memo(({ loginPageState }) => {

  const navigate = useNavigate();

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

  // // 로그인 상태가 false면 배송접수 버튼 차단
  // const connectReceptionPage = useCallback(e => {
  //   e.preventDefault();
    
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
  //   } else {
  //     navigate('/reception');
  //   }
  // }, [isLogin, loginPageState, navigate])

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
            <img src={review} alt="고객후기 이미지" />
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
            <p>자주 찾는 질문과 1:1 문의는<br />여러분들을 위해 항상 열려있습니다.</p>
          </div>
          <div className='customer-icon' ref={customerImgRef}>
            <img src={customerCenter} alt="고객센터 이미지" />
          </div>
        </div>
      </MainCustomerContainer>

      <MainUseStartContainer>
        <div className='main-useStart-wrap'>
          <p ref={useStartTextRef}>그럼 <span>Superbox</span> 한 번 사용해 볼까요?</p>
          <div className='useStart-btn-wrap' ref={useStartBtnRef}>
            <Link to={'/reception'} className='useStart-btn'>
              <button className='start-btn'>
                {/* <RiUserReceivedFill className='btn-icon' /> */}
                <img className='btn-icon' src={receptionIcon} alt="" />
              </button>
              <span>배송접수<MdDoubleArrow /></span>
            </Link>
            <Link to={'/review'} className='useStart-btn'>
              <button className='start-btn'>
                {/* <BsPencilSquare className='btn-icon'/> */}
                <img className='btn-icon' src={reviewIcon} alt="" />
              </button>
              <span>고객후기<MdDoubleArrow /></span>
            </Link>
            <Link to={'/customer/inquiry'} className='useStart-btn'>
              <button className='start-btn'>
                {/* <HiOutlineChatAlt2 className='btn-icon' /> */}
                <img className='btn-icon' src={inquirynIcon} alt="" />
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


/** 메인페이지 로고 섹션 스타일 */
const MainLogoContainer = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  
  .main-logo-wrap {
    max-width: 1200px;
    height: 100vh;
    margin: 0 auto;
    padding: 220px 0 15vw;
    /* font-weight: 500; */
    transition: 1s ease-in-out;
    
    .logo {
      position: relative;
      width: 30vw;
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
      font-size: 4vw;
      margin: 1.5vw 0 1vw;
    }
  
    p {
      font-size: 1.5vw;
      margin: 1vw 0;
      color: #404040;
  
      span {
        color: #f3b017;
      }
    }
  }

  /** responsive */
  @media (max-width: 767px) {
    .main-logo-wrap{
      padding: 25vh 0 20vh;

      .logo {
        width: 60vw;
      }

      h2 {
        font-size: 9vw;
      }

      p {
        width: 80%;
        font-size: 5vw;
        margin: 0 auto;
      }
    }
  }
`;

/** 메인페이지 접수 섹션 스타일 */
const MainReceptionContainer = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: #f7f8fb;

  .main-reception-wrap {
    position: relative;
    display: flex;
    max-width: 1200px;
    margin: auto;
    justify-content: space-between;

    .reception-text {
      width: 50%;
      margin: auto 0;
      /* padding: 0 0 50px; */
      color: #404040;
      transition: 1s ease-in-out;

      p:nth-child(1) {
        font-size: 1.5rem;
        margin: 0 0 30px;
        color: #999;
      }
      p:nth-child(2) {
        font-size: 2.5rem;
        margin: 0;
      }
      p:nth-child(3) { font-size: 1.2rem; }
    }

    .reception-img {
      position: relative;
      display: flex;
      align-content: flex-end;
      width: 50%;
      transition: 1s ease-in-out;
      
      img {
        position: relative;
        width: 100%;
      }
    }
  }
`;

/** 메인페이지 고객후기 섹션 스타일 */
const MainReviewContainer = styled.div`
  width: 100%;
  padding: 90px 0;

  .main-review-wrap {
    position: relative;
    display: flex;
    max-width: 1200px;
    margin: auto;

    .review-icon-wrap {
      width: 50%;
      transition: 1s ease-in-out;

      img {
        width: 70%;
      }
    }

    .review-text {
      width: 50%;
      color: #404040;
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
        color: #999;
      }
    }
  }
`;

/** 메인페이지 고객센터 섹션 스타일 */
const MainCustomerContainer = styled.div`
  width: 100%;
  background-color: #f7f8fb;
  padding: 40px 0;
  
  .main-customer-wrap {
    display: flex;
    width: 1200px;
    margin: auto;

    .customer-text {
      width: 60%;
      color: #404040;
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
        color: #999;
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

      img { width: 100%; }
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
          /* border: none; */
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
          /* &:active {
            transform: scale(.9, .9);
          } */

          .btn-icon {
            width: 200px;
            height: 180px;
          }
        }

        span {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          padding: 0 20%;
          color: #404040;
          justify-content: space-around;
          z-index: 9;
        }
      }
    }
  }
`;