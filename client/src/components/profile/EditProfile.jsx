/** 패키지 참조 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { putProfile } from '../../slices/ProfileSlice';
import { tokenVerify } from '../../slices/UserSlice';

// 컴포넌트 참조
import { Input, ReadOnlyInput } from '../reception/TagBox';

// 주소검색 팝업 참조
import { useDaumPostcodePopup } from 'react-daum-postcode';

import RegexHelper from '../../libs/RegexHelper';

/**
 * @description 프로필 수정 컴포넌트
 * @param setEditProfileState 개인정보 수정 화면 on / off
 */
const EditProfile = memo(({ setEditProfileState }) => {

  const dispatch = useDispatch();
  /** Store를 통해 user 상태값 호출 */
  const { memberData } = useSelector((state) => state.user);

  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  // 개인정보수정값
  const [editInfo, setEditInfo] = useState({
    userName: memberData?.user_name,
    password: memberData?.user_pw,
    passwordCheck: '',
    phoneNumber: memberData?.user_phone,
    postcode: memberData?.postcode || '',
    addr1: memberData?.addr1 || '',
    addr2: memberData?.addr2 || '',
    user_no: memberData?.user_no,
  });
  console.log(editInfo);

  /** input 입력값을 state에 저장 */
  const onChange = useCallback((e) => {
    e.preventDefault();

    const { name, value } = e.target;
    // 입력값
    setEditInfo({ ...editInfo, [name]: value });
  }, [editInfo]);

  /** 주소검색 */
  const infoHandleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;

      if (data.buildingName !== '')
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;

      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setEditInfo({
      ...editInfo,
      postcode: data.zonecode,
      addr1: fullAddress,
    });
  };

  /** 주소검색 팝업창 생성 */
  const infoHandleClick = () => {
    postcode({
      onComplete: infoHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  /** 개인정보 수정하기 버튼의 submit 이벤트 발생시 */
  const onEditSubmit = useCallback(e => {
    e.preventDefault();

    const current = e.target;

    try {
      // 이름 유효성 검사
      RegexHelper.value(current.userName, '이름을 입력해주세요.');
      RegexHelper.nameCheck(current.userName, '2~10자리의 영문(소문자), 한글만 가능합니다.');

      // 비밀번호 유효성 검사
      if(current.password.value.length >= 1) {
        // RegexHelper.value(current.password,  '비밀번호를 입력해주세요.');
        RegexHelper.pwCheck(current.password,  '비밀번호는 8~20자리의 영문(대/소문자)+숫자+특수문자만 가능합니다.');
  
        RegexHelper.value(current.passwordCheck, '비밀번호를 확인해주세요.');
        RegexHelper.compare(current.password, current.passwordCheck, '비밀번호가 일치하지 않습니다.');
      }

      // 전화번호 유효성 검사
      RegexHelper.value(current.phoneNumber, '전화번호를 입력해주세요.');
      RegexHelper.cellphone(current.phoneNumber, '전화번호 형식에 맞지 않습니다. "-"이 있다면 빼고 입력해주세요.');

      // 상세주소 검사
      if (current.addr2.value.length >= 1) {
        RegexHelper.inputCheck(current.addr2, '상세주소는 2~20자 내로 입력해주세요.');
      }

      Swal.fire({
        icon: 'success',
        iconColor: '#f3b017',
        text: '개인정보가 수정되었습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        dispatch(putProfile(editInfo));
        setEditProfileState(false);
        
        setTimeout(() => {
          dispatch(tokenVerify());
        }, 500);
      });

    } catch(err) {
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
        }, 300);
      });
    }
  }, [dispatch, editInfo, setEditProfileState]);

  return (
    <EditProfileContainer>
      <form className="user-info-box"  onSubmit={onEditSubmit}>
        <div className="user-info-wrap">
          <Input
            label={'이름'}
            className1={'user-info'}
            className2={'user-input'}
            type={'text'}
            name={'userName'}
            placeholder={'이름을 입력하세요'}
            defaultValue={memberData?.user_name}
            onChange={onChange}
          />
          <Input
            label={'비밀번호'}
            className1={'user-info'}
            className2={'user-input'}
            type={'password'}
            name={'password'}
            placeholder={'새 비밀번호를 입력하세요'}
            onChange={onChange}
          />
          <Input
            label={'비밀번호확인'}
            className1={'user-info'}
            className2={'user-input'}
            type={'password'}
            name={'passwordCheck'}
            placeholder={'새 비밀번호를 확인해주세요'}
            onChange={onChange}
          />
          <Input
            label={'전화번호'}
            className1={'user-info'}
            className2={'user-input'}
            type={'text'}
            name={'phoneNumber'}
            placeholder={'"-" 빼고 입력해주세요'}
            defaultValue={memberData?.user_phone}
            onChange={onChange}
          />
        </div>
        <div className="user-info-wrap">
          <ReadOnlyInput
            label={'우편번호'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'postcode'}
            value={editInfo?.postcode || ''}
            // defaultValue={memberData?.postcode || ''}
            placeholder={'주소검색을 통해 입력해주세요'}
          />
          <ReadOnlyInput
            label={'주소'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'addr1'}
            value={editInfo?.addr1 || ''}
            placeholder={'주소검색을 통해 입력해주세요'}
          />
          <Input
            label={'상세주소'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'addr2'}
            placeholder={'상세주소를 입력해주세요'}
            defaultValue={memberData?.addr2}
            onChange={onChange}
          />
          <div className='edit-address-btn'>
            <button type="button" onClick={infoHandleClick}>
              주소검색
            </button>
          </div>
          <div className='edit-btn'>
            <button type='submit'>수정하기</button>
          </div>
        </div>
      </form>
    </EditProfileContainer>
  );
});

export default EditProfile;

/** 
 * @description 개인정보수정 스타일 
 * (일부 클래스는 MypageProfile에서 사용)
 */
const EditProfileContainer = styled.div`
  .user-input {
    width: 250px;
    border: none;
    color: #404040;

    &::-webkit-input-placeholder { color: #bcbcbc; }
  }

  .edit-address-btn {
    position: absolute;
    top: 29%;
    right: 5%;
    text-align: end;

    & > button {
      font-size: 16px;
      border: none;
      background-color: #2a3768;
      border-radius: 10px;
      padding: 5px 10px;
      color: #fff;
      cursor: pointer;
      transition: .2s ease;

      &:active { transform: scale(.9, .9); }
    }
  }

  .edit-btn {
    text-align: end;

    & > button {
      font-size: 16px;
      border: 1px solid #f3b017;
      background-color: #fff;
      border-radius: 10px;
      padding: 5px 10px;
      color: #f3b017;
      cursor: pointer;
      transition: .2s ease;

      &:hover { 
        background-color: #f3b017;
        color: #fff;
       }
      &:active { transform: scale(.9, .9); }
    }
  }
`;