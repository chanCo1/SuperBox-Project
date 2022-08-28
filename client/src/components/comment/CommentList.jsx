/**
 * 댓글 리스트 호출 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import axios from '../../config/axios';
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// 컴포넌트 참조
import Like from '../Like';
import CommentMoreBtn from './CommentMoreBtn';
import CommentEdit from './CommentEdit';

import { setTime, nameMasking } from '../../utils/Utils';

// FaUserCircle 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';


/**
 * @description 댓글 호출
 * @param getComment 댓글 작성하고 받은 댓글 리스트 / commentWrite.jsx
 * @param getComment 현재 머물러 있는 후기글 번호 / commentWrite.jsx
 */
const CommentList = memo(({ getComment, reviewNo }) => {
  
  /** 리덕스 값 가져오기 -> 사용자 정보 */
  const { memberData, isLogin } = useSelector(state => state.user);
  
  // 화면에 보여줄 댓글 리스트 상태값
  const [commentList, setCommentList] = useState([]);

  // 댓글 수정 on/off
  const [editState, setEditState] = useState(false);

  // 수정할 댓글 번호
  const [editCommentNo, setEditCommentNo] = useState(-1);

  // 페이지 마운트 시 댓글 불러오기
  useEffect(() => {
    // 댓글을 달면 부모 컴포넌트에서 받은 댓글로 바꾼다
    setCommentList(getComment);

    (async () => {
      try {
        const response = await axios.get('/api/comment/getComment', {
          params: { review_no: reviewNo }
        });
        setCommentList(response.data.item);
      } catch(err) {
        console.log(err);
      }
    })();
  }, [getComment, reviewNo]);

  return (
    <>
      {commentList && commentList.length > 0 ? (
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

                {isLogin && memberData.user_no === v.user_no &&
                  <CommentMoreBtn 
                    setEditState={setEditState} 
                    setEditCommentNo={setEditCommentNo}
                    commentNo={v.comment_no}
                  /> 
                }
              </div>
              
              {/* 로그인 되어 있고, 수정할 댓글 번호가 같고, 수정상태가 true라면 */}
              {isLogin && editCommentNo === v.comment_no && editState ? (
                <CommentEdit 
                  setEditState={setEditState}
                  comment={v.comment}
                  commentNo={v.comment_no}
                  setCommentList={setCommentList}
                  reviewNo={reviewNo}
                />
              ) : (
                // 그렇지 않으면 원래 댓글
                <p className='comment-content'>{v.comment}</p>
              )}
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
      /* 새로 알게된 부분 pre-wrap -> 텍스트 입력을 그대로 보여줌 */
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
`;