/**
 * 주소검색 컴포넌트
 */
import React, { memo } from 'react';
import styled from 'styled-components';

// const SearchContainer = styled.div`
//   position: relative;
//   width: 45%;

//   .search-wrap {
//     margin-bottom: 50px;

//     h3 {
//       font-size: 1.5rem;
//       font-weight: 500;
//       padding-bottom: 5px;
//       margin-bottom: 20px;
//       border-bottom: 1px solid #404040;
//     }

//     .search-row {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;

//       button {
//         width: 20%;
//         padding: 10px 10px;
//         border: none;
//         background-color: #2a3768;
//         border-radius: 5px;
//         color: #fff;
//         font-size: 1.1rem;
//         transition: .5s ease;
//         cursor: pointer;

//         &:active { transform: scale(.9, .9); }
//       }
//     }

//     .search-column {
//       display: flex;
//       flex-direction: column;
//       margin-bottom: 20px;

//       .search-input {
//         border: none;
//         border: 1px solid #404040;
//         border-radius: 5px;
//         padding: 10px 10px;
//         color: #404040;
//         font-size: 15px;

//         &:focus {
//           box-shadow: 0 0 5px #2a376888
//         }
//       }

//       .search-input-short { width: 260px; }
//       .search-input-long { width: 410px; }
//     }
//   }
// `;

const SearchAddressInput = memo(({ title, onClick, zonecode, address, onChange, sendName, sendContact, sendAddress2 }) => {
  return (
    <div className="search-wrap">
      <h3>{title}</h3>
      <div className="search-row">
        <div className="search-column">
          <label htmlFor="">이름 *</label>
          <input
            className="search-input search-input-middle"
            type="text"
            name={sendName}
            value={sendName}
            placeholder="이름"
            onChange={onChange}
          />
        </div>
        <div className="search-column">
          <label htmlFor="">연락처 *</label>
          <input
            className="search-input search-input-middle"
            type="text"
            name={sendContact}
            value={sendContact}
            placeholder='" - " 빼고 입력해주세요.'
            onChange={onChange}
          />
        </div>
      </div>
      <div className="search-row">
        <div className="search-column">
          <label htmlFor="">주소 *</label>
          <input
            className="search-input search-input-long"
            type="text"
            name="address1"
            value={address}
            placeholder="주소"
            onChange={onChange}
            readOnly
          />
        </div>
        <button type="button" onClick={onClick}>
          주소검색
        </button>
      </div>
      <div className="search-row">
        <div className="search-column">
          <label htmlFor="">우편번호</label>
          <input
            className="search-input search-input-short"
            type="text"
            name="zonecode"
            value={zonecode}
            placeholder="우편번호"
            onChange={onChange}
            readOnly
          />
        </div>
        <div className="search-column">
          <label htmlFor="">상세주소 *</label>
          <input
            className="search-input search-input-long"
            type="text"
            name="address2"
            value={sendAddress2}
            placeholder={'상세주소'}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
});

export default SearchAddressInput;
