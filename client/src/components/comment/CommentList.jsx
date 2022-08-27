/**
 * 댓글 리스트 호출 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import axios from '../../config/axios';
import styled from 'styled-components';

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
          <div key={v.comment_no}>

            <div>{v.name}</div>
            <div>{v.comment}</div>
            <div>{v.regdate}</div>

          </div>
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