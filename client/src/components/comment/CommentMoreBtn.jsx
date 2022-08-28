/**
 * 댓글 더보기 버튼
 */

/** 패키지 참조 */
import React, { memo, useState, useRef, useCallback } from 'react';
import useOnClickOutSide from '../../hooks/useOnClickOutSide';
import Swal from 'sweetalert2';
import axios from '../../config/axios';

// 컴포넌트 참조
import { MoreBtnContainer } from '../../styles/MoreBtnStyle';

// 아이콘 참조
import { MdMoreVert } from 'react-icons/md';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

/**
 * @description 댓글 더보기 버튼
 * @param setEditState 댓글 수정 true값을 부모 컴포넌트로 보낸다 / commentList.jsx
 * @param setEditCommentNo 수정할 댓글 번호를 부모 컴포넌트로 보낸다 / commentList.jsx
 * @param commentNo 부모 컴포넌트로 부터 받은 댓글 번호 / commentList.jsx
 * @param reviewNo 부모 컴포넌트로 부터 받은 게시물 번호 / commentList.jsx
 * @param setCommentList 댓글 삭제 후 리스트를 부모 컴포넌트로 보낸다. / commentList.jsx
 */
const CommentMoreBtn = memo(({ setEditState, setEditCommentNo, commentNo, reviewNo, setCommentList }) => {

  // 더보기 버튼 상태값
  const [button, setButton] = useState(false);

  // 모달 밖 클릭 시 더보기 창 사라지게한다
  const toggle = useRef();
  useOnClickOutSide(toggle, () => setButton(false));

  /** 더보기 버튼 on */
  const onBtnClick = useCallback((e) => {
    setButton(true);
  }, []);

  /** 댓글 수정 클릭 */
  const onEditClick = useCallback((e) => {
    setEditState(true);
    setButton(false);
    setEditCommentNo(parseInt(e.target.dataset.no))
  }, [setEditState, setEditCommentNo]);

  /** 댓글 삭제 클릭 */
  const onDeleteClick = useCallback(e => {
    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '댓글을 삭제할까요?',
      showCancelButton: true,
      confirmButtonText: '네!',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const response = await axios.delete('/api/comment/deleteComment', {
              params: { 
                comment_no: commentNo,
                review_no: reviewNo,
              }
            });
            setCommentList(response.data.item);
          } catch(err) {
            console.log(err);
          }
        })();
      }
    })
  }, [commentNo, reviewNo, setCommentList]);

  return (
    <MoreBtnContainer>
      <MdMoreVert className="more-btn" onClick={onBtnClick} />

      {button && 
        <div className='more-btn-active' ref={toggle}>
          <span 
            className='more-btn-menu more-btn-edit' 
            data-no={commentNo}  // 수정할 댓글 번호
            onClick={onEditClick}
          >
            <HiOutlinePencilAlt className='icon' />수정하기
          </span>

          <span 
            className='more-btn-menu more-btn-trash'
            // data-no={commentNo} // 삭제할 댓글 번호
            onClick={onDeleteClick}
          >
            <HiOutlineTrash className='icon' />삭제하기
          </span>
        </div>
      }
    </MoreBtnContainer>
  );
});

export default CommentMoreBtn;