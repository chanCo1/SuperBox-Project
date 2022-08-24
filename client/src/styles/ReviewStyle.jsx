/**
 * 후기 작성 및 수정 페이지 스타일
 */

import styled from "styled-components";

export const ReviewWriteContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  border-radius: 11px;
  margin-bottom: 50px;
  box-shadow: 0px 0px 10px #00000027;

  p {
    font-size: 16px;
  }

  .page-subtitle {
    padding: 10px 40px;
    background-color: #2a3768;
    color: #fff;
    font-size: 1.3rem;
    border-radius: 10px 10px 0 0;

    h3 {
      font-weight: 400;
    }
  }

  .review-content {
    position: relative;
    padding: 50px;
    color: #404040;

    .review-wrap {
      .review-container { width: 50%; }

      .review-row {
        display: flex;
        flex-direction: column;

        label {
          font-size: 1.2rem;
          margin-bottom: 5px;

          span {
            font-size: 1em;
            color: #f3b017;
            margin-left: 5px;
          }
        }

        .review-input {
          border: none;
          border-radius: 5px;
          border: 1px solid #ddd;
          padding: 10px;
          color: #404040;
          margin-bottom: 30px;
          font-size: 1rem;

          &::-webkit-input-placeholder { color: #999; }
          &:focus { box-shadow: 0 0 5px #2a376888; }
        }
      }
    }

    .btn-area {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;

      button {
        padding: 5px 15px;
        margin-left: 20px;
        border: 1px solid #f3b017;
        background-color: #fff;
        color: #404040;
        border-radius: 10px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: .2s ease;

        &:active {
          transform: scale(.9, .9);
        }
      }

      .submit-btn {
        color: #fff;
        background-color: #f3b017;
      }
    }
  }

  .toastui-editor-defaultUI {
    &:focus-within { box-shadow: 0 0 5px #2a376888; }
  }
`;