import React, { memo } from 'react';

import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

const InquiryPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 1:1 문의'} />
      <PageTitle title={'1:1 문의'} subtitle={'궁금하신게 있으시면 1:1문의로 알려주세요.'} />
    </div>
  );
});

export default InquiryPage;