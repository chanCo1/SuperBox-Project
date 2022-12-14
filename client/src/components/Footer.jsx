/** 패키지 참조 */
import React, { memo } from 'react';
import styled from 'styled-components';

import { BsGithub } from 'react-icons/bs';
import { MdTitle, MdEmail, MdPhoneIphone } from 'react-icons/md';

/**
 * @description 페이지 하단 영역 (footer)
 */
const Footer = memo(() => {
  return (
    <FooterContainer>
      <div className="footer-wrap">
        <h1 className="footer-title">SuperBox</h1>

        <div className="footer-link">
          <a
            className="first-item"
            href="https://github.com/chanCo1/SuperBox-Project"
            target={'_blank'}
            rel="noreferrer"
          >
            <div className="icon-title-wrap">
              <BsGithub className="footer-icons" />
              <h4>GITHUB</h4>
            </div>
            <p>https://github.com/chanCo1/SuperBox-Project</p>
          </a>
          <a href="https://chan-co.tistory.com" target={'_blank'} rel="noreferrer">
            <div className="icon-title-wrap">
              <MdTitle className="footer-icons" />
              <h4>BLOG</h4>
            </div>
            <p>https://chan-co.tistory.com</p>
          </a>
        </div>
        <div className="footer-link">
          <div className="first-item">
            <div className="icon-title-wrap">
              <MdEmail className="footer-icons" />
              <h4>EMAIL</h4>
            </div>
            <p>loinsective@naver.com</p>
          </div>
          <div>
            <div className="icon-title-wrap">
              <MdPhoneIphone className="footer-icons" />
              <h4>PHONE</h4>
            </div>
            <p>010-3329-0283</p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
});

export default Footer;

/** Footer 스타일 정의 */
const FooterContainer = styled.div`
  width: 100%;
  /* height: 450px; */
  background-color: #2a3768;

  .footer-wrap {
    position: relative;
    width: 1200px;
    margin: auto;

    @media (max-width: 1200px) {
      width: 80%;
    }
    @media (max-width: 975px) {
      width: 90%;
    }

    .footer-title {
      margin: 0;
      padding: 70px 0;
      color: #f3b017;
      font-size: 50px;
    }

    .footer-link {
      display: flex;
      padding-bottom: 20px;

      @media (max-width: 1200px) {
        width: 80%;
      }
      @media (max-width: 975px) {
        width: 60%;
      }
      @media (max-width: 725px) {
        flex-direction: column;
      }

      .first-item {
        margin-right: 208px;
      }

      div,
      a {
        color: #fff;

        @media (max-width: 1200px) {
          width: 60%;
        }

        .icon-title-wrap {
          display: flex;
          align-items: center;

          .footer-icons {
            font-size: 30px;
            margin-right: 10px;
          }

          h4 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
          }
        }

        p {
          font-size: 20px;
          margin: 10px 0;
          width: 420px;
        }
      }
    }
  }
`;
