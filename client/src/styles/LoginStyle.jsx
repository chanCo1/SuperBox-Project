import styled from "styled-components";

const LoginPageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
  z-index: 99;

  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 50px 80px;
    background-color: #fff;
    border-radius: 20px;
    border: 1px solid #f3b017;
    color: #404040;

    .close-btn {
      position: absolute;
      top: 7%;
      right: 8%;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;

      &:hover { color: #404040; }
    }

    .login-text {
      margin-bottom: 30px;

      h3 {
        color: #f3b017;
        font-size: 2em;
        font-weight: 500;
      }
      p:nth-child(2) {
        font-size: 2.5rem;
        font-weight: 500;
      }
    }

    .login-input {
      display: flex;
      flex-direction: column;

      .input-with-icon {
        position: relative;
        margin: 10px 0;

        .input-icon {
          position: absolute;
          display: flex;
          top: 15%;
          left: 2%;
          font-size: 1.7rem;
        }

        .input-area {
          width: 100%;
          border: none;
          border-bottom: 2px solid #bcbcbc;
          padding: 10px 20px 10px 40px;
          font-size: 1rem;

          &::-webkit-input-placeholder { color: #bcbcbc; }
          
          &:focus {
            border-color: #404040;
            color: #404040;
          }
        }
      }

      .error-msg {
        position: relative;
        font-size: 12px;
        color: red;
        height: 10px;
      }

      button {
        margin: 30px 0;
        padding: 10px;
        border: none;
        border-radius: 10px;
        color: #fff;
        background-color: #f3b017;
        font-size: 1.1rem;
        cursor: pointer;
        transition: .3s ease;

        &:active { transform: scale(.9, .9); }
      }
    }

    .login-sign-up {
      text-align: center;
      & > p {
        margin: 10px 0;
      }
      & > a {
        color: #999;
        text-decoration: underline;
      }
    }
  }
`;

export default LoginPageContainer;