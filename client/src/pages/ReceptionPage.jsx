/**
 * 배송 접수 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// 주소검색 팝업 참조
import { useDaumPostcodePopup } from 'react-daum-postcode';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { postReception } from '../slices/ReceptionSlice';

// 컴포넌트 참조
import Meta from '../Meta';
import Spinner from '../components/Spinner';
import PageTitle from '../components/PageTitle';
import KakaoMap from '../components/reception/KakaoMap';
import { ReceptionTitle, Input, ReadOnlyInput } from '../components/reception/TagBox';
import BoxSize from '../components/reception/BoxSize';

import RegexHelper from '../libs/RegexHelper';
import { SlideUpDown, ShowItem, HideItem } from '../utils/Event';

import arrow_btn from '../assets/image/arrow_up.png';
import { BsQuestionCircle } from 'react-icons/bs';
import { get } from 'lodash';

const ReceptionPage = memo(() => {
  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  // 리덕스의 디스패치 사용
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Store를 통해 user 상태값 호출 */
  const { memberData, loading } = useSelector((state) => state.user);

  /**
   * 택배접수 입력 상태값 관리
   */
  const [reception, setReception] = useState({
    sendName:  memberData?.user_name,
    sendContact: memberData?.user_phone,
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
    user_no: memberData?.user_no,
  });

  // 화살표 버튼 상태값
  const [sendArrow, setSendArrow] = useState(true);
  const [arriveArrow, setArriveArrow] = useState(true);
  const [productArrow, setProductArrow] = useState(true);
  const [conditionArrow, setConditionArrow] = useState(true);

  const sendRef = useRef();
  const arriveRef = useRef();
  const productRef = useRef();
  const conditionRef = useRef();
  const boxSizeRef = useRef();

  /**
   * input 입력값을 state에 저장
   */
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      // 입력값
      setReception({ ...reception, [name]: value });
    },
    [reception]
  );

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

    setReception({
      ...reception,
      sendAddress1: fullAddress,
      sendPostCode: data.zonecode,
    });
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

    setReception({
      ...reception,
      arriveAddress1: fullAddress,
      arrivePostCode: data.zonecode,
    });
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
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const current = e.target;

      try {
        RegexHelper.value(current.sendName, '보내는 분의 이름을 입력해주세요.');
        RegexHelper.nameCheck(current.sendName, '이름은 2~10자리의 영문(소문자), 한글만 가능합니다.');

        RegexHelper.value(current.sendContact, '보내는 분의 연락처를 입력해주세요.');
        RegexHelper.phone(current.sendContact, "전화번호 형식이 아닙니다. ' - '이 있다면 빼고 입력해주세요.");

        RegexHelper.value(current.sendAddress1, '보내는 분의 주소를 입력해주세요.');

        RegexHelper.value(current.sendAddress2, '보내는 분의 상세주소를 입력해주세요.');
        RegexHelper.inputCheck(current.sendAddress2, '상세주소는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

        RegexHelper.value(current.arriveName, '받는 분의 이름을 입력해주세요.');
        RegexHelper.nameCheck(current.arriveName, '이름은 2~10자리의 영문(소문자), 한글만 가능합니다.');

        RegexHelper.value(current.arriveContact, '받는 분의 연락처를 입력해주세요.');
        RegexHelper.phone(current.arriveContact, "전화번호 형식이 아닙니다. ' - '이 있다면 빼고 입력해주세요.");

        RegexHelper.value(current.arriveAddress1, '받는 분의 주소를 입력해주세요.');

        RegexHelper.value(current.arriveAddress2, '받는 분의 상세주소를 입력해주세요.');
        RegexHelper.inputCheck(current.arriveAddress2, '상세주소는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

        RegexHelper.value(current.productName, '배송할 상품명을 입력해주세요.');
        RegexHelper.inputCheck(current.productName, '상품명은 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

        if (current.productPrice.value.length >= 1) {
          RegexHelper.num(current.productPrice,'상품가격은 4~10자 내로 숫자만 입력해주세요.');
        }

        RegexHelper.value(current.productSize, '배송할 상품의 크기를 선택해주세요.');

        RegexHelper.value(current.productQty, '배송할 상품의 수량을 선택해주세요.');

        if (current.productNote.value.length >= 1) {
          RegexHelper.inputCheck(current.productNote, '특이사항은 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');
        }

        RegexHelper.value(current.payment, '결제방식을 선택해주세요.');

        if (current.deliveryMessage.value.length >= 1) {
          RegexHelper.inputCheck(current.deliveryMessage, '배송메세지는 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');
        }

        Swal.fire({
          icon: 'success',
          iconColor: '#f3b017',
          text: '접수가 완료되었습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#f3b017',
        }).then(() => {
          dispatch(postReception(reception));
          navigate('/mypage');
        });

      } catch (err) {
        Swal.fire({
          icon: 'error',
          iconColor: '#f3b017',
          text: err.message,
          confirmButtonText: '확인',
          confirmButtonColor: '#f3b017',
        }).then(() => {
          // focus가 풀리는 문제를 setTimeout으로 해결
          setTimeout(() => {
            err.field.focus();
            err.field.style.boxShadow = '0 0 5px #ff0000';
          }, 300);
        });

        return;
      }
    },
    [dispatch, reception, navigate]
  );

  // 내일 날짜 구하는 함수 -> yyyy-mm-dd
  const tomorrow = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let tomorrow = date.getDate() + 1;

    // 해당 월의 마지막 날이면?
    // -> month를 다음달로 변경, tomorrow는 다음달 1일로 변경
    if(date.getDate(0) === date.getDate()) {
      month = + date.getMonth() + 2;
      tomorrow = date.getDate(0) - (date.getDate() -1);
    }

    // console.log(`${year}-` + (month > 10 ? month : `0${month}`) + (tomorrow > 10 ? tomorrow : `-0${tomorrow}`))

    return `${year}-` + (month > 10 ? month : `0${month}`) + (tomorrow > 10 ? tomorrow : `-0${tomorrow}`);
  };

  return (
    <div>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 배송접수'} />
      <PageTitle title={'배송접수'} subtitle={'배송정보를 정확하게 입력해주세요'} />

      <ReceptionPageContainer onSubmit={onSubmit}>
        {/* 접수 */}
        <div className="search-container">
          {/* 보내는 분 */}
          <ReceptionTitle
            title={'보내는 분 정보'}
            img={arrow_btn}
            onClick={(e) => SlideUpDown(e, sendRef, sendArrow, setSendArrow)}
          />
          <div className="search-wrap" ref={sendRef}>
            <div className="search-row">
              <Input
                label={'이름'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'sendName'}
                placeholder={'영문(소문자), 한글만 입력해주세요.'}
                defaultValue={memberData?.user_name}
                onChange={onChange}
              />
              <Input
                label={'연락처'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'sendContact'}
                placeholder={"' - ' 빼고 입력해주세요."}
                defaultValue={memberData?.user_phone}
                onChange={onChange}
              />
            </div>
            <div className="search-row">
              <ReadOnlyInput
                label={'주소'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-long'}
                type={'text'}
                name={'sendAddress1'}
                value={reception.sendAddress1 || ''}
                placeholder={'주소검색을 통해 입력해주세요.'}
              />
              <button type="button" onClick={startHandleClick}>
                주소검색
              </button>
            </div>
            <div className="search-row">
              <ReadOnlyInput
                label={'우편번호'}
                className1={'search-column'}
                className2={'search-input search-input-short'}
                type={'text'}
                name={'sendPostCode'}
                value={reception.sendPostCode || ''}
                placeholder={'우편번호'}
              />
              <Input
                label={'상세주소'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-long'}
                type={'text'}
                name={'sendAddress2'}
                placeholder={'2~30글자 내로 입력해주세요.'}
                onChange={onChange}
              />
            </div>
          </div>

          {/* 받는 분 */}
          <ReceptionTitle
            title={'받는 분 정보'}
            img={arrow_btn}
            onClick={(e) => SlideUpDown(e, arriveRef, arriveArrow, setArriveArrow)}
          />
          <div className="search-wrap" ref={arriveRef}>
            <div className="search-row">
              <Input
                label={'이름'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'arriveName'}
                placeholder={'영문(소문자), 한글만 입력해주세요.'}
                onChange={onChange}
              />
              <Input
                label={'연락처'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'arriveContact'}
                placeholder={"' - ' 빼고 입력해주세요."}
                onChange={onChange}
              />
            </div>
            <div className="search-row">
              <ReadOnlyInput
                label={'주소'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-long'}
                type={'text'}
                name={'arriveAddress1'}
                value={reception.arriveAddress1 || ''}
                placeholder={'주소검색을 통해 입력해주세요.'}
              />
              <button type="button" onClick={arriveHandleClick}>
                주소검색
              </button>
            </div>
            <div className="search-row">
              <ReadOnlyInput
                label={'우편번호'}
                className1={'search-column'}
                className2={'search-input search-input-short'}
                type={'text'}
                name={'arrivePostCode'}
                value={reception.arrivePostCode || ''}
                placeholder={'우편번호'}
              />
              <Input
                label={'상세주소'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-long'}
                type={'text'}
                name={'arriveAddress2'}
                placeholder={'2~30글자 내로 입력해주세요.'}
                onChange={onChange}
              />
            </div>
          </div>

          {/* 상품정보 */}
          <ReceptionTitle
            title={'상품 정보'}
            img={arrow_btn}
            onClick={(e) => SlideUpDown(e, productRef, productArrow, setProductArrow)}
          />
          <div className="search-wrap" ref={productRef}>
            <div className="search-row">
              <Input
                label={'상품명'}
                require={'*'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'productName'}
                placeholder={'자세히 기재해주세요. (예시: 의류,가방)'}
                onChange={onChange}
              />
              <Input
                label={'상품가격'}
                className1={'search-column'}
                className2={'search-input search-input-middle'}
                type={'text'}
                name={'productPrice'}
                placeholder={'4~10자리의 숫자만 입력. (선택)'}
                onChange={onChange}
              />
            </div>
            <div className="search-row">
              <div className="search-column">
                <div>
                  <div className="box-size-wrap" ref={boxSizeRef}>
                    <BoxSize />
                  </div>
                  <label htmlFor="">크기<span>*</span></label>
                  <BsQuestionCircle
                    className="question-mark"
                    onMouseOver={() => ShowItem(boxSizeRef)}
                    onMouseOut={() => HideItem(boxSizeRef)}
                  />
                </div>
                <select
                  className="search-input search-input-middle"
                  name="productSize"
                  style={{ outline: 'none' }}
                  onChange={onChange}
                >
                  <option value="">상자 크기를 선택하세요</option>
                  {[...new Array(6)].map((v, i) => (
                    <option key={i} value={`Super ${i + 1}호`}>
                      Super {i + 1}호
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-column">
                <label htmlFor="">수량<span>*</span></label>
                <select
                  className="search-input search-input-middle"
                  name="productQty"
                  style={{ outline: 'none' }}
                  onChange={onChange}
                >
                  <option value="">수량을 선택하세요 (box)</option>
                  {[...new Array(50)].map((v, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} (box)
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              label={'특이사항'}
              className1={'search-column'}
              className2={'search-input'}
              type={'text'}
              name={'productNote'}
              placeholder={'2~20글자 내로 입력해주세요. (선택)'}
              onChange={onChange}
            />
          </div>

          {/* 배송조건 */}
          <ReceptionTitle
            title={'배송 조건'}
            img={arrow_btn}
            onClick={(e) =>
              SlideUpDown(e, conditionRef, conditionArrow, setConditionArrow)
            }
          />
          <div className="search-wrap search-wrap-last" ref={conditionRef}>
            <div className="search-row">
              <div className="search-column ">
                <label htmlFor="">방문 희망일</label>
                <input
                  className="search-input search-input-middle"
                  type="date"
                  name="visitDate"
                  min={tomorrow() || ''}
                  // min={'2022-08-31'}
                  onChange={onChange}
                />
              </div>
              <div className="search-column">
                <label htmlFor="">결제방식<span>*</span></label>
                <select
                  className="search-input search-input-middle"
                  name="payment"
                  style={{ outline: 'none' }}
                  onChange={onChange}
                >
                  <option value="">선택하세요</option>
                  <option value="선불">선불</option>
                  <option value="착불">착불</option>
                </select>
              </div>
            </div>
            <Input
              label={'배송 메세지'}
              className1={'search-column'}
              className2={'search-input'}
              type={'text'}
              name={'deliveryMessage'}
              placeholder={'2~20글자 내로 입력해주세요. (선택)'}
              onChange={onChange}
            />
          </div>
        </div>

        {/* 접수정보 */}
        <div className="reception-wrap">
          <p>접수정보</p>
          <KakaoMap
            sendAddress={reception.sendAddress1}
            sendAddress2={reception.sendAddress2}
            arriveAddress={reception.arriveAddress1}
            arriveAddress2={reception.arriveAddress2}
          />
          <div className="reception-info">
            {reception.productSize && (
              <span># 박스는 크기는 {reception.productSize} 입니다!</span>
            )}
            {reception.productQty && (
              <span># 수량은 {reception.productQty}박스예요.</span>
            )}
            {reception.visitDate && (
              <span># 방문은 {reception.visitDate} 일에 와주세요~ </span>
            )}
            {reception.payment && <span># {reception.payment}로 할께요! </span>}
          </div>
          <button type="submit">접수하기</button>
        </div>
      </ReceptionPageContainer>
    </div>
  );
});

export default ReceptionPage;

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

    .reception-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid #bcbcbc;

      h3 {
        font-size: 1.3rem;
        font-weight: 500;
        padding-bottom: 5px;
      }

      .reception-arrow {
        position: relative;
        top: 15px;
        height: 15px;
        cursor: pointer;
        transition: 0.5s ease;
        margin-right: 10px;
        opacity: 0.3;
      }
      .arrow-active {
        transform: rotate(180deg);
      }
    }

    .search-wrap {
      margin-bottom: 50px;
      max-height: 100vh;
      overflow: hidden;
      transition: 0.4s ease-out;

      .search-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2px;

        button {
          width: 20%;
          padding: 7px 10px;
          border: none;
          background-color: #2a3768;
          border-radius: 5px;
          color: #fff;
          font-size: 1.1rem;
          transition: 0.5s ease;
          cursor: pointer;

          &:active {
            transform: scale(0.9, 0.9);
          }
        }
      }

      .search-column {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {
          font-size: 1rem;
          margin-bottom: 5px;

          span {
            font-size: 1.1em;
            margin-left: 5px;
            color: #f3b017;
          }
        }

        .box-size-wrap {
          position: absolute;
          left: 15%;
          display: none;
          z-index: 99;
        }

        .question-mark {
          margin-left: 10px;
          cursor: pointer;
        }

        .search-input {
          border: none;
          border-radius: 5px;
          border: 1px solid #bcbcbc;
          padding: 10px;
          color: #404040;
          font-size: 15px;

          &::-webkit-input-placeholder { color: #bcbcbc; }
          &:focus { box-shadow: 0 0 5px #2a376888; }
        }

        .search-input-short { width: 110px; }
        .search-input-middle { width: 260px; }
        .search-input-long { width: 410px; }
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
      transition: 0.3s ease;

      &:active {
        transform: scale(0.9, 0.9);
      }
    }
  }
`;