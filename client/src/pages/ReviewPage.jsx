/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import ReviewList from '../components/review/ReviewList';
import Search from '../components/Search';
import { BiPencil } from 'react-icons/bi';

/**
 * @description 후기 페이지
 * @param memberData 로그인한 사용자 정보 /app.jsx
 * @param isLogin 로그인 상태 /app.jsx
 */
const ReviewPage = memo(({ memberData, isLogin }) => {

  const navigate = useNavigate();

  // 정렬 상태값 저장
  const [sort, setSort] = useState('review_no');

  // 검색 키워드
  const [keyword, setKeyword] = useState('');

  /** 정렬 클릭 */
  const onSortClick = useCallback(e => {
    e.preventDefault();

    setSort(e.target.dataset.sort);

    navigate(`/review?query=${keyword}&sort=${e.target.dataset.sort}`);
  }, [keyword, navigate]);

  return (
    <ReviewPageContainer>
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'고객님들의 후기를 공유해 보세요!'}
      />

      <div className="review-nav">
        <div className='review-sort'>
          <span
            className={sort === 'review_no' ? 'active' : ''}
            data-sort={'review_no'}
            onClick={onSortClick}>최신순
          </span>
          <span
            className={sort === 'like_count' ? 'active' : ''}
            data-sort={'like_count'}
            onClick={onSortClick}>인기순
          </span>
          <span
            className={sort === 'comment_count' ? 'active' : ''}
            data-sort={'comment_count'}
            onClick={onSortClick}>댓글순
          </span>
          <span
            className={sort === 'view_count' ? 'active' : ''}
            data-sort={'view_count'}
            onClick={onSortClick}>조회순
          </span>
        </div>

        <div className='review-search-wrap'>
          <Search listSort={sort} setKeyword={setKeyword} />

          {isLogin ? (
            <Link to={'/review/review_write'}>
              <button className="write-btn">
                <BiPencil className="icon" />새 글 쓰기
              </button>
            </Link>
          ) : (
            <button className="write-btn-disabled" disabled>
              <BiPencil className="icon" />
            </button>
          )}
        </div>
      </div>
      
      <ReviewList memberData={memberData} listSort={sort} />

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
  
      .write-btn {
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

      .write-btn-disabled {
        background-color: #fff;
        padding: 5px 20px;
        border: 1px solid #bcbcbc;
        border-radius: 5px;
        color: #bcbcbc;
        font-size: 1.1rem;
        margin-left: 20px;

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
