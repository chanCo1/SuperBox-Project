/** 패키지 참조 */
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getReview } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import Spinner from '../Spinner';

// toast-ui
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

// 1회용 아이콘 -> 나중에 수정
import { FaUserCircle, FaRegEye } from 'react-icons/fa';

/** Review List */
const ReviewList = memo(() => {

  /** 페이지 강제 이동을처리하기 위한 naviagte함수 생성 */
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.review);
  console.log(data);

  // 게시판 들어가면 리스트 호출
  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  return (
    <>
      <Spinner visible={loading} />
      {data?.item && data.item.map((v,i) => {
        return (
          <ReviewListContainer key={i}>
            <div className='review-list-head'>
              <div className='review-list-head-top'>
                <p>#{v.review_no}</p>
                <p>{v.head}</p>
              </div>
              <h2 className='review-title'>{v.title}</h2>
              <p className='review-date'>{v.regdate && new Date(v.regdate).toLocaleString()}</p>
            </div>
            <div className='review-list-tail'>
              <p><FaUserCircle className='user-icon' />{v.name && v.name.substring(0,1)}****</p>
              <p><FaRegEye className='icon' />{v.view_count}</p>
            </div>
          </ReviewListContainer>
        );
      })}
    </>
  );
});

export default ReviewList;

/** 스타일 */
const ReviewListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  /* border-radius: 15px; */
  color: #404040;
  cursor: pointer;
  padding: 20px;
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
      font-size: 1.5rem;
      font-weight: 500;
      margin: 10px 0;
    }

    .review-date {
      font-size: .9rem;
      color: #bcbcbc;
    }
  }

  .review-list-tail {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &>p:nth-child(1) {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 1.1rem;
      margin-bottom: 10px;
      margin-right: 10px;
      
      .user-icon {
        position: relative;
        font-size: 2rem;
        margin-right: 10px;
        color: #bcbcbc;
      }
    }
    &>p:nth-child(2) {
      display: flex;
      align-items: center;
      
      .icon {
        margin-right: 5px;
      }
    }
  }

  &:hover {
    background-color: #f7f8fb;
  }
`;