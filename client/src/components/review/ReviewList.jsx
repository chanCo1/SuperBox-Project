/** 패키지 참조 */
import React, { memo, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQueryString } from '../../hooks/useQueryString';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getReviewList } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import Spinner from '../Spinner';
import Pagination from '../Pagination';

import { setTime, nameMasking } from '../../utils/Utils';

// FaUserCircle 1회용 아이콘 -> 나중에 수정
import { FaUserCircle, FaRegEye } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';

/** 
 * @description 후기 List
 * @param listSort 정렬을 위한 문자열 ex)review_no / ReviewPage.jsx
 */
const ReviewList = memo(({ listSort }) => {

  // 리덕스
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.review);
  console.log('후기list >>>', data);

  /** 
   * pagination 
   */
  // 전체 리스트
  const [list, setList] = useState([]);
  console.log('list >>>', list)
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 보여질 리스트 수
  const [rows, setRows] = useState(10);

  // 첫번째 인덱스
  const lastIndex = currentPage * rows;
  // 마지막 인덱스
  const firstIndex = lastIndex - rows;
  // 현재 페이지에 보여질 배열
  const currentList = data?.item && list && list.slice(firstIndex, lastIndex);

  // 리덕스의 data 값이 바뀔 때 마다 list 상태값 변경
  useEffect(() => {
    setList(data && data.item)
  }, [data]);

   /** QueryString 문자열 얻기 */
  const { sort, query } = useQueryString({
    sort: listSort,
    query: '',
    // rows: 10,
    // page: 1,
  });

  // 게시판 들어가면 리스트 호출
  useEffect(() => {
    dispatch(getReviewList({
      query: query,
      // rows: rows,
      // page: page,
      sort: sort,
    }));
  }, [dispatch, sort, query]);

  return (
    <>
      <Spinner visible={loading} />
      
      {data?.item && list && list.length > 0 ? (
        currentList.map((v,i) => {
          return (
            <ReviewListContainer key={v.review_no}>
              <div className='review-list-head'>
                <div className='review-list-head-top'>
                  <p>#{v.review_no}</p>
                  <p>{v.head}</p>
                </div>
                <Link to={`/review/${v.review_no}`}>
                  <h2 className='review-title'>{v.title}</h2>
                </Link>
                <p className='review-date'>
                  {v.regdate && setTime(v.regdate, v.update_regdate)}
                </p>
              </div>
              <div className='review-list-tail'>
                <p><FaUserCircle className='user-icon' />
                  {/* {v.name && v.name.substr(0,1)}*{v.name && v.name.substring(2,4)} */}
                  {v.name && nameMasking(v.name)}
                </p>

                <div className='review-list-tail-info'>
                  <span><BiLike className='icon' />{v.like_count}</span>
                  <span><MdOutlineComment className='icon' />{v.comment_count}</span>
                  <span><FaRegEye className='icon' />{v.view_count}</span>
                </div>
              </div>
            </ReviewListContainer>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          아직 후기가 없습니다! 후기를 공유해주세요! 🙂
        </div>
      )}
      
      {/* pagination */}
      {data?.item && list &&
        <Pagination 
          rows={rows} 
          totalList={data && list.length} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </>
  );
});

export default ReviewList;

/** 스타일 */
const ReviewListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1100px;
  margin: 0 auto;
  color: #404040;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;

  .review-list-head {
    .review-list-head-top {
      display: flex;
      align-items: center;

      &>p:nth-child(1) {
        position: relative;
        margin-right: 10px;
        top: 1px;
      }
      &>p:nth-child(2) {
        border: 1px solid #f3b017;
        padding: 1px 10px;
        border-radius: 20px;
        color: #f3b017;
        font-size: .8rem;
      }
    }

    .review-title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 500;
      margin: 10px 0;
      height: 35px;
      transition: .2s ease;
      cursor: pointer;
  
      &:hover { color: #999; }
    }

    .review-date {
      display: flex;
      align-items: center;
      height: 21px;
      font-size: .9rem;
      color: #bcbcbc;
    }
  }

  .review-list-tail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;

    &>p:nth-child(1) {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 1.1rem;
      margin-bottom: 10px;
      
      .user-icon {
        position: relative;
        font-size: 2rem;
        margin-right: 10px;
        color: #bcbcbc;
      }
    }

    .review-list-tail-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        /* margin-right: 15px; */
        font-size: 1.1rem;

        /* &:last-child { margin-right: 5px; } */
        .icon { margin-right: 5px; }
      }
    }
  }
`;







{/* 원본!!!!!!
{data && data?.item.length > 0 ? (
  data.item.map((v,i) => {
    return (
      <ReviewListContainer key={v.review_no}>
        <div className='review-list-head'>
          <div className='review-list-head-top'>
            <p>#{v.review_no}</p>
            <p>{v.head}</p>
          </div>
          <Link to={`/review/${v.review_no}`}>
            <h2 className='review-title'>{v.title}</h2>
          </Link>
          <p className='review-date'>
            {v.regdate && setTime(v.regdate, v.update_regdate)}
          </p>
        </div>
        <div className='review-list-tail'>
          <p><FaUserCircle className='user-icon' />

            {v.name && nameMasking(v.name)}
          </p>

          <div className='review-list-tail-info'>
            <span><BiLike className='icon' />{v.like_count}</span>
            <span><MdOutlineComment className='icon' />{v.comment_count}</span>
            <span><FaRegEye className='icon' />{v.view_count}</span>
          </div>
        </div>
      </ReviewListContainer>
    );
  })
) : (
  <div style={{ textAlign: 'center', padding: '60px 0' }}>
    아직 후기가 없습니다! 후기를 공유해주세요! 🙂
  </div>
)}
*/}