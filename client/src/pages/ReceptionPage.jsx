/**
 * 배송 접수 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../Meta';
import Spinner from '../components/Spinner';
import PageTitle from '../components/PageTitle';
import KakaoMap from '../components/reception/KakaoMap';
import { ReceptionTitle, SendColumn, SearchColumn, InputColumn } from '../components/reception/TagBox';

import RegexHelper from '../libs/RegexHelper';

// slice 참조
import { postReception } from '../slices/ReceptionSlice';

// 아이콘 참조
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

/** 스타일 */
const ReceptionPageContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
  color: #404040;

  .search-container {
    position: relative;
    width: 45%;
    
    .search-wrap {
      margin-bottom: 50px;

      .reception-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 1px solid #404040;
        
        h3 {
          font-size: 1.5rem;
          font-weight: 500;
          padding-bottom: 5px;
        }

        .reception-arrow {
          font-size: 2rem;
        }
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
          &:focus { box-shadow: 0 0 10px #2a376888 }
        }
  
        .search-input-short { width: 110px; }
        .search-input-middle { width: 260px; }
        .search-input-long { width: 410px; }
        /* .search-input-pull { width: 100%; } */
      }
    }
    .search-wrap-last { margin-bottom: 0; }
  }

  .reception-wrap {
    position: sticky;
    top: 12%;
    height: 100%;
    width: 50%;
    
    & > p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #fff;
      text-align: center;
      background-color: #2a3768;
      padding: 10px;
      border-radius: 10px 10px 0 0;
    }

    .reception-info {
      width: 100%;
      background-color: #f7f8fb;
      color: #fff;
      /* padding: 20px 10px; */

      & > span {
        display: inline-block;
        border-radius: 20px;
        background-color: #404040;
        padding: 10px 20px;
        text-align: center;
        font-size: 15px;
        margin: 20px 10px;
        border-bottom: 1px solid #f3b017;
      }
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


const ReceptionPage = memo(() => {

  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  // 리덕스의 디스패치 사용
  const dispatch = useDispatch();

  const { memberData, loading } = useSelector(state => state.user);

  /** 
   * 택배접수 입력 상태값 관리 
   */
   const [reception, setReception] = useState({
    sendName: memberData.user_name,
    sendContact: memberData.user_phone,
    sendPostCode: '',
    sendAddress1: '',
    sendAddress2: '',
    arriveName: '',
    arriveContact: '',
    arrivePostCode: '',
    arriveAddress1: '',
    arriveAddress2: '',
    productName: '',
    productPrice: null,
    productSize: '',
    productQty: '',
    productNote: null,
    visitDate: null,
    payment: '',
    deliveryMessage: null,
    user_no: memberData.user_no,
  });
  console.log(reception);

  const sendRef = useRef();
  const arriveRef = useRef();
  const productRef = useRef();
  const deliveryRef = useRef();

  /** 
   * input 입력값을 state에 저장 
   */
  const onChange = useCallback((e) => {
    e.preventDefault();
 
    const { name, value } = e.target;
    // 입력값
    setReception({ ...reception, [name]: value });

  }, [reception]);

  /** 
   * 출발지 주소검색 
   */
  const startHandleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;

      if (data.buildingName !== '')
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setReception({ ...reception, sendAddress1: fullAddress, sendPostCode: data.zonecode });
  };

  /** 
   * 도착지 주소검색 
   */
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

    setReception({...reception, arriveAddress1: fullAddress, arrivePostCode: data.zonecode });
  };

  // 주소검색 팝업창 생성 (출발지)
  const startHandleClick = () => {
    postcode({
      onComplete: startHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  // 주소검색 팝업창 생성 (도착지)
  const arriveHandleClick = () => {
    postcode({
      onComplete: arriveHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  /** 
   * 접수하기 버튼의 submit 이벤트 발생시 
   */
  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.target;

    try {
      RegexHelper.value(current.sendName, '보내는 분의 이름을 입력해주세요..');
      RegexHelper.nameCheck(current.sendName, '이름은 2~10자리의 영문(소문자), 한글만 가능합니다.');

      RegexHelper.value(current.sendContact, '보내는 분의 연락처를 입력해주세요.');
      RegexHelper.phone(current.sendContact, "전화번호 형식이 아닙니다. ' - '이 있다면 빼고 입력해주세요.");

      RegexHelper.value(current.sendAddress1, '보내는 분의 주소를 입력해주세요.');

      RegexHelper.value(current.sendAddress2, '보내는 분의 상세주소를 입력해주세요.');
      RegexHelper.inputCheck(current.sendAddress2, '상세주소는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

      RegexHelper.value(current.arriveName, '받는 분의 이름을 입력해주세요.');
      RegexHelper.nameCheck(current.arriveName, '이름은 2~10자리의 영문(소문자), 한글만 가능합니다.');

      RegexHelper.value(current.arriveContact, '받는 분의 연락처를 입력해주세요.');
      RegexHelper.phone(current.arriveContact, "전화번호 형식이 아닙니다. ' - '이 있다면 빼고 입력해주세요.")

      RegexHelper.value(current.arriveAddress1, '받는 분의 주소를 입력해주세요.');

      RegexHelper.value(current.arriveAddress2, '받는 분의 상세주소를 입력해주세요.');
      RegexHelper.inputCheck(current.arriveAddress2, '상세주소는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

      RegexHelper.value(current.productName, '배송할 상품명을 입력해주세요.');
      RegexHelper.inputCheck(current.productName, '상품명은 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

      if(current.productPrice.value.length >= 1) {
        RegexHelper.num(current.productPrice, '상품가격은 4~10자 내로 숫자만 입력해주세요.');
      }

      RegexHelper.value(current.productSize, '배송할 상품의 크기를 선택해주세요.');

      RegexHelper.value(current.productQty, '배송할 상품의 수량을 선택해주세요.');

      if(current.productNote.value.length >= 1) {
        RegexHelper.inputCheck(current.productNote, '특이사항은 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');
      }

      RegexHelper.value(current.payment, '결제방식을 선택해주세요.');

      if(current.deliveryMessage.value.length >= 1) {
        RegexHelper.inputCheck(current.deliveryMessage, '배송메세지는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');
      }

      Swal.fire({
        icon: 'success',
        iconColor: '#f3b017',
        text:'접수가 완료되었습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      });

      dispatch(postReception(reception));

    } catch(err) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.message,
        confirmButtonColor: '#f3b017',

      }).then(() => {
      });
      
      err.field.focus();
      return;
    };

  }, [dispatch, reception]);

  // 내일 날짜 구하는 함수 -> yyyy-mm-dd
  const tomorrow = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const tomorrow = date.getDate()+1

    return `${year}-0${month}-${tomorrow}`
  };

  return (
    <div>
      <Spinner loading={loading} />
      <Meta title={'SuperBox :: 배송접수'} />
      <PageTitle title={'배송접수'} subtitle={'배송정보를 정확하게 입력해주세요.'} />

      <ReceptionPageContainer onSubmit={onSubmit}>
        {/* 접수 */}
        <div className='search-container'>

          {/* 보내는 분 */}
          <div className='search-wrap' ref={sendRef}>
            <ReceptionTitle title={'보내는 분 정보'} icon={<MdOutlineKeyboardArrowUp />} />
            <div className='search-row'>
              <SendColumn label={'이름 *'} name={'sendName'} placeholder={'영문(소문자), 한글만 입력해주세요.'} defaultValue={memberData.user_name} onChange={onChange} />
              <SendColumn label={'연락처 *'} name={'sendContact'} placeholder={"' - ' 빼고 입력해주세요."} defaultValue={memberData.user_phone} onChange={onChange} />
            </div>
            <div className='search-row'>
              <SearchColumn label={'주소 *'} className={'search-input search-input-long'} name={'sendAddress1'} value={reception.sendAddress1 || ''} placeholder={"주소검색을 통해 입력해주세요."} />
              <button type="button" onClick={startHandleClick}>주소검색</button>
            </div>
            <div className='search-row'>
              <SearchColumn label={'우편번호'} className={'search-input search-input-short'} name={'sendPostCode'} value={reception.sendPostCode || ''} placeholder={"우편번호"} />
              <InputColumn label={'상세주소 *'} className={'search-input search-input-long'} name={'sendAddress2'} placeholder={'2~30글자 내로 입력해주세요.'} onChange={onChange} />
            </div>
          </div>

          {/* 받는 분 */}
          <div className='search-wrap' ref={arriveRef}>
            <ReceptionTitle title={'받는 분 정보'} icon={<MdOutlineKeyboardArrowUp />} />
            <div className='search-row'>
              <InputColumn label={'이름 *'} className={'search-input search-input-middle'} name={'arriveName'} placeholder={'영문(소문자), 한글만 입력해주세요.'} onChange={onChange} />
              <InputColumn label={'연락처 *'} className={'search-input search-input-middle'} name={'arriveContact'} placeholder={"' - ' 빼고 입력해주세요."} onChange={onChange} />
            </div>
            <div className='search-row'>
              <SearchColumn label={'주소 *'} className={'search-input search-input-long'} name={'arriveAddress1'} value={reception.arriveAddress1 || ''} placeholder={"주소검색을 통해 입력해주세요."} />
              <button type="button" onClick={arriveHandleClick}>주소검색</button>
            </div>
            <div className='search-row'>
              <SearchColumn label={'우편번호'} className={'search-input search-input-short'} name={'arrivePostCode'} value={reception.arrivePostCode || ''} placeholder={"우편번호"} />
              <InputColumn label={'상세주소 *'} className={'search-input search-input-long'} name={'arriveAddress2'} placeholder={'2~30글자 내로 입력해주세요.'} onChange={onChange} />
            </div>
          </div>

          {/* 상품정보 */}
          <div className='search-wrap' ref={productRef}>
            <ReceptionTitle title={'상품 정보'} icon={<MdOutlineKeyboardArrowUp />} />
            <div className='search-row'>
              <InputColumn label={'상품명 *'} className={'search-input search-input-middle'} name={'productName'} placeholder={'자세히 기재해주세요. (예시: 의류,가방)'} onChange={onChange} />
              <InputColumn label={'상품가격'} className={'search-input search-input-middle'} name={'productPrice'} placeholder={'4~10자리의 숫자만 입력. (선택)'} onChange={onChange} />
            </div>
            <div className='search-row'>
              <div className='search-column'>
                <label htmlFor="">크기 *</label>
                <select className='search-input search-input-middle' name='productSize' style={{outline:'none'}} onChange={onChange}>
                  <option value="">상자 크기를 선택하세요</option>
                  <option value="Super-1호">Super-1호</option>
                  <option value="Super-2호">Super-2호</option>
                  <option value="Super-3호">Super-3호</option>
                  <option value="Super-4호">Super-4호</option>
                </select>
              </div>
              <div className='search-column'>
                <label htmlFor="">수량 *</label>
                <select className='search-input search-input-middle' name='productQty' style={{outline:'none'}} onChange={onChange}>
                  <option value="">수량을 선택하세요 (box)</option>
                  {[...new Array(100)].map((v,i) => <option key={i} value={i+1}>{i+1} (box)</option>)}
                </select>
              </div>
            </div>
            <InputColumn label={'특이사항'} className={'search-input'} name={'productNote'} placeholder={'2~20글자 내로 입력해주세요. (선택)'} onChange={onChange} />
          </div>

          {/* 배송조건 */}
          <div className='search-wrap search-wrap-last' ref={deliveryRef}>
            <ReceptionTitle title={'배송 조건'} icon={<MdOutlineKeyboardArrowUp />} />
            <div className='search-row'>
              <div className='search-column '>
                <label htmlFor="">방문 희망일</label>
                <input className='search-input search-input-middle' type="date" name='visitDate' min={tomorrow()} onChange={onChange} />
              </div>
              <div className='search-column'>
                <label htmlFor="">결제방식 *</label>
                <select className='search-input search-input-middle' name='payment' style={{outline:'none'}} onChange={onChange}>
                  <option value="">선택하세요</option>
                  <option value="선불">선불</option>
                  <option value="착불">착불</option>
                </select>
              </div>
            </div>
            <InputColumn label={'배송 메세지'} className={'search-input'} name={'deliveryMessage'} placeholder={'2~20글자 내로 입력해주세요. (선택)'} onChange={onChange} />
          </div>
        </div>

        {/* 접수정보 */}
        <div className='reception-wrap'>
          <p>접수정보</p>
          <KakaoMap 
            sendAddress={reception.sendAddress1} 
            sendAddress2={reception.sendAddress2} 
            arriveAddress={reception.arriveAddress1} 
            arriveAddress2={reception.arriveAddress2} 
          />
          <div className='reception-info'>
            {reception.productSize && <span># 박스는 {reception.productSize}로 할께요!</span>}
            {reception.productQty && <span># 수량은 {reception.productQty}박스 입니다.</span>}
            {reception.visitDate && <span># 방문은 {reception.visitDate} 일에 와주세요~ </span>}
            {reception.payment && <span># {reception.payment}입니다. </span>}
          </div>
          <button type='submit'>접수하기</button>
        </div>

      </ReceptionPageContainer>
    </div>
  );
});

export default ReceptionPage;