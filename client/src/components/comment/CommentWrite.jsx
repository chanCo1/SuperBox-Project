/**
 * 댓글 쓰기 컴포넌트
 */

/** 패키지 참조 */
import React, { memo, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import { useSelector } from 'react-redux'

// 컴포넌트 참조
import CommentList from './CommentList';

import RegexHelper from '../../libs/RegexHelper';

// FaUserCircle 1회용 아이콘 -> 나중에 수정
import { FaUserCircle } from 'react-icons/fa';

/**
 * 댓글 쓰기
 */
const CommentWrite = memo(({ reviewNo }) => {

  // 사용자 정보
  const { memberData, isLogin } = useSelector(state => state.user);

  // 댓글 입력 상태값
  const [comment, setComment] = useState({});

  // 불러온 댓글
  const [getComment, setGetComment] = useState([]);
  console.log('리스트로 보낼 댓글 >>>', getComment);

  useEffect(() => {
    memberData && setTimeout(() => {
      setComment({
        name: isLogin ? memberData?.user_name : '',
        comment: '',
        user_no: isLogin ? memberData?.user_no : null,
        review_no: reviewNo
      })
    });
  }, [memberData, isLogin, reviewNo]);

  /** 댓글 입력값 가져오기 */
  const onChange = useCallback((e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setComment({ ...comment, [name]: value });
  }, [comment]);

  /** 댓글 submit */
  const onSubmit = useCallback(e => {
    e.preventDefault();

    const current = e.target;

    try {
      RegexHelper.value(current.comment, '댓글을 입력해주세요');
      
      (async () => {
        try {
          const response = await axios.post('api/comment/postComment', comment);
          setComment({ ...comment, comment: '' });
          setGetComment([ ...response.data.item]);
        } catch(err) {
          console.log(err);
        }
      })();

    } catch(err) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.message,
        confirmButtonColor: '#f3b017',
      }).then(() => {
        setTimeout(() => {
          err.field.focus();
          err.field.style.boxShadow = '0 0 5px #ff0000';
        }, 300);
      });
    }
  }, [comment]);

  return (
    <>
      <CommentWriteContainer>
        {isLogin ? (
          <form className='comment-wrap' onSubmit={onSubmit}>
            <div className='comment-input'>
              <FaUserCircle className='icon' />
              <textarea 
                type="text" 
                name="comment" 
                placeholder="댓글을 입력해주세요"
                value={comment.comment}
                onChange={onChange}
              />
            </div>
            <div className='comment-btn'>
              <button className='comment-btn-active' type='submit'>댓글쓰기</button>
            </div>
          </form>
        ) : (
          <div className='comment-wrap'>
            <div className='comment-input'>
              <FaUserCircle className='icon' />
              <textarea
                type="text" 
                placeholder="로그인 하시면 댓글을 쓸 수 있어요!"
                disabled
              />
            </div>
            <div className='comment-btn'>
              <button className='comment-btn-disabled' type='submit' disabled>댓글쓰기</button>
            </div>
          </div>
        )}
        
      </CommentWriteContainer>

      <CommentList getComment={getComment} reviewNo={reviewNo} />
    </>
  );
});

export default CommentWrite;

const CommentWriteContainer = styled.div`
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
      
      .icon {
        font-size: 3rem;
        color: #bcbcbc;
        margin-right: 20px;
      }
      
      textarea {
        width: 100%;
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

      .comment-btn-active {
        border: 1px solid #f3b017;
        background-color: #fff;
        color: #f3b017;
        border-radius: 10px;
        padding: 5px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: .2s ease;

        &:hover {
          background-color: #f3b017;
          color: #fff;
        }
      }

      .comment-btn-disabled {
        border: 1px solid #bcbcbc;
        background-color: #fff;
        color: #bcbcbc;
        padding: 5px 20px;
        font-size: 1rem;
        border-radius: 10px;
      }
    }
  }
`;
