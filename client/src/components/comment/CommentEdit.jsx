/**
 * 댓글 수정 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../config/axios';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Spinner from '../Spinner';

import RegexHelper from '../../libs/RegexHelper';

// FaUserCircle 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';

/** 
 * @description 댓글 수정 
 * @param setEditState 모달 상태값, 수정 취소 또는 댓글 수정 버튼 클릭 시 false 값을 부모 컴포넌트에 보낸다 / commentList.jsx
 * @param comment 댓글 기본 값 /commentList.jsx
 * @param commentNo 부모 컴포넌트로 부터 받은 댓글 번호 / commentList.jsx
 * @param setCommentList 댓글 수정값을 부모 컴포넌트로 보낸다. / commentList.jsx
 * @param reviewNo 댓글을 조회하기 위한 페이지 번호 / commentList.jsx
 */
const CommentEdit = memo(({ setEditState, comment, commentNo, setCommentList, reviewNo }) => {

  // 사용자 정보
  const { memberData, isLogin } = useSelector(state => state.user);

  // 수정할 댓글 내용
  const [editComment, setEditComment] = useState({
    comment_no: commentNo,
    comment: comment,
    review_no: reviewNo,
  });
  console.log('수정댓글 >>>', editComment);

  // 로딩 상태
  const [isloading, setIsloading] = useState(false);

  /** 수정된 댓글 submit */
  const onEditCommentSubmit = useCallback(e => {
    e.preventDefault();

    const current = e.target;

    try {
      setIsloading(true);

      RegexHelper.value(current.comment, '댓글을 입력해주세요');

      (async () => {
        try {
          const response = await axios.put('/api/comment/putComment', editComment);

          // 댓글 수정 창 닫기
          setEditState(false);
          // 부모 컴포넌트에게 수정된 댓글 리스트 전달
          setCommentList(response.data.item);

        } catch(err) {
          console.log(err);
        }
      })();

    } catch(err) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.message,
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        // focus가 풀리는 문제를 setTimeout으로 해결
        setTimeout(() => {
          err.field.focus();
          err.field.style.boxShadow = '0 0 5px #ff0000';
        }, 300);
      });
    } finally {
      setIsloading(false);
    }
  }, [editComment, setCommentList, setEditState]);

  /** 수정된 댓글 입력 */
  const onEditCommentChange = useCallback(e => {
    setEditComment({ ...editComment, comment: e.target.value });
  }, [editComment]);

  /** 수정 취소 */
  const onEditCancel = useCallback(e => {
    setEditState(false);
  }, [setEditState]);

  return (
    <>
      <Spinner visible={isloading} />
      <CommentEditContainer>
        <form className="comment-wrap" onSubmit={onEditCommentSubmit}>
          <div className="comment-input">
            {memberData.profile_img ? (
              <img src={memberData.profile_img} alt={`${memberData.user_name} 프로필 이미지`} className='profile-img' />
            ) : (
              <FaUserCircle className='icon' />
            )}
            <textarea
              type="text"
              name="comment"
              placeholder="댓글을 입력해주세요"
              defaultValue={comment}
              onChange={onEditCommentChange}
            />
          </div>
          <div className="comment-btn">
            <button className='btn comment-btn-cancel' type='button' onClick={onEditCancel}>
              취소
            </button>
            <button className="btn comment-btn-submit" type="submit">
              댓글수정
            </button>
          </div>
        </form>
      </CommentEditContainer>
    </>
  );
});

export default CommentEdit;

/** 댓글 수정 컴포넌트 스타일 */
const CommentEditContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 40px 0;
  padding: 30px;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  
  .comment-wrap {
    display: flex;
    flex-direction: column;
    
    .comment-input {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .profile-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      
      .icon {
        font-size: 50px;
        color: #bcbcbc;
        margin-right: 20px;
      }
      
      textarea {
        width: 92%;
        min-height: 100px;
        border-radius: 10px;
        border: 1px solid #bcbcbc;
        padding: 10px;
        color: #404040;
        background-color: #fff;

        &::-webkit-input-placeholder { color: #bcbcbc; }
        &:focus { box-shadow: 0 0 5px #2a376888; }
      }
    }

    .comment-btn {
      text-align: end;

      .btn {
        background-color: #fff;
        border-radius: 10px;
        padding: 5px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: .2s ease;
        color: #404040;
      }

      .comment-btn-cancel {
        border: 1px solid #bcbcbc;
        margin-right: 10px;
      }

      .comment-btn-submit {
        border: 1px solid #f3b017;
        color: #f3b017;

        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
      }
    }
  }
`;