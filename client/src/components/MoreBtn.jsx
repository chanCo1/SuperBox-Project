/** 패키지 참조 */
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { MdMoreVert } from 'react-icons/md';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';

const MoreBtn = memo(() => {

  const dispatch = useDispatch();

  // 더보기 버튼 상태값
  const [button, setButton] = useState(false);

  // 더보기 버튼 on/off
  const onBtnClick = useCallback((e) => {
    e.preventDefault();

    setButton(!button);
  }, [button]);

  const onDeleteClick = useCallback(e => {
    e.preventDefault();
  
    dispatch();
    
  }, [dispatch]);

  return (
    <MoreBtnContainer>
      <MdMoreVert className="more-btn" onClick={onBtnClick} />

      {button && 
        <div className='more-btn-active'>
          <span className='more-btn-edit'>
            <HiOutlinePencilAlt className='icon' />수정하기
          </span>
          <span className='more-btn-trash' onClick={onDeleteClick}>
            <HiOutlineTrash className='icon' />삭제하기
          </span>
        </div>
      }
    </MoreBtnContainer>
  );
});

export default MoreBtn;

const MoreBtnContainer = styled.div`
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
    flex-direction: column;
    right: 12%;
    padding: 15px;
    border: 1px solid #f3b017;
    border-radius: 10px;
    color: #999;
    
    .more-btn-edit,
    .more-btn-trash {
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
