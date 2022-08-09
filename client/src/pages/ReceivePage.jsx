/**
 * 배송 접수 페이지
 */

/** 패키지 참조 */
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


// 컴포넌트 참조
import Meta from '../Meta';
import Spinner from '../components/Spinner';
import PageTitle from '../components/PageTitle';

import SearchAddress from '../components/receive/SearchAddress';
import KakaoMap from '../components/receive/KakaoMap';

/** 스타일 */
const ReceivePageContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
`;



const ReceivePage = memo(() => {

  const [startMyAddress, setStartMyAddress] = useState('');
  const [arriveMyAddress, setArriveMyAddress] = useState('');

  return (
    <div>
      <Meta title={'SuperBox :: 배송접수'} />
      <PageTitle title={'배송접수'} subtitle={'배송정보를 정확하게 입력해주세요.'} />

      <ReceivePageContainer>
        <SearchAddress setStartMyAddress={setStartMyAddress} setArriveMyAddress={setArriveMyAddress} />
        <KakaoMap startMyAddress={startMyAddress} arriveMyAddress={arriveMyAddress}  />
      </ReceivePageContainer>
    </div>
  );
});

export default ReceivePage;
