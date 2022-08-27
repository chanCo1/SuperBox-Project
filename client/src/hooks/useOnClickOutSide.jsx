import { useEffect } from "react";

/** 모달 밖을 클릭하면 창 사라지게 */
const useOnClickOutSide = (ref, handler) => {
  useEffect(() => {
    const listner = (e) => {
      if(!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };

    document.addEventListener('mousedown', listner);
    document.addEventListener('touchStart', listner);

    return () => {
      document.removeEventListener('mousedown', listner);
      document.removeEventListener('touchStart', listner);
    };
  }, [ref, handler]);
};

export default useOnClickOutSide;