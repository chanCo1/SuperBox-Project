/** 패키지 참조 */
import React, { memo } from 'react';

import Meta from '../../Meta';
import PageTitle from '../PageTitle';

const MypageInfomation = memo(() => {
  return (
    <>
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'마이페이지'} subtitle={'개인정보를 관리할 수 있어요'} />

      <div style={{textAlign: 'center', padding: '80px'}}>준비중입니다!</div>
    </>
  );
});

export default MypageInfomation;