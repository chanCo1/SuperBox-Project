/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch } from 'react-icons/ai';

/**
 * @description 후기 글 검색
 * @param listSort
 * @param setKeyword
 */
const Search = memo(({ listSort, setKeyword }) => {
  // 페이지 강제 이동을처리하기 위한 naviagte함수 생성
  const navigate = useNavigate();

  // 검색어 상태값 저장
  const [search, setSearch] = useState("");
  console.log(search);

  // 부모컴포넌트에 검색값을 보낸다.
  useEffect(() => {
    setKeyword(search);
  }, [search, setKeyword]);

  /** 검색 이벤트 */
  const onSearchSubmit = useCallback(e => {
    e.preventDefault();

    if(search !== "") {
      navigate(`/review?query=${search}&rows=10&page=1&sort=${listSort}`);
    }

  }, [search, navigate, listSort]);

  /** 검색어 값 */
  const onSearchChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  return (
    <SearchContainer>
      <form className="review-search" onSubmit={onSearchSubmit}>
        <input className="input-area" type="text" name="search" placeholder="검색..." onChange={onSearchChange} />
        <button className="input-btn">
          <AiOutlineSearch className="search-icon" />
        </button>
      </form>
    </SearchContainer>
  );
});

export default Search;

const SearchContainer = styled.div`
  .review-search {
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    display: flex;

    &:focus-within {
      box-shadow: 0 0 5px #2a376888;
    }

    .input-area {
      border: none;
      border-radius: 10px 0 0 10px;
      padding: 8px 20px;
      font-size: 1rem;
      color: #404040;

      &::-webkit-input-placeholder {
        color: #bcbcbc;
      }
    }

    .input-btn {
      display: flex;
      padding: 5px;
      border: none;
      background-color: #fff;
      border-radius: 0 10px 10px 0;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease;

      &:active {
        transform: scale(0.9, 0.9);
      }

      .search-icon {
        font-size: 1.5rem;
        color: #404040;
      }
    }
  }
`;
