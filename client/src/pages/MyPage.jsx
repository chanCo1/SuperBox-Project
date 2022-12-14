/** 패키지 참조 */
import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import MypageProfile from '../components/mypage/MypageProfile';
import Withdrawal from '../components/profile/Withdrawal';

// 아이콘 참조
import { TbReportSearch } from 'react-icons/tb';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RiWechatLine } from 'react-icons/ri';

/**
 * @description 마이페이지
 * @param memberData 로그인한 사용자 정보 from App.jsx
 */
const MyPage = memo(({ memberData }) => {

  return (
    <>
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'마이페이지'} subtitle={'고객님의 정보를 한 눈에 확인해보세요'} />

      {/* 프로필 */}
      <MypageProfile memberData={memberData} />

      <Withdrawal memberData={memberData} />

      <MyPageContainer>
        <div className='mypage-wrap'>
          <Link to={'/mypage/reception'} className='mypage-item'>
            <TbReportSearch className='icon' />
            <h3>접수현황</h3>
            <p>진행중인 접수현황과 배송내역을 확인할 수 있어요</p>
          </Link>
          <Link to={'/mypage/review'} className='mypage-item'>
            <HiOutlinePencilAlt className='icon' />
            <h3>사용후기</h3>
            <p>내가 쓴 사용 후기를 확인해 보세요</p>
          </Link>
          <Link to={'/mypage/inquiry'} className='mypage-item'>
            <RiWechatLine className='icon' />
            <h3>1:1 문의</h3>
            <p>내가 남긴 1:1문의를 확인해 보세요</p>
          </Link>
        </div>
      </MyPageContainer>
    </>
  );
});

export default MyPage;

/** 마이페이지 스타일 */
const MyPageContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  color: #404040;
  
  @media (max-width: 1200px) { width: 80%; }
  @media (max-width: 925px) { width: 90%; }

  .welcome-user {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 30px;
    font-size: 18px;;
  }
  
  .mypage-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;
    
    .mypage-item {
      position: relative;
      border-radius: 20px;
      color: #404040;
      padding: 20px;
      margin-bottom: 40px;
      box-shadow: 5px 5px 10px #bcbcbc;
      cursor: pointer;
      transition: .2s ease;
      
      /* @media (max-width: 1200px) { width: 50%; } */
      @media (max-width: 925px) { width: 50%; }
      @media (max-width: 750px) { width: 100%; }

      &:hover { box-shadow: 10px 10px 15px #999; }
      &:active { transform: scale(.95, .95); }

      .icon {
        font-size: 5rem;
        margin: 0 250px 30px 0;
      }

      h3 { 
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 5px;
      }

      p {
        font-size: .9rem;
        color: #999;
      }
    }
  }
`;