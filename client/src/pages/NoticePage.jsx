import React, { memo } from 'react';
import Meta from '../Meta';

const NoticePage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 공지사항'} />
      고객센터
    </div>
  );
});

export default NoticePage;