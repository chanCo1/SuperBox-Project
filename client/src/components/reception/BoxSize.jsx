import React, { memo } from 'react';
import styled from 'styled-components';

const BoxSizeContainer = styled.table`
  position: relative;
  width: 1000px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px #000000ba;
  border-spacing: 0;
  border-collapse: collapse;
  border-radius: 10px;
  text-align: center;
  color: #404040;
  
  .thead {
    background-color: #2a3768;
    color: #fff;
    
    th {
      padding: 20px 5px;
      font-size: 20px;
      font-weight: 500;
      
      &:first-child {
        border-radius: 10px 0 0 0;
        width: 70px;
      }
      &:last-child {
        border-radius: 0 10px 0 0;
      }
    }
  }
  
  .tbody {
    tr{
      &:first-child {
        font-size: 13px;
        color: #bcbcbc;

        span {
          font-size: 16px;
          color: #404040;
        }
      }

      &:last-child {
        /* border-bottom: 1px solid #000000ba; */
      }

      th {
        width: 12%;
        padding: 10px 5px;
        font-size: 18px;
        color: #404040;
        background-color: #f7f8fb;
        border-radius: 0 0 0 10px;

      }

      td {
        padding: 5px 0;
      }
    }
  }
`;

const BoxSize = memo(() => {
  return (
    <BoxSizeContainer>
      <thead className="thead">
        <tr>
          <th>구분</th>
          <th>Super-1호</th>
          <th>Super-2호</th>
          <th>Super-3호</th>
          <th>Super-4호</th>
          <th>Super-5호</th>
          <th>Super-6호</th>
        </tr>
      </thead>
      <tbody className='tbody'>
        <tr>
          <th>박스 크기</th>
          <td>가로 + 세로 + 높이<br />22 + 19 + 9<br /><span>50cm 이하</span></td>
          <td>가로 + 세로 + 높이<br />27 + 18 + 15<br /><span>60cm 이하</span></td>
          <td>가로 + 세로 + 높이<br />34 + 25 + 21<br /><span>80cm 이하</span></td>
          <td>가로 + 세로 + 높이<br />41 + 31 + 28<br /><span>100cm 이하</span></td>
          <td>가로 + 세로 + 높이<br />48 + 38 + 34<br /><span>120cm 이하</span></td>
          <td>가로 + 세로 + 높이<br />52 + 40 + 40<br /><span>1400cm 이하</span></td>
        </tr>
        <tr>
          <th>택배 무게</th>
          <td>2kg 이하</td>
          <td>5kg 이하</td>
          <td>10kg 이하</td>
          <td>15kg 이하</td>
          <td>20kg 이하</td>
          <td>25kg 이하</td>
        </tr>
        <tr>
          <th>요금</th>
          <td>3000원</td>
          <td>3500원</td>
          <td>3800원</td>
          <td>4500원</td>
          <td>4800원</td>
          <td>5500원</td>
        </tr>
      </tbody>
    </BoxSizeContainer>
  );
});

export default BoxSize;
