/**
 * 댓글 더보기 버튼
 */

/** 패키지 참조 */
import React, { memo, useState, useRef, useCallback } from 'react';
import useOnClickOutSide from '../../hooks/useOnClickOutSide';

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
 */
const CommentMoreBtn = memo(({ setEditState, setEditCommentNo, commentNo }) => {

  // 더보기 버튼 상태값
  const [button, setButton] = useState(false);

  // 모달 밖 클릭 시 더보기 창 사라지게한다
  const toggle = useRef();
  useOnClickOutSide(toggle, () => setButton(false));

  /** 더보기 버튼 on */
  const onBtnClick = useCallback((e) => {
    setButton(true);
  }, []);

  /** 댓글 수정 버튼 */
  const onEditClick = useCallback((e) => {
    setEditState(true);
    setButton(false);
    setEditCommentNo(parseInt(e.target.dataset.no))
  }, [setEditState, setEditCommentNo]);

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
            data-no={commentNo} // 삭제할 댓글 번호
          >
            <HiOutlineTrash className='icon' />삭제하기
          </span>
        </div>
      }
    </MoreBtnContainer>
  );
});

export default CommentMoreBtn;