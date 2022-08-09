import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const SearchAddress = memo(({ setStartMyAddress, setArriveMyAddress }) => {
  /** 주소 검색 라이브러리 사용 */
  const postcode = useDaumPostcodePopup();

  const [startZoneCode, setStartZoneCode] = useState('');
  const [startAddress, setStartAdress] = useState('');
  const [arriveZoneCode, setArriveZoneCode] = useState('');
  const [arriveAddress, setArriveAdress] = useState('');

  /** 출발지 주소검색 */
  const startHandleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;

      if (data.buildingName !== '')
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;

      if (data.zonecode !== '') {
        setStartZoneCode(data.zonecode);
      }

      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setStartAdress(fullAddress);
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

      if (data.zonecode !== '') {
        setArriveZoneCode(data.zonecode);
      }

      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setArriveAdress(fullAddress);
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

  useEffect(() => {
    setStartMyAddress(startAddress);
    setArriveMyAddress(arriveAddress);

  }, [setStartMyAddress, setArriveMyAddress, startAddress, arriveAddress]);

  return (
    <div>
      <input type="text" value={startZoneCode || ""} placeholder={"우편번호"} readOnly />
      <input type="text" value={startAddress || ""} placeholder={"주소"} readOnly />
      <input type="text" placeholder={"상세주소"} />
      <button type="button" onClick={startHandleClick}>
        주소검색
      </button>
      <br />
      <input type="text" value={arriveZoneCode || ""} placeholder={"우편번호"} readOnly />
      <input type="text" value={arriveAddress || ""} placeholder={"주소"} readOnly />
      <input type="text" placeholder={"상세주소"} />
      <button type="button" onClick={arriveHandleClick}>
        주소검색
      </button>
    </div>
  );
});

export default SearchAddress;
