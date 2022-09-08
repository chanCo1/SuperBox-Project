
/** 스크롤에 따라 등장하는 이벤트 */
const ScrollEvent = (
  logoRef,
  receptionTextRef,
  receptionImgRef,
  reviewImgRef,
  reviewTextRef,
  customerTextRef,
  customerImgRef,
  useStartTextRef,
  useStartBtnRef
) => {
  const logo = logoRef.current.style;
  const receptionText = receptionTextRef.current.style;
  const receptionImg = receptionImgRef.current.style;
  const reviewImg = reviewImgRef.current.style;
  const reviewText = reviewTextRef.current.style;
  const customerText = customerTextRef.current.style;
  const customerImg = customerImgRef.current.style;
  const useStartText = useStartTextRef.current.style;
  const useStartBtn = useStartBtnRef.current.style;

  const scrollEvent = window.addEventListener('scroll', (e) => {
    // console.log(window.scrollY);
    if (window.scrollY < 100) {
      receptionText.display = 'none';
      receptionImg.display = 'none';
    } else {
      receptionText.display = 'block';
      receptionImg.display = 'block';
    }

    if (window.scrollY > 500) {
      receptionText.opacity = 1;
      receptionText.transform = 'translateY(0)';
      receptionImg.opacity = 1;
      logo.opacity = 0;
    } else {
      receptionText.opacity = 0;
      receptionText.transform = 'translateY(60px)';
      receptionImg.opacity = 0;
      logo.opacity = 1;
    }

    if (window.scrollY > 1100) {
      reviewImg.opacity = 1;
      reviewText.transform = 'translateY(0)';
      reviewText.opacity = 1;
    } else {
      reviewImg.opacity = 0;
      reviewText.transform = 'translateY(60px)';
      reviewText.opacity = 0;
    }

    if (window.scrollY > 1600) {
      customerImg.opacity = 1;
      customerText.transform = 'translateY(0)';
      customerText.opacity = 1;
    } else {
      customerImg.opacity = 0;
      customerText.transform = 'translateY(60px)';
      customerText.opacity = 0;
    }

    if (window.scrollY > 2300) {
      useStartBtn.transform = 'translateY(0)';
      useStartBtn.opacity = 1;
      useStartText.transform = 'translateY(0)';
      useStartText.opacity = 1;
    } else {
      useStartBtn.transform = 'translateY(60px)';
      useStartBtn.opacity = 0;
      useStartText.transform = 'translateY(60px)';
      useStartText.opacity = 0;
    }
  });

  return scrollEvent;
};

/** 
 * 화살표 클릭시 위/아래 슬라이드 이벤트,
 * 보이는거 숨기기 -> css 클래스 활용
 */
const SlideUpDown = (e, ref, arrow, setArrow) => {
  const refStyle = ref.current.style;
  const refArea = ref.current
  const current = e.target;

  setArrow(!arrow);

  if(arrow) {
    current.classList.add('arrow-active');
    refStyle.maxHeight = 0;
    // sendArea.opacity = 0.2;

  } else {
    current.classList.remove('arrow-active');
    // refArea.maxHeight = '100vh';
    refStyle.maxHeight = refArea.scrollHeight + 'px';
    // sendArea.opacity = 1;
  }
};

/** 
 * 화살표 클릭시 위/아래 슬라이드 이벤트,
 * 숨어있는거 보이기 (with arrow icon)
 */
const ReverseSlideUpDown = (ref, arrow, setArrow, icon) => {
  const refStyle = ref.current.style;
  const refArea = ref.current
  const iconStyle = icon.current.style;

  setArrow(!arrow);

  if(arrow) {
    iconStyle.transform = 'rotate(180deg)';
    refStyle.maxHeight = refArea.scrollHeight + 'px';
    
  } else {
    iconStyle.transform = 'rotate(360deg)';
    refStyle.maxHeight = 0;
  }
};

/** 화면에 슬라이드 형식으로 보이게하는 이벤트 */
const ShowSlideItem = (ref) => {
  const refStyle = ref.current.style;
  const refArea = ref.current

  // refStyle.display = 'block';
  refStyle.opacity = 1;
  refStyle.maxHeight = refArea.scrollHeight + 'px';
}

/** 화면에 슬라이드 형식으로 안보이게 하는 이벤트 */
const HideSlideItem = (ref) => {
  const refStyle = ref.current.style;
  const refArea = ref.current

  // refStyle.display = 'none';
  refStyle.maxHeight = 0;
  refStyle.opacity = 0;
}

/** 화면에 보이게하는 이벤트 */
const ShowItem = (ref) => {
  const refStyle = ref.current.style;

  refStyle.display = 'block';
}

/** 화면에 안보이게 하는 이벤트 */
const HideItem = (ref) => {
  const refStyle = ref.current.style;

  refStyle.display = 'none';
}

export { ScrollEvent, SlideUpDown, ReverseSlideUpDown, ShowSlideItem, HideSlideItem, ShowItem, HideItem }