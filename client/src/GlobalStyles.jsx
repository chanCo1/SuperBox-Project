/**
 * @filename: GlobalStyles.jsx
 * @author: 박찬우
 * @description: 전역으로 적용될 기본 스타일시트.
 *               이 파일에서 정의한 class는 ReactJSX에서 className속성으로 참조해야 한다.
 */

/** 패키지 참조 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Roboto', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a { 
    text-decoration: none; 
    color: #404040;
  }

  /* html, body { overflow-x: hidden; } */

  input, select, textarea { outline: none; }

  textarea { resize: none; }

  li, ul, li { list-style: none; }
`;

export default GlobalStyles;