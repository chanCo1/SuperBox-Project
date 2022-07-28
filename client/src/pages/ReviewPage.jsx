import React, { memo } from 'react';
import Meta from '../Meta';

const ReviewPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 고객후기'} />
      후기게시판
    </div>
  );
});

export default ReviewPage;