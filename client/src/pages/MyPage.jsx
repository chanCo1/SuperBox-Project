import React, { memo } from 'react';
import Meta from '../Meta';

const MyPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 마이페이지'} />

      마이페이지
    </div>
  );
});

export default MyPage;