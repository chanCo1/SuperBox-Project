import React, { memo } from 'react';

import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

const MyPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 마이페이지'} />
      <PageTitle title={'마이페이지'} subtitle={'고객님의 정보를 한 눈에 확인해보세요.'} />
    </div>
  );
});

export default MyPage;