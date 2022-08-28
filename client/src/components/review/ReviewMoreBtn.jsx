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
 * 후기 더보기 버튼
 */
const ReviewMoreBtn = memo(({ reviewNo }) => {

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

    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '정말 삭제할까요?',
      showCancelButton: true,
      confirmButtonText: '네!',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(reviewNo));
        navigate('/review');
      }
    });
  
  }, [dispatch, reviewNo, navigate]);

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