/** 패키지 참조 */
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getReview } from '../../slices/ReviewSlice';

// toast-ui
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';


const ReviewList = memo(() => {

  /** 페이지 강제 이동을처리하기 위한 naviagte함수 생성 */
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.review);
  console.log(data);

  // 앱이 실행될 때 마다 토큰 유효성 검사 실행
  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  return (
    <div>
      {data && data.item.map((v,i) => {
        return (
          <div key={v.review_no}>
            <p>{v.review_no}</p>
            <p>{v.head}</p>
            <p>{v.title}</p>
            <p>{v.name}</p>
            <p>{v.regdate}</p>
            <p>------------------------------------</p>
            {/* <Viewer initialValue={v.content} /> */}
          </div>
        );
      })}
    </div>
  );
});

export default ReviewList;