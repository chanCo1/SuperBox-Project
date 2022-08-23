/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 리덕스 참조
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../slices/ReviewSlice';

// 아이콘 참조
import { MdMoreVert } from 'react-icons/md';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

const MoreBtn = memo(({ reviewNo }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = useRef();

  // 더보기 버튼 상태값
  const [button, setButton] = useState(false);
  console.log(button);

  /** 더보기 버튼 on/off */
  const onBtnClick = useCallback((e) => {
    e.preventDefault();

    setButton(!button);
  }, [button]);

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

  // /** 모달 영역 밖 클릭시 닫기 */
  // const onCloseModal = useCallback(e => {
  //   if(button || (!toggle.current || !toggle.contains(e.target))) setButton(false);
  // }, [button]);

  // useEffect(() => {
  //   window.addEventListener('click', onCloseModal);

  //   return () => {
  //     window.removeEventListener('click', onCloseModal);
  //   }
  // }, []);

  return (
    <MoreBtnContainer>
      <MdMoreVert className="more-btn" onClick={onBtnClick} />

      {button && 
        <div className='more-btn-active' ref={toggle}>
          <span className='more-btn-menu more-btn-edit'>
            <HiOutlinePencilAlt className='icon' />수정하기
          </span>
          <span className='more-btn-menu more-btn-trash' onClick={onDeleteClick}>
            <HiOutlineTrash className='icon' />삭제하기
          </span>
        </div>
      }
    </MoreBtnContainer>
  );
});

export default MoreBtn;

const MoreBtnContainer = styled.div`
  position: relative;
  z-index: 9;

  .more-btn {
    font-size: 25px;
    cursor: pointer;
    transition: .2s ease;

    &:active { transform: scale(.8, .8); }
  }

  .more-btn-active {
    position: absolute;
    display: flex;
    width: 110px;
    flex-direction: column;
    top: 10%;
    right: 100%;
    padding: 15px;
    border: 1px solid #f3b017;
    border-radius: 10px;
    color: #999;
    
    .more-btn-menu {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: .2s ease;

      .icon { margin-right: 2px; }
      &:hover { color: #404040; }
    }

    .more-btn-edit { margin-bottom: 5px; }
  }
`;
