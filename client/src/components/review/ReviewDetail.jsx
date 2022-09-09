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
import ReviewMoreBtn from './ReviewMoreBtn';
import Meta from '../../Meta';
import Like from '../Like';
import CommentWrite from '../comment/CommentWrite';

import { setTime, nameMasking } from '../../utils/Utils';

// 1회용 아이콘 -> 나중에 수정
import { FaUserCircle, FaRegEye } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';

// toast-ui
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

/** 
 * @description 후기 상세보기 
 * @param memberData 로그인한 사용자 정보 /App.jsx
 * @param isLogin 로그인 상태 /App.jsx
 */
const ReviewDetail = memo(({ memberData, isLogin }) => {

  /** 파라미터 값을 가져오기 위한 params 함수 생성 */
  const params = useParams();

  /** 리덕스 값 가져오기 */
  const dispatch = useDispatch();

  // 백엔드로 부터 받은 데이터 상태값 관리
  const [reviewDetail, setReviewDetail] = useState()
  console.log(reviewDetail);

  // 글 작성한 유저 번호 저장
  const [userNo, setUserNo] = useState();
  
  // 글 작성 user_no 추출
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
            // userNo: memberData?.user_no,
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

  return (
    <>
      <Spinner visible={isLoading} />
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'고객님의 후기를 만나보세요!'}
      />
      <ReviewDetailContainer>
        {reviewDetail &&
          reviewDetail.map((v,i) => (
            <div className='review-detail-wrap' key={v.review_no}>
              <div className='review-detail-top'>
                <div className='review-detail-top-wrap'>
                  {v.profile_img && v.user_no ? (
                    <img src={v.profile_img} alt={`${v.name} 프로필 이미지`} className='profile-img' />
                  ) : (
                    <FaUserCircle className='user-icon' />
                  )}
                  <div className='review-detail-head'>
                    <p>{v.head}</p>
                    <p>
                      {v.name && v.user_no ? 
                        nameMasking(v.name) : (
                          <span className='withdrawal'>탈퇴한회원</span>
                        )
                      }
                    </p>
                  </div>
                </div>

                <div className='review-detail-info'>
                  <span><BiLike className='icon' />{v.like_count}</span>
                  <span><MdOutlineComment className='icon' />{v.comment_count}</span>
                  <span><FaRegEye className='icon' />{v.view_count}</span>
                </div>
              </div>

              <div className='review-detail-title-wrap'>
                <h2 className='review-detail-title'>{v.title}</h2>
                {memberData &&
                  isLogin &&
                  memberData.user_no === userNo &&
                  <ReviewMoreBtn reviewNo={v.review_no} commentCount={v.comment_count} /> 
                }
              </div>

              <p className='review-date'>
                {v.regdate && setTime(v.regdate, v.update_regdate)}
              </p>

              <Viewer initialValue={v.content} />
            </div>
          ))
        }
        <Like 
          reviewNo={params && params.review_no} 
          userNo={memberData && memberData.user_no}
        >
          괜찮은 후기인가요?
        </Like>

        <CommentWrite 
          memberData={memberData}
          isLogin={isLogin}
          reviewNo={params.review_no} 
        />

      </ReviewDetailContainer>
    </>
  );
});

export default ReviewDetail;

/** 후기 상세페이지 스타일 */
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

        .profile-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-icon {
          font-size: 3rem;
          margin-right: 10px;
          color: #bcbcbc;
        }

        .review-detail-head {
          & > p:nth-child(1) {
            display: inline-block;
            border: 1px solid #f3b017;
            padding: 1px 10px;
            margin-bottom: 5px;
            border-radius: 20px;
            color: #f3b017;
            font-size: 14px;
          }
          & > p:nth-child(2) {
            font-size: 1.2rem;
          }

          .withdrawal {
            color: #bcbcbc;
            font-size: 20px;
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