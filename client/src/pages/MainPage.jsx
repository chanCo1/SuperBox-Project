/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// 아이콘 참조
import { FaRegComment, FaUserFriends } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai';
// import { MdArrowForwardIos } from 'react-icons/md';
import { RiUserReceivedFill, RiCustomerServiceLine } from 'react-icons/ri';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDoubleArrow } from 'react-icons/md';

// 이미지 참조
import logo from '../assets/image/superbox-logo.png';
import receive from '../assets/image/receive-screenshot.png';

// 컴포넌트 참조
import Meta from '../Meta';
import { Link } from 'react-router-dom';

// 메인페이지 로고 섹션 스타일
const MainLogoContainer = styled.div`
  width: 100%;
  text-align: center;
  
  .main-logo-wrap {
    width: 1200px;
    margin: auto;
    padding: 225px 0 120px; 
    font-weight: 500;
    
    .logo {
      position: relative;
      width: 30rem;
      animation: fly-logo 10s ease infinite;

      @keyframes fly-logo {
        0% {
          transform: translate(-1500px, -200px);
        }
        40% {
          transform: translate(0, 0);
        }
        60% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(1500px, -300px);
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

const MainReceiveContainer = styled.div`
  width: 100%;
  padding: 40px 0 0;
  background-color: #f7f8fb;

  .main-receive-wrap {
    position: relative;
    display: flex;
    width: 1200px;
    margin: auto;
    justify-content: space-between;

    .receive-text {
      width: 50%;
      padding: 40px 0;
      color: #404040;
      font-weight: 500;

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

    .receive-img {
      padding: 40px 0 0;
      width: 50%;

      img {
        width: 100%;
      }
    }
  }
`;

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

      h3 {
        font-size: 3rem;
        color: #f3b017;
        margin: 0 0 40px;
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
      width: 40%;
      font-size: 20rem;
      color: #2a3768;
    }
  }
`;

const MainUseStartContainer = styled.div`
  width: 100%;
  padding: 90px 0;
  text-align: center;

  .main-useStart-wrap {
    width: 1200px;
    margin: auto;

    P {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 50px;

      span {
        color: #f3b017;
      }
    }

    .useStart-btn-wrap {
      display: flex;
      justify-content: space-around;

      .useStart-btn {
        display: flex;
        flex-direction: column;
        transition: .3s ease;

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

const MainPage = memo(() => {

  const testRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);

  const testScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
  }

  useEffect(() => {
    window.addEventListener('scroll', testScroll);
  }, []);

  return (
    <>
      <Meta title={'SuperBox :: 메인페이지'} />

      <MainLogoContainer>
        <div className='main-logo-wrap'>
          <img className='logo' src={logo} alt="superbox-logo" />
          <h2>SuperBox</h2>
          <p>누구나 한번 쯤은 택배 상자를 받고 설레는 기분을 느꼈을거예요.</p>
          <p>그 기분, <span>SuperBox</span>를 통해 더 오래, 더 많이 느껴보세요.</p>
        </div>
      </MainLogoContainer>

      <MainReceiveContainer>
        <div className='main-receive-wrap'>
          <div className='receive-text'>
            <p>언제 어디서든<br />쉽고, 간편하게</p>
            <p>저희에게 설렘을 접수하세요.</p>
            <p>전국 어디든 원하시는 분에게 전달해 드립니다.</p>
          </div>
          <div className='receive-img'>
            <img src={receive} alt="receive-img" />
          </div>
        </div>
      </MainReceiveContainer>

      <MainReviewContainer>
        <div className='main-review-wrap'>
          <div className='review-icon-wrap'>
            <FaUserFriends className='review-icon1' />
            <FaRegComment className='review-icon2' />
            <img src={logo} alt="superbox-lgo" />
          </div>
          <div className='review-text'>
            <h3>고객후기</h3>
            <p>저희 서비스를 이용하시고 생생한 후기를 공유 해주세요!</p>
            <p>후기를 통해 여러분들에게 한 발자국 더 다가서겠습니다.</p>
          </div>
        </div>
      </MainReviewContainer>

      <MainCustomerContainer>
        <div className='main-customer-wrap'>
          <div className='customer-text'>
            <h3>고객센터</h3>
            <p>궁금한게 있으면 언제든지 물어보세요.</p>
            <p>공지사항과 자주찾는 질문,<br />1:1 문의는 여러분들을 위해 항상 열려있습니다.</p>
          </div>
          <AiOutlineFileSearch className='customer-icon' />
        </div>
      </MainCustomerContainer>

      <MainUseStartContainer>
        <div className='main-useStart-wrap'>
          <p>그럼 <span>Superbox</span> 한 번 사용해 볼까요?</p>
          <div className='useStart-btn-wrap'>
            <Link to={'/receive'} className='useStart-btn'>
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
            <Link to={'/customer/notice'} className='useStart-btn'>
              <button className='start-btn'>
                <RiCustomerServiceLine className='btn-icon' />
              </button>
              <span>고객센터<MdDoubleArrow /></span>
            </Link>
          </div>
        </div>
      </MainUseStartContainer>
    </>
  );
});

export default MainPage;