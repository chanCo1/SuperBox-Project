import React, { memo } from 'react';

import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

const FaqPage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 자주 찾는 질문'} />
      <PageTitle title={'자주 찾는 질문'} subtitle={'자주 찾으시는 질문은 여기에 모여있어요.'} />
    </div>
  );
});

export default FaqPage;