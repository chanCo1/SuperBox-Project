import React, { memo } from 'react';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

const NoticePage = memo(() => {
  return (
    <div>
      <Meta title={'SuperBox :: 공지사항'} />
      <PageTitle title={'공지사항'} subtitle={'공지사항이 있으면 알려드릴께요.'} />
    </div>
  );
});

export default NoticePage;