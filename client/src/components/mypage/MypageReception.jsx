/** 패키지 참조 */
import React, { memo, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getReception, putReception } from '../../slices/ReceptionSlice';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import { setTime } from '../../utils/Utils';

import arrow_down from '../../assets/image/arrow_down.png';

/**
 * @description 내 배송접수 현황 확인
 */
const MypageReception = memo(() => {
  // 리덕스
  const dispatch = useDispatch();
  const { memberData, isLogin } = useSelector((state) => state.user);
  const { data, loading, error } = useSelector((state) => state.reception);

  /**
   * pagination
   */
  // 전체 리스트
  const [list, setList] = useState([]);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지에 보여질 리스트 수
  const [rows, setRows] = useState(10);

  // 첫번째 인덱스
  const lastIndex = currentPage * rows;
  // 마지막 인덱스
  const firstIndex = lastIndex - rows;
  // 현재 페이지에 보여질 배열
  const currentList = data?.item && list && list.slice(firstIndex, lastIndex);

  /** 토글에 사용할 리스트 상태값 */
  const [showItem, setShowItem] = useState({});

  /** map을 활용한 리스트에서 토글기능 구현 */
  const toggleItem = id => {
    setShowItem(prevShowItem => ({
      ...prevShowItem,
      [id]: !prevShowItem[id]
    }))
  };
 
  // 리덕스의 data 값이 바뀔 때 마다 list 상태값 변경
  useEffect(() => {
    setList(data && data?.item);
  }, [data]);

  // 페이지 들어가면 리스트 호출
  useEffect(() => {
    setTimeout(() => {
      dispatch(getReception({
        user_no: memberData?.user_no,
      }));
    }, 800);
  }, [dispatch, memberData,]);

  /** 접수 취소 버튼 */
  const onCancelClick = useCallback(e => {
    e.preventDefault();

    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '배송 접수를 취소할까요?',
      showCancelButton: true,
      confirmButtonText: '네!',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        // 수정할 타겟번호 전송
        dispatch(putReception({
          reception_no: parseInt(e.target.dataset.no)
        }));
        // 리스트 새로 호출
        setTimeout(() => {
          dispatch(getReception({
            user_no: memberData?.user_no,
          }));
        }, 500);
      }
    });
  }, [dispatch, memberData]);

  return (
    <>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle
        title={'접수현황'}
        subtitle={'진행중인 접수현황과 배송내역을 확인해보세요'}
      />

      <MypageReceptionContainer>
        <div className="title-wrap">
          <p>접수번호</p>
          <p>접수날짜</p>
          <p>배송날짜</p>
          <p>진행상황</p>
        </div>

        {data?.item && list && list.length > 0 ? (
          currentList.map((v, i) => (
            <div 
              key={v.reception_no} 
              className="content-wrap" 
              onClick={() => toggleItem(v.reception_no)}
            >
              <div 
                className={showItem[v.reception_no] ? 'cotent-list cotent-list-background' : 'cotent-list'}>
                <p>
                  # 1{v.reception_date.substring(0, 10).replaceAll('-', '')}-
                  {v.reception_no > 9 ? v.reception_no : `0${v.reception_no}`}
                </p>
                {/* <p>{new Date(v.reception_date).toLocaleString()}</p> */}
                <p>{setTime(v.reception_date, v.reception_date)}</p>
                <p>-</p>
                <p>{v.progress}</p>
                <img 
                  src={arrow_down}
                  alt="arrow_button"
                  className={showItem[v.reception_no] ? 'deg-arrow' : null}
                />
              </div>
              <div className={showItem[v.reception_no] ? 'show-item' : 'hide-item'}>
                {showItem[v.reception_no] ? (
                  <>
                    <div className='content-item-wrap'>
                      <div className='content-item'>
                        <h4>보내는 분 정보</h4>
                        <span>{v.send_name}</span>
                        <span className='gray-item'>{v.send_contact}</span>
                        <span className='gray-item'>{v.send_address1} {v.send_address2}</span>
                        <span className='gray-item'>{v.send_postcode}</span>
                      </div>
                      <div className='content-item'>
                        <h4>받는 분 정보</h4>
                        <span>{v.arrive_name}</span>
                        <span className='gray-item'>{v.arrive_contact}</span>
                        <span className='gray-item'>{v.arrive_address1} {v.arrive_address2}</span>
                        <span className='gray-item'>{v.arrive_postcode}</span>
                      </div>
                      <div className='content-item'>
                        <h4>상품 정보</h4>
                        <span>{v.product_name}</span>
                        <span>{v.product_size} / {v.product_qty}box</span>
                        <span>{v.payment}</span>
                      </div>

                      {v.progress === '취소' ? (
                        <button className='btn btn-disabled' disabled>취소됨</button>
                      ) : (
                        <button
                         className='btn btn-active' 
                         data-no={v.reception_no} 
                         onClick={onCancelClick}>접수취소
                        </button>
                      )}
                    </div>
                  </>
                    ) : null}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            배송접수 내역이 없어요 🤗
          </div>
        )}

        {/* pagination */}
        {data?.item && list && (
          <Pagination
            rows={rows}
            totalList={data && list.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </MypageReceptionContainer>
    </>
  );
});

export default MypageReception;

/** 마이페이지-접수현황 스타일 */
const MypageReceptionContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto 50px;
  color: #404040;

  p {
    width: 20%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:nth-child(4) { width: 35%; }
  }

  .title-wrap {
    position: sticky;
    display: flex;
    top: 90px;
    background-color: #2a3768;
    border-radius: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    padding: 20px;
    margin-bottom: 20px;
    z-index: 9;
  }

  .content-wrap {
    .cotent-list {
      display: flex;
      align-items: center;
      line-height: 1.5;
      padding: 20px;
      border-radius: 10px;
      cursor: pointer;
  
      &:hover { background-color: #f7f8fb; }
  
      img {
        width: 15px;
        height: 15px;
        opacity: 0.3;
        transition: 0.5s ease;
      }
      .deg-arrow { transform: rotate(180deg); }
    }

    .cotent-list-background { background-color: #f7f8fb; }

    .show-item {
      max-height: 100vh;
      transition: 1s ease;

      .content-item-wrap {
        display: flex;
        margin: 20px 0 50px;
        padding: 0 90px;
        justify-content: space-between;
        border-bottom: 1px solid #bcbcbc;

        .content-item {
          display: flex;
          flex-direction: column;
          width: 30%;
          margin-bottom: 20px;

          h4 {
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 500;
          }

          span { margin-bottom: 10px; }
          .gray-item { color: #999; }
          &:nth-child(3) { width: 20%; }
        }

        .btn {
          position: relative;
          padding: 10px;
          top: 60px;
          width: 10%;
          height: 10%;
          border-radius: 10px;
          color: #404040;
          
        }

        .btn-active {
          background-color: #fff;
          border: 1px solid #f3b017;
          cursor: pointer;

          &:hover {
            background-color: #f3b017;
            color: #fff;
          }
        }

        .btn-disabled {
          background-color: #fff;
          border: 1px solid #bcbcbc;
          color: #999;
        }
      }
    }
    
    .hide-item {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    }
  }
`;
