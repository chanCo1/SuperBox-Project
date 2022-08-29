/** 패키지 참조 */
import React, { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import ReviewList from '../components/review/ReviewList';
import { BiPencil } from 'react-icons/bi';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineSearch } from 'react-icons/ai';

/**
 * 후기 페이지
 */
const ReviewPage = memo(() => {

  /** 리덕스 로그인 상태 */
  const { isLogin } = useSelector((state) => state.user);

  // 정렬 상태값 저장
  const [sort, setSort] = useState('review_no');

  /** 정렬 클릭 */
  const onSortClick = useCallback(e => {
    e.preventDefault();

    setSort(e.target.dataset.sort);
  }, []);

  return (
    <ReviewPageContainer>
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'고객님들의 후기를 공유해 보세요!'}
      />

      <div className="review-nav">
        <div className='review-sort' onClick={onSortClick}>
          <span
            className={sort === 'review_no' ? 'active' : ''}
            data-sort={'review_no'}>최신순
          </span>
          <span
            className={sort === 'like_count' ? 'active' : ''}
            data-sort={'like_count'}>인기순
          </span>
          <span
            className={sort === 'comment_count' ? 'active' : ''}
            data-sort={'comment_count'}>댓글순
          </span>
          <span
            className={sort === 'view_count' ? 'active' : ''}
            data-sort={'view_count'}>조회순
          </span>
        </div>

        <div className='review-search-wrap'>
          <div className='review-search'>
            <input className='input-area' type="text" name='search' placeholder='후기 검색' />
            <AiOutlineSearch />
          </div>

          {isLogin && (
            <Link to={'/review/review_write'}>
              <button className="write-btn">
                <BiPencil className="icon" />새 글 쓰기
              </button>
            </Link>
          )}
        </div>
      </div>
      
      <ReviewList sort={sort} />

    </ReviewPageContainer>
  );
});

export default ReviewPage;

/** 후기 페이지 스타일 */
const ReviewPageContainer = styled.div`
  width: 1200px;
  margin: 0 auto 80px;

  .review-nav {
    display: flex;
    width: 1100px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    .review-sort {
      display: flex;
      
      span {
        margin-right: 20px;
        cursor: pointer;

        &:hover {
          text-decoration: underline #f3b017;
          text-underline-position: under;
          text-decoration-thickness: 3px;
        }
      }

      .active {
        text-decoration: underline #f3b017;
        text-underline-position: under;
        text-decoration-thickness: 3px;
      }
    }

    .review-search-wrap {
      display: flex;
      
      .review-search {
        border: 1px solid #bcbcbc;
        border-radius: 10px;

        &:focus-within { box-shadow: 0 0 5px #2a376888; }
        
        .input-area {
          border: none;
          border-radius: 10px;
          padding: 8px 20px;
          font-size: 1rem;
          color: #404040;

          &::-webkit-input-placeholder { color: #bcbcbc; }
        }
      }
  
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
        margin-left: 20px;
        transition: 0.2s ease;
  
        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
        &:active { transform: scale(.8, .8); }
  
        .icon {
          position: relative;
          margin-right: 5px;
          top: 3px;
          font-size: 1.2rem;
        }
      }
    }

  }
`;
