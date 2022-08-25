/**
 * 후기 상세 보기 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
// import { getReview } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import Spinner from '../Spinner';
import PageTitle from '../PageTitle';
import MoreBtn from '../MoreBtn';
import Meta from '../../Meta';
import Like from '../Like';

// 1회용 아이콘 -> 나중에 수정
import { FaUserCircle, FaRegEye } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';

// toast-ui
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const ReviewDetail = memo(() => {

  /** 페이지 강제 이동을처리하기 위한 naviagte함수 생성 */
  const navigate = useNavigate();

  /** 파라미터 값을 가져오기 위한 params 함수 생성 */
  const params = useParams();

  const dispatch = useDispatch();
  const { memberData, isLogin } = useSelector(state => state.user);

  // 백엔드로 부터 받은 데이터 상태값 관리
  const [reviewDetail, setReviewDetail] = useState()

  // 글 작성 user_no 추출
  const [userNo, setUserNo] = useState();

  useEffect(() => {
    for(const i in reviewDetail) {
      setUserNo(reviewDetail[i].user_no);
    }
  }, [reviewDetail]);

  // 로딩상태
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 즉시 실행 함수 사용
    (async () => {
      try {
        setIsLoading(true);

        // 해당 후기글 번호로 비동기 통신
        const response = await axios.get('/api/review/detail', {
          params: {
            reviewNo: params.review_no,
          }
        });

        // state 저장
        setReviewDetail(response?.data?.item);

      } catch(err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();

  }, [params]);

  /** 후기 수정 시간 업데이트 */
  const setTime = (a, b) => {
    if(a !== b) {
      return new Date(b).toLocaleString() + ' 수정됨';
    } else {
      return new Date(a).toLocaleString();
    }
  };

  return (
    <>
      <Spinner visible={isLoading} />
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'고객님들의 후기를 만나보세요!'}
      />
      <ReviewDetailContainer>
        {reviewDetail &&
          reviewDetail.map((v,i) => (
            <div className='review-detail-wrap' key={v.review_no}>
              <div className='review-detail-top'>
                <div className='review-detail-top-wrap'>
                  <FaUserCircle className='user-icon' />
                  <div className='review-detail-head'>
                    <p>{v.head}</p>
                    <p>{v.name && v.name.substring(0,1)}****</p>
                  </div>
                </div>
                {/* <span><FaRegEye className='icon' />{v.view_count}</span> */}
                <div className='review-detail-info'>
                  <span><BiLike className='icon' />{v.like_count}</span>
                  <span><MdOutlineComment className='icon' />{v.comment_count}</span>
                  <span><FaRegEye className='icon' />{v.view_count}</span>
                </div>
                
              </div>

              <div className='review-detail-title-wrap'>
                <h2 className='review-detail-title'>{v.title}</h2>
                {memberData && isLogin && memberData.user_no === userNo && 
                  <MoreBtn reviewNo={v.review_no} /> 
                }
              </div>

              <p className='review-date'>
                {v.regdate && setTime(v.regdate, v.update_regdate)}
              </p>

              <Viewer initialValue={v.content} />

            </div>
          ))
        }
        <Like reviewNo={params && params.review_no} userNo={memberData && memberData.user_no} />

      </ReviewDetailContainer>
    </>
  );
});

export default ReviewDetail;

/** 스타일 */
const ReviewDetailContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-bottom: 50px;
  color: #404040;

  
  .review-detail-wrap {
    /* padding-bottom: 50px; */
    /* border-bottom: 1px solid #bcbcbc; */
    
    img { width: 30%; }
    p { font-size: 16px; }

    .review-detail-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      .review-detail-top-wrap {
        display: flex;
        align-items: center;

        .user-icon {
          font-size: 3rem;
          margin-right: 10px;
          color: #bcbcbc;
        }

        .review-detail-head {
          & > p:nth-child(1) {
            border: 1px solid #f3b017;
            padding: 1px 10px;
            margin-bottom: 5px;
            border-radius: 20px;
            color: #f3b017;
            font-size: .8rem;
          }
          & > p:nth-child(2) {
            font-size: 1.2rem;
          }
        }
      }

      .review-detail-info {
        display: flex;
        align-items: center;

        span {
          display: flex;
          align-items: center;
          margin-right: 15px;
          font-size: 1.1rem;

          &:last-child { margin-right: 5px; }
          .icon { margin-right: 5px; }
        }
      }
    }

    .review-detail-title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .review-detail-title {
        font-size: 2rem;
        font-weight: 500;
      }
    }

    .review-date {
      font-size: .9rem;
      color: #bcbcbc;
      margin: 10px 0 50px;
    }
  }
`;