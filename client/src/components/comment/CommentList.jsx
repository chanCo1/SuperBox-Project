/**
 * 댓글 리스트 호출 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import axios from '../../config/axios';
import styled from 'styled-components';

// 컴포넌트 참조
import Like from '../Like';
import ReviewMoreBtn from '../review/ReviewMoreBtn';

import { setTime, nameMasking } from '../../utils/Utils';

// FaUserCircle 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';


/**
 * 댓글 호출
 */
const CommentList = memo(({ getComment, reviewNo }) => {
  
  const [commentList, setCommentList] = useState([]);
  console.log('화면에 뿌릴 댓글 >>>',commentList);

  // 페이지 마운트 시 댓글 불러오기
  useEffect(() => {
    // 댓글을 달면 부모 컴포넌트에서 받은 댓글로 바꾼다
    setCommentList(getComment);

    (async () => {
      try {
        const response = await axios.get('/api/comment/getComment', {
          params: {
            review_no: reviewNo,
          }
        });
        setCommentList(response.data.item);
      } catch(err) {
        console.log(err);
      }
    })();
  }, [getComment, reviewNo]);

  return (
    <>
      {commentList ? (
        commentList.map((v,i) => (
          <CommentListContainer key={v.comment_no}>
            <div className='comment-wrap'>
              <div className='comment-user-wrap'>
                <div className='user-info-wrap'>
                  <FaUserCircle className='user-icon' />
                  <div className='user-info'>
                    <p className='comment-name'>
                      {v.name && nameMasking(v.name)}
                    </p>
                    <p className='comment-date'>
                      {v.regdate && setTime(v.regdate, v.update_regdate)}
                    </p>
                  </div>
                </div>
                <ReviewMoreBtn reviewNo={v.review_no} /> 
              </div>
              <p className='comment-content'>{v.comment}</p>
            </div>
          </CommentListContainer>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          아직 댓글이 없습니다!
        </div>
      )}
    </>
  );
});

export default CommentList;

const CommentListContainer = styled.div`
  position: relative;
  margin: 30px 0;
  border-bottom: 1px solid #bcbcbc;

  .comment-wrap {
    
    .comment-user-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user-info-wrap {
        display: flex;

        .user-icon {
          font-size: 2.5rem;
          color: #bcbcbc;
          margin-right: 10px;
        }
  
        .user-info {
          .comment-date {
            font-size: .8rem;
            color: #bcbcbc;
          }
        }
      }
    }

    .comment-content {
      font-size: 1rem;
      padding: 20px 0 30px;
      /* 새로 알게된 부분 pre-wrap */
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
`;