import React, { memo } from 'react';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

const ReviewPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle title={'고객후기'} subtitle={'이용하신 고객님들의 후기를 공유해보세요.'} />
    </div>
  );
});

export default ReviewPage;