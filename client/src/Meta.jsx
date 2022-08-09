/**
 * @filename: Meta.jsx
 * @author: 박찬우
 * @description: <head>태그 내의 SEO 처리 및 기본 참조 리소스 명시
 */

/** 패키지 참조 */
// React 기본 참조 객체
import React, { memo } from 'react';
// SEO 처리 가능 패키지
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Meta = memo((props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        {/* SEO 태그 */}
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={props.url} />
        {/* <meta property='og:image' content={props.image} /> */}

        {/* 웹폰트 적용을 위한 외부 리소스 참조 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
});

// props에 대한 기본값 설정
Meta.defaultProps = {
  title: 'SuperBox',
  description: '박찬우 포트폴리오 SuperBox 입니다.',
  keywords: 'React, Redux, Portfolio',
  author: '박찬우',
  // image: '기본이미지변수적용',
  url: window.location.href,
};

export default Meta;
