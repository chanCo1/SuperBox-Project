/**
 * 후기 더보기 버튼
 */

/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import useOnClickOutSide from '../../hooks/useOnClickOutSide';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// 리덕스 참조
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import { MoreBtnContainer } from '../../styles/MoreBtnStyle';

// 아이콘 참조
import { MdMoreVert } from 'react-icons/md';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

/** 
 * @description 후기글 더보기 버튼
 * @param reviewNo 머물러 있는 후기 페이지 번호 / ReviewDetail.jsx
 * @param commentCount 머물러 있는 후기 페이지의 댓글 수 / ReviewDetail.jsx
 */
const ReviewMoreBtn = memo(({ reviewNo, commentCount }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 더보기 버튼 상태값
  const [button, setButton] = useState(false);
  
  // 모달 밖 클릭 시 창 사라지게한다
  const toggle = useRef();
  useOnClickOutSide(toggle, () => setButton(false));

  /** 더보기 버튼 on */
  const onBtnClick = useCallback(() => {
    setButton(true);
  }, []);

  /** 삭제버튼 클릭 */
  const onDeleteClick = useCallback(e => {
    e.preventDefault();

    commentCount > 0 ? (
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: '댓글이 있는 글은 삭제할 수 없어요',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      })
    ) : (
      Swal.fire({
        icon: 'question',
        iconColor: '#f3b017',
        text: '후기를 삭제할까요?',
        showCancelButton: true,
        confirmButtonText: '네!',
        confirmButtonColor: '#f3b017',
        cancelButtonText: '아니요',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteReview(reviewNo));

          setTimeout(() => navigate('/review'), 500);
        }
      })
    );
  
  }, [dispatch, reviewNo, navigate, commentCount]);

  return (
    <MoreBtnContainer>
      <MdMoreVert className="more-btn" onClick={onBtnClick} />

      {button && 
        <div className='more-btn-active' ref={toggle}>
          <Link to={`/review/edit/${reviewNo}`}>
            <span className='more-btn-menu more-btn-edit'>
              <HiOutlinePencilAlt className='icon' />수정하기
            </span>
          </Link>
          <span className='more-btn-menu more-btn-trash' onClick={onDeleteClick}>
            <HiOutlineTrash className='icon' />삭제하기
          </span>
        </div>
      }
    </MoreBtnContainer>
  );
});

export default ReviewMoreBtn;