/** 패키지 참조 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

const ReviewPage = memo(() => {

  const { isLogin } = useSelector(state => state.user);

  return (
    <div>
      <Meta title={'SuperBox :: 고객후기'} />
      <PageTitle
        title={'고객후기'}
        subtitle={'이용하신 고객님들의 후기를 공유해보세요'}
      />
      {isLogin && 
        <Link to={'/review/review_add'}>
          <button>새 글 쓰기</button>
        </Link>
      }
    </div>
  );
});

export default ReviewPage;
