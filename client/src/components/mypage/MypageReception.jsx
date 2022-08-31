/** 패키지 참조 */
import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getReception } from '../../slices/ReceptionSlice';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import Pagination from '../Pagination';

import { setTime } from '../../utils/Utils';
import { ReverseSlideUpDown2 } from '../../utils/Event';

import arrow_down from '../../assets/image/arrow_down.png';

/**
 * @description 내 배송접수 확인
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
  const [rows, setRows] = useState(5);

  // 첫번째 인덱스
  const lastIndex = currentPage * rows;
  // 마지막 인덱스
  const firstIndex = lastIndex - rows;
  // 현재 페이지에 보여질 배열
  const currentList = data?.item && list && list.slice(firstIndex, lastIndex);

  /** 보여질 리스트 상태값 */
  const [showItem, setShowItem] = useState({});
  console.log(showItem);

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

  // 게시판 들어가면 리스트 호출
  useEffect(() => {
    dispatch(
      getReception({
        user_no: memberData?.user_no,
      })
    );
  }, [dispatch, memberData]);

  return (
    <>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle
        title={'마이페이지'}
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
            <div key={v.reception_no} className="content-wrap" onClick={() => toggleItem(v.reception_no)}>
              <div className='cotent-list'>
                <p>
                  # 1{v.reception_date.substring(0, 10).replaceAll('-', '')}-
                  {v.reception_no > 9 ? v.reception_no : `0${v.reception_no}`}
                </p>
                <p>{new Date(v.reception_date).toLocaleString()}</p>
                <p>-</p>
                <p>{v.progress}</p>
                <img src={arrow_down} alt="arrow_button" className={showItem[v.reception_no] ? 'deg-arrow' : ''} />
              </div>
              <div className={showItem[v.reception_no] ? 'show-item' : 'hide-item'}>
                {showItem[v.reception_no] ? (
                  <>
                    <p>{v.send_name}</p>
                    <p>{v.send_address1}</p>
                    <p>{v.send_address2}</p>
                  </>
                    ) : null}
                {/* <p>{v.product_name}</p> */}

              </div>
            </div>
          ))
        ) : (
          <div>배송접수 내역이 없습니다</div>
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

const MypageReceptionContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto 50px;
  color: #404040;

  .title-wrap {
    display: flex;
    color: #999;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 30px;
  }

  .content-wrap {
    .cotent-list {
      display: flex;
      align-items: center;
      line-height: 1.5;
      padding: 20px 0;
      border-radius: 10px;
      cursor: pointer;
  
      &:hover {
        background-color: #f7f8fb;
      }
  
      img {
        width: 15px;
        height: 15px;
        opacity: 0.3;
        transition: 0.5s ease;

      }
      .deg-arrow { transform: rotate(180deg); }
    }

    .show-item {
      max-height: 100vh;
      transition: 1.5s ease;
    }
    
    .hide-item {
      opacity: 0;
      max-height: 0;
      overflow: hidden;
    }
  }

  p {
    width: 20%;
    text-align: center;

    &:nth-child(4) { width: 35%; }
  }
`;
