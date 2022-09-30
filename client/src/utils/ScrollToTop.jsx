/**
 * react-router 사용시 페이지 이동함에도 스크롤이 제자리에 있는 문제 해결
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  console.log(pathname)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};