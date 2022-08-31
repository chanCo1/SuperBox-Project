/** 패키지 참조 */
import React, { memo } from 'react';

import Meta from '../../Meta';
import PageTitle from '../PageTitle';

const MypageInquiry = memo(() => {
  return (
    <>
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'마이페이지'} subtitle={'내가 남긴 1:1문의 내용을 확인해보세요'} />
      
      <div style={{textAlign: 'center', padding: '80px'}}>준비중입니다!</div>
    </>
  );
});

export default MypageInquiry;