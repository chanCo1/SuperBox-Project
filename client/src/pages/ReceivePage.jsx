/**
 * 배송 접수 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

// 컴포넌트 참조
import Meta from '../Meta';
import Spinner from '../components/Spinner';
import PageTitle from '../components/PageTitle';
import KakaoMap from '../components/receive/KakaoMap';
// import SearchAddressInput from '../components/receive/SearchAddressInput';

/** 스타일 */
const ReceivePageContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  color: #404040;

  .search-container {
    position: relative;
    width: 45%;
    
    .search-wrap {
      margin-bottom: 50px;

      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #404040;
      }
  
      .search-row { 
        display: flex; 
        justify-content: space-between;
        align-items: center;
  
        button {
          width: 20%;
          padding: 7px 10px;
          border: none;
          background-color: #2a3768;
          border-radius: 5px;
          color: #fff;
          font-size: 1.1rem;
          transition: .5s ease;
          cursor: pointer;
          
          &:active { transform: scale(.9, .9); }
        }
      }
  
      .search-column {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
  
        .search-input {
          border: none;
          border: 1px solid #404040;
          border-radius: 5px;
          padding: 10px 10px;
          color: #404040;
          font-size: 15px;

          &::-webkit-input-placeholder { color: #bcbcbc; }
          &:focus { box-shadow: 0 0 5px #2a376888 }
        }
  
        .search-input-short { width: 110px; }
        .search-input-middle { width: 260px; }
        .search-input-long { width: 410px; }
        /* .search-input-pull { width: 100%; } */
      }
    }
  }

  .receive-wrap {
    position: sticky;
    top: 15%;
    height: 850px;
    width: 50%;
    
    p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #fff;
      text-align: center;
      background-color: #2a3768;
      padding: 10px;
      border-radius: 10px 10px 0 0;
    }

    .receive-info {
      width: 100%;
      height: 150px;
      background-color: #f7f8fb;
    }

    button {
      width: 100%;
      background-color: #f3b017;
      color: #fff;
      border: none;
      padding: 10px;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 0 0 10px 10px;
      transition: .3s ease;

      &:active { transform: scale(.9, .9); }
    }
  }
`;


const ReceivePage = memo(() => {

  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  /** 택배접수 입력 상태값 관리 */
   const [receive, setReceive] = useState({
    sendName: '',
    sendContact: '',
    sendPostCode: '',
    sendAddress1: '',
    sendAddress2: '',
    arriveName: '',
    arriveContact: '',
    arrivePostCode: '',
    arriveAddress1: '',
    arriveAddress2: '',
  });

  /** input 입력값을 state에 저장 */
  const onChange = useCallback((e) => {
    e.preventDefault();
 
    const { name, value } = e.target;
    // 입력값
    setReceive({ ...receive, [name]: value });

  }, [receive]);

  /** 출발지 주소검색 */
  const startHandleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;

      if (data.buildingName !== '')
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setReceive({ ...receive, sendAddress1: fullAddress, sendPostCode: data.zonecode });
  };

  /** 도착지 주소검색 */
  const arriveHandleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;

      if (data.buildingName !== '')
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setReceive({...receive, arriveAddress1: fullAddress, arrivePostCode: data.zonecode });
  };

  const startHandleClick = () => {
    postcode({
      onComplete: startHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  const arriveHandleClick = () => {
    postcode({
      onComplete: arriveHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  return (
    <div>
      <Spinner loading={''} />
      <Meta title={'SuperBox :: 배송접수'} />
      <PageTitle title={'배송접수'} subtitle={'배송정보를 정확하게 입력해주세요.'} />

      <ReceivePageContainer>
        <div className='search-container'>

          {/* 보내는 분 */}
          <div className='search-wrap'>
            <h3>보내는 분 정보</h3>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">이름 *</label>
                <input className='search-input search-input-middle' type="text" name='sendName' placeholder="이름" onChange={onChange} />
              </div>
              <div className='search-column'>
                <label htmlFor="">연락처 *</label>
                <input className='search-input search-input-middle' type="text" name='sendContact' placeholder='" - " 빼고 입력해주세요.' onChange={onChange} />
              </div>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">주소 *</label>
                <input className='search-input search-input-long' type="text" name='sendAddress1' value={receive.sendAddress1 || ''} placeholder="주소" readOnly />
              </div>
              <button type="button" onClick={startHandleClick}>주소검색</button>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">우편번호</label>
                <input className='search-input search-input-short' type="text" name='sendPostCode' value={receive.sendPostCode || ''} placeholder="우편번호" readOnly />
              </div>
              <div className='search-column'>
                <label htmlFor="">상세주소 *</label>
                <input className='search-input search-input-long' type="text" name='sendAddress2' placeholder={'상세주소'} onChange={onChange} />
              </div>
            </div>
          </div>

          {/* 받는 분 */}
          <div className='search-wrap'>
            <h3>받는 분 정보</h3>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">이름 *</label>
                <input className='search-input search-input-middle' type="text" name='arriveName' placeholder="이름" onChange={onChange} />
              </div>
              <div className='search-column'>
                <label htmlFor="">연락처 *</label>
                <input className='search-input search-input-middle' type="text" name='arriveContact' placeholder='" - " 빼고 입력해주세요.' onChange={onChange} />
              </div>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">주소 *</label>
                <input className='search-input search-input-long' type="text" name='arriveAddress1' value={receive.arriveAddress1 || ''} placeholder="주소" readOnly />
              </div>
              <button type="button" onClick={arriveHandleClick}>주소검색</button>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">우편번호</label>
                <input className='search-input search-input-short' type="text" name='arrivePostCode' value={receive.arrivePostCode || ''} placeholder="우편번호" readOnly />
              </div>
              <div className='search-column'>
                <label htmlFor="">상세주소 *</label>
                <input className='search-input search-input-long' type="text" name='arriveAddress2' placeholder={'상세주소'} onChange={onChange} />
              </div>
            </div>
          </div>

          {/* 상품정보 */}
          <div className='search-wrap'>
            <h3>상품 정보</h3>
            <div className='search-row'>
              <div className='search-column '>
                <label htmlFor="">상품명 *</label>
                <input className='search-input search-input-middle' type="text" name='' placeholder="자세히 기재해주세요. (예시: 의류,가방)" onChange={''} />
              </div>
              <div className='search-column'>
                <label htmlFor="">상품가격</label>
                <input className='search-input search-input-middle' type="text" name='' placeholder="상품가격" onChange={''} />
              </div>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">부피 *</label>
                <select className='search-input search-input-middle' name='' style={{outline:'none'}} onChange={''}>
                  <option value="">선택하세요</option>
                  <option value="s-box">소박스</option>
                  <option value="m-box">중박스</option>
                  <option value="l-box">대박스</option>
                  <option value="xl-box">특대박스</option>
                </select>
                {/* <input className='search-input search-input-middle' type="text" name='' placeholder="상품가격" onChange={''} /> */}
              </div>
              <div className='search-column'>
                <label htmlFor="">수량 *</label>
                <input className='search-input search-input-middle' type="text" name='' placeholder='수량' onChange={''} />
              </div>
            </div>
            <div className='search-column'>
              <label htmlFor="">특이사항</label>
              <input className='search-input' type="text" name='' placeholder='특이사항' onChange={''} />
            </div>
          </div>

          {/* 배송조건 */}
          <div className='search-wrap'>
            <h3>배송 조건</h3>
            <div className='search-row'>
              <div className='search-column '>
                <label htmlFor="">방문 희망일</label>
                <input className='search-input search-input-middle' type="date" name='' onChange={''} />
              </div>
              <div className='search-column'>
                <label htmlFor="">희망 시간</label>
                <input className='search-input search-input-middle' type="time" name='' placeholder="상품가격" onChange={''} />
              </div>
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">결제방식 *</label>
                <select className='search-input search-input-middle' name='' style={{outline:'none'}} onChange={''}>
                  <option value="prepay">선불</option>
                  <option value="cod">착불</option>
                </select>
              </div>
              <div className='search-column'>
                <label htmlFor="">배송 메세지</label>
                <input className='search-input search-input-middle' type="text" name='' placeholder='배송 메세지' onChange={''} />
              </div>
            </div>
          </div>
        </div>


        <div className='receive-wrap'>
          <p>접수정보</p>
          <KakaoMap sendAddress={receive.sendAddress1} arriveAddress={receive.arriveAddress1}  />
          <div className='receive-info'>

          </div>
          <button type='submit'>접수하기</button>
        </div>

      </ReceivePageContainer>
    </div>
  );
});

export default ReceivePage;





{/* <SearchAddressInput 
            title={'보내는 분 정보'}
            onClick={startHandleClick}
            zonecode={startZoneCode}
            address={startAddress}
            onChange={onChange}
            sendName={sendName || ""}
            sendContact={sendContact || ""}
            sendAddress2={sendAddress2 || ""}
          /> */}