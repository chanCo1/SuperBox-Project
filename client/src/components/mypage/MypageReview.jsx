/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getUserReview } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import Pagination from '../Pagination';

import { setTime } from '../../utils/Utils';

/**
 * @description 내가 쓴 후기 보기
 */
const MypageReview = memo(() => {

  // 리덕스
  const dispatch = useDispatch();
  const { memberData, isLogin } = useSelector((state) => state.user);
  const { data, loading, error } = useSelector((state) => state.review);
  console.log(data);

  /**
   * pagination
   */
  // 전체 리스트
  const [list, setList] = useState([]);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 보여질 리스트 수
  const [rows, setRows] = useState(20);

  // 첫번째 인덱스
  const lastIndex = currentPage * rows;
  // 마지막 인덱스
  const firstIndex = lastIndex - rows;
  // 현재 페이지에 보여질 배열
  const currentList = data?.item && list && list.slice(firstIndex, lastIndex);

  // 리덕스의 data 값이 바뀔 때 마다 list 상태값 변경
  useEffect(() => {
    setList(data && data?.item);
  }, [data]);

  // 페이지 들어가면 리스트 호출
  useEffect(() => {
    dispatch(getUserReview({
      user_no: memberData?.user_no,
    }));
  }, [dispatch, memberData]);

  return (
    <>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'내 후기'} subtitle={'내가 쓴 사용 후기를 확인해보세요'} />
      
      <MypageReviewContainer>
        <div className="title-wrap">
          <p>글 번호</p>
          <p>제목</p>
          <p>작성일</p>
        </div>

        {data?.item && list && list.length > 0 ? (
          currentList.map((v, i) => (
            <Link key={v.review_no} to={`/review/${v.review_no}`} className="content-wrap">
              <p># {v.review_no}</p>
              <div className='content-title'>
                <p className='head'>{v.head}</p>
                <p className='title'>{v.title}</p>
              </div>
              <p>{setTime(v.regdate, v.update_regdate)}</p>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            남긴 후기가 없어요 🤗
          </div>
        )}

        {/* pagination */}
        {data?.item && list && (
          <Pagination
            rows={rows}
            totalList={data && list.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </MypageReviewContainer>

    </>
  );
});

export default MypageReview;

const MypageReviewContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto 50px;
  color: #404040;

  p {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:nth-child(1) { width: 15%; }
    &:nth-child(2) { width: 60%; }
    &:nth-child(3) { width: 25%; }
  }

  .title-wrap {
    position: sticky;
    display: flex;
    top: 90px;
    color: #fff;
    background-color: #2a3768;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 400;
    padding: 20px;
    margin-bottom: 20px;
    z-index: 9;
  }

  .content-wrap {
    display: flex;
    padding: 20px;
    line-height: 1.5;
    border-radius: 20px;
    cursor: pointer;

    &:hover { background-color: #f7f8fb; }

    .content-title {
      display: flex;
      justify-content: center;
      width: 60%;

      .head {
        border-radius: 10px;
        border: 1px solid #f3b017;
        color: #f3b017;
        font-size: 14px;
        margin-right: 20px;
      }

      .title { 
        width: 70%; 
        text-align: start;
      }
    }
  }
`;