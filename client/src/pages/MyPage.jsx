/** 패키지 참조 */
import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

import { TbReportSearch } from 'react-icons/tb'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { RiWechatLine } from 'react-icons/ri'
import { FiUserPlus } from 'react-icons/fi'
import { AiOutlineStop } from 'react-icons/ai'

/**
 * @description 마이페이지
 */
const MyPage = memo(() => {
  return (
    <>
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'마이페이지'} subtitle={'고객님의 정보를 한 눈에 확인해보세요.'} />

      <MyPageContainer>
        <div className='mypage-wrap'>
          <div className='mypage-item'>
            <TbReportSearch className='icon' />
            <h3>접수현황</h3>
            <p>진행중인 접수현황과 배송내역을 확인할 수 있어요</p>
          </div>
          <div className='mypage-item'>
            <HiOutlinePencilAlt className='icon' />
            <h3>접수현황</h3>
            <p>내가 쓴 사용 후기 확인하기</p>
          </div>
          <div className='mypage-item'>
            <RiWechatLine className='icon' />
            <h3>1:1 문의</h3>
            <p>내가 남긴 1:1문의 내용 확인하기</p>
          </div>
          <div className='mypage-item'>
            <FiUserPlus className='icon' />
            <h3>개인정보관리</h3>
            <p>개인정보를 수정할 수 있어요</p>
          </div>
          <div className='mypage-item'>
            <AiOutlineStop className='icon' />
            <h3>회원탈퇴</h3>
          </div>
          <div className='mypage-item'>
            <AiOutlineStop className='icon' />
          </div>
        </div>
      </MyPageContainer>
    </>
  );
});

export default MyPage;

const MyPageContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 80%;
    /* margin: 0 auto; */
  }

  .mypage-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;
    
    .mypage-item {
      border-radius: 5px;
      box-shadow: 5px 5px 10px #bcbcbc;
      color: #404040;
      padding: 20px;
      margin-bottom: 40px;

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

      &:last-child {
        opacity: 0;

        @media (max-width: 1200px) { display: none; }
      }
    }
  }
`;