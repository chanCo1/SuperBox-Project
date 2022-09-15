/** 패키지 참조 */
import React, { memo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { getUserInquiry, putCancelInquiry } from '../../slices/InquirySlice';

import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import Pagination from '../Pagination';

import arrow_down from '../../assets/image/arrow_down.png';

/**
 * @description 내가 남긴 1:1문의 보기
 */
const MypageInquiry = memo(() => {
  // 리덕스
  const dispatch = useDispatch();
  const { memberData, isLogin } = useSelector((state) => state.user);
  const { data, loading, error } = useSelector((state) => state.inquiry);

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

  // 리덕스의 data 값이 바뀔 때 마다 list 상태값 변경
  useEffect(() => {
    setList(data && data?.item);
  }, [data]);

  // 페이지 들어가면 리스트 호출
  useEffect(() => {
    dispatch(getUserInquiry({
      user_no: memberData?.user_no,
    }));
  }, [dispatch, memberData]);

  /** 토글에 사용할 리스트 상태값 */
  const [showItem, setShowItem] = useState({});

  /** map을 활용한 리스트에서 토글기능 구현 */
  const toggleItem = (id) => {
    setShowItem((prevShowItem) => ({
      ...prevShowItem,
      [id]: !prevShowItem[id],
    }));
  };

  /** 접수 취소 버튼 */
  const onCancelClick = useCallback(e => {
    e.preventDefault();

    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '1:1문의를 취소할까요?',
      showCancelButton: true,
      confirmButtonText: '네!',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        // 수정할 타겟번호 전송
        dispatch(putCancelInquiry({
          inquiry_no: parseInt(e.target.dataset.no)
        }));
        // 리스트 새로 호출
        setTimeout(() => {
          dispatch(getUserInquiry({user_no: memberData?.user_no,}))
        }, 500);
      }
    });
  }, [dispatch, memberData]);

  return (
    <>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle
        title={'내가 남긴 1:1 문의'}
        subtitle={'내가 남긴 1:1문의 내용을 확인해보세요'}
      />

      <MypageInquiryContainer>
        <div className="title-wrap">
          <p>분류</p>
          <p>제목</p>
          <p>작성일</p>
          <p>진행상태</p>
        </div>
        {data?.item && list && list.length > 0 ? (
          currentList.map((v, i) => (
            <div
              key={v.inquiry_no}
              className="content-wrap"
              onClick={() => toggleItem(v.inquiry_no)}
            >
              <div 
                className={showItem[v.inquiry_no] ? 'cotent-list cotent-list-background' : 'cotent-list'}>
                <p>{v.type}</p>
                <p>{v.title}</p>
                <p>{new Date(v.regdate).toLocaleString()}</p>
                <p>{v.progress}</p>
                <img
                  src={arrow_down}
                  alt="arrow_button"
                  className={showItem[v.inquiry_no] ? 'deg-arrow' : null}
                />
              </div>
              <div className={showItem[v.inquiry_no] ? 'show-item' : 'hide-item'}>
                {showItem[v.inquiry_no] ? (
                  <div className="content-item-wrap">
                    <div className='img-wrap'>
                      {v.img ? <img src={v.img} alt="1:1문의이미지" /> : null}
                    </div>
                    <div className='content-item'>
                      <textarea defaultValue={v.content} disabled />
                      {v.progress === '취소' ? (
                        <button className='btn btn-disabled' disabled>취소되었습니다</button>
                      ) : (
                        <button
                          className='btn btn-active' 
                          data-no={v.inquiry_no} 
                          onClick={onCancelClick}>문의취소
                        </button>
                      )}
                    </div>

                  </div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            1:1문의가 아직 없어요 🤗
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
      </MypageInquiryContainer>
    </>
  );
});

export default MypageInquiry;

/** 마이페이지-1:1문의 스타일 */
const MypageInquiryContainer = styled.div`
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

    &:nth-child(1) {
      width: 15%;
    }
    &:nth-child(2) {
      width: 40%;
    }
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
      border-radius: 20px;
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
        margin: 20px auto 50px;
        width: 900px;
        border-bottom: 1px solid #bcbcbc;
        text-align: center;

        .img-wrap {
          text-align: center;

          & > img {
            width: 500px;
            height: 400px;
            margin-bottom: 20px;
          }
        }

        .content-item {
          margin: 30px 0 30px;

          textarea {
            width: 100%;
            height: 200px;
            padding: 0 30px;
            border: none;
            background-color: inherit;
            color: #404040;
            font-size: 17px;
          }
        }

        .btn {
          position: relative;
          padding: 10px;
          margin-top: 20px;
          width: 20%;
          height: 10%;
          border-radius: 10px;
          color: #404040;
          font-size: 16px;
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
