import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

/**
 * @description pagination 컴포넌트
 * @param rows 한 페이지에 보여질 리스트 수
 * @param totalList 배열의 전체 길이
 * @param currentPage 현재 페이지 번호
 * @param setCurrentPage 현재 페이지 번호 설정
 */
const Pagination = memo(({ rows, totalList, currentPage, setCurrentPage }) => {

  // const [pageNumber, setPageNumber] = useState([1]);

  const pageNumber = [];

  // 전체길이를 한 페이지에 보여질 리스트 수로 나눈 값을 강제 반올림한다.
  for (let i = 1; i <= Math.ceil(totalList / rows); i++) {
    pageNumber.push(i);
  }

  return (
    <PaginantionConrainer>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <ul className="pagination-wrap"> 
        {pageNumber?.map((number) => (
          <li
            key={number}
            onClick={() => setCurrentPage(number)}
            aria-current={currentPage === number ? 'page' : null}
          >
            {number}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pageNumber.length}
      >
        &gt;
      </button>
    </PaginantionConrainer>
  );
});

export default Pagination;

/** pagination style */
const PaginantionConrainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  button {
    border: none;
    background-color: inherit;
    font-size: 1.3rem;
    color: #404040;
    cursor: pointer;

    &[disabled] {
      color: #bcbcbc;
      cursor: revert;
      transform: revert;
    }
  }

  .pagination-wrap {
    display: flex;
    align-items: center;
    margin: 0 10px;

    li {
      font-size: 1.1rem;
      color: #404040;
      margin: 0 5px;
      padding: 5px 10px;
      transition: 0.1s ease;
      cursor: pointer;

      &:hover {
        text-decoration: underline #f3b017;
        text-underline-position: under;
        text-decoration-thickness: 3px;
        transform: translateY(-2px);
      }

      &[aria-current] {
        color: #fff;
        background-color: #2a3768;
        border-radius: 30%;
        cursor: revert;
        transform: revert;
        text-decoration: none;
      }
    }
  }
`;
