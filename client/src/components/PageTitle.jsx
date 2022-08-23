import React, { memo } from 'react';
import styled from 'styled-components';

const PageTitle = memo(({ title, subtitle }) => {
  return (
    <PageTitleContainer>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {/* <hr /> */}
    </PageTitleContainer>
  );
});

export default PageTitle;

/** 스타일 */
const PageTitleContainer = styled.div`
  position: relative;
  width: 1200px;
  padding: 135px 0 65px;
  margin: 0 auto;
  color: #404040;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  
  p {
    border-bottom: 1px solid #bcbcbc;
    padding-bottom: 10px;
  }
`;