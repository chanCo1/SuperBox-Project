/** 패키지 참조 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import ReviewList from '../components/review/ReviewList';
import { BiPencil } from 'react-icons/bi';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

const ReviewPage = memo(() => {
  const { isLogin } = useSelector((state) => state.user);

  return (
    <ReviewPageContainer>
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'고객님들의 후기를 공유해보세요!'}
      />

      <div className="review-nav">
        {isLogin && (
          <Link to={'/review/review_write'}>
            <button className="write-btn">
              <BiPencil className="icon" />새 글 쓰기
            </button>
          </Link>
        )}
      </div>
      <ReviewList />
    </ReviewPageContainer>
  );
});

export default ReviewPage;

const ReviewPageContainer = styled.div`
  width: 1200px;
  margin: 0 auto 80px;

  .review-nav {
    text-align: end;

    .write-btn {
      text-align: end;
      /* position: relative; */
      background-color: #fff;
      padding: 5px 20px;
      border: 1px solid #f3b017;
      border-radius: 5px;
      color: #f3b017;
      font-size: 1.1rem;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background-color: #f3b017;
        color: #fff;
      }

      .icon {
        position: relative;
        margin-right: 5px;
        top: 3px;
        font-size: 1.2rem;
      }
    }
  }
`;
