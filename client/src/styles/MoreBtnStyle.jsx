import styled from "styled-components";

/**
 * 게시판 더보기 버튼 스타일
 */
export const MoreBtnContainer = styled.div`
  position: relative;
  z-index: 9;

  .more-btn {
    font-size: 25px;
    cursor: pointer;
    transition: .2s ease;

    &:active { transform: scale(.8, .8); }
  }

  .more-btn-active {
    position: absolute;
    display: flex;
    width: 110px;
    flex-direction: column;
    top: 10%;
    right: 100%;
    padding: 15px;
    border: 1px solid #f3b017;
    border-radius: 10px;
    color: #999;
    background-color: #fff;
    
    .more-btn-menu {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: .2s ease;

      .icon { margin-right: 2px; }
      &:hover { color: #404040; }
    }

    .more-btn-edit { margin-bottom: 5px; }
    a { color: #999; }
  }
`;