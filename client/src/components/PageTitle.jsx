import React, { memo } from 'react';
import styled from 'styled-components';

const PageTitleContainer = styled.div`
  position: relative;
  width: 1200px;
  padding: 135px 0 65px;
  margin: 0 auto;
  color: #404040;

  h1 {
    font-size: 3rem;
    font-weight: 500;
  }
  
  p {
    border-bottom: 1px solid #404040;
    padding-bottom: 10px;
  }
`;

const PageTitle = memo(({ title, subtitle }) => {
  return (
    <PageTitleContainer>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </PageTitleContainer>
  );
});

export default PageTitle;