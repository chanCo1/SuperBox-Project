/** 패키지 참조 */
import React, { memo, useState } from 'react';
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// 컴포넌트 참조
import { Input, ReadOnlyInput } from '../reception/TagBox';

// 주소검색 팝업 참조
import { useDaumPostcodePopup } from 'react-daum-postcode';

/**
 * @description 프로필 수정 컴포넌트
 */
const EditProfile = memo(() => {
  /** Store를 통해 user 상태값 호출 */
  const { memberData } = useSelector((state) => state.user);

  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  // 개인정보수정값
  const [editInfo, setEditInfo] = useState({
    userName: memberData?.user_name,
    userPw: memberData?.user_pw,
    userPhone: memberData?.user_phone,
    postCode: memberData?.postCode || '',
    address1: memberData?.addr1 || '',
    address2: memberData?.addr2 || '',
    userNo: memberData?.user_no,
  });
  console.log(editInfo);

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
      postCode: data.zonecode,
      address1: fullAddress,
    });
  };

  // 주소검색 팝업창 생성
  const infoHandleClick = () => {
    postcode({
      onComplete: infoHandleComplete,
      popupTitle: 'SuperBox :: 주소검색',
    });
  };

  return (
    <EditProfileContainer>

      <div className="user-info-box">
        <div className="user-info-wrap">
          <Input
            label={'이름'}
            className1={'user-info'}
            className2={'user-input'}
            type={'text'}
            name={'userName'}
            placeholder={'이름을 입력하세요'}
            defaultValue={memberData?.user_name}
            // onChange={onChange}
          />
          <Input
            label={'비밀번호'}
            className1={'user-info'}
            className2={'user-input'}
            type={'password'}
            name={'userPw'}
            placeholder={'비밀번호를 입력하세요'}
            // defaultValue={memberData?.user_pw}
            // onChange={onChange}
          />
          <Input
            label={'비밀번호확인'}
            className1={'user-info'}
            className2={'user-input'}
            type={'password'}
            name={'userPwCheck'}
            placeholder={'비밀번호를 확인해주세요'}
            // defaultValue={memberData?.user_pw}
            // onChange={onChange}
          />
          <Input
            label={'전화번호'}
            className1={'user-info'}
            className2={'user-input'}
            type={'text'}
            name={'userPhone'}
            placeholder={'비밀번호를 확인해주세요'}
            defaultValue={memberData?.user_phone}
            // onChange={onChange}
          />
        </div>
        <div className="user-info-wrap">
          <ReadOnlyInput
            label={'우편번호'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'postcode'}
            value={editInfo.postCode || ''}
            defaultValue={memberData?.postcode || ''}
            placeholder={'주소검색을 통해 입력해주세요'}
          />
          <ReadOnlyInput
            label={'주소'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'address1'}
            value={editInfo.address1 || ''}
            defaultValue={memberData?.addr2 || ''}
            placeholder={'주소검색을 통해 입력해주세요'}
          />
          <Input
            label={'상세주소'}
            className1={'user-info'}
            className2={'user-input address'}
            type={'text'}
            name={'address2'}
            placeholder={'상세주소를 입력해주세요'}
            defaultValue={memberData?.addr2 || ''}
            // onChange={onChange}
          />
          <div className='edit-address-btn'>
            <button type="button" onClick={infoHandleClick}>
              주소검색
            </button>
          </div>
          <div className='edit-btn'>
            <button>수정하기</button>
          </div>
        </div>
      </div>
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
  }

  .edit-address-btn {
    position: absolute;
    top: 30%;
    right: 5%;
    text-align: end;

    & > button {
      font-size: 14px;
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