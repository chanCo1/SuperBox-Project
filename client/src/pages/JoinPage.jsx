/** 패키지 참조 */
import React, { memo } from 'react';
import styled from 'styled-components';

import Meta from '../Meta';

const LoginPage = memo(() => {
  return (
    <div>
      <>
        <Meta title={'SuperBox :: 로그인'} />
      </>
    </div>
  );
});

export default LoginPage;