
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
    if (window.scrollY < 100) {
      receptionText.display = 'none';
      receptionImg.display = 'none';
    } else {
      receptionText.display = 'block';
      receptionImg.display = 'block';
    }

    if (window.scrollY > 350) {
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

    if (window.scrollY > 1000) {
      reviewImg.opacity = 1;
      reviewText.transform = 'translateY(0)';
      reviewText.opacity = 1;
    } else {
      reviewImg.opacity = 0;
      reviewText.transform = 'translateY(60px)';
      reviewText.opacity = 0;
    }

    if (window.scrollY > 1500) {
      customerImg.opacity = 1;
      customerText.transform = 'translateY(0)';
      customerText.opacity = 1;
    } else {
      customerImg.opacity = 0;
      customerText.transform = 'translateY(60px)';
      customerText.opacity = 0;
    }

    if (window.scrollY > 2000) {
      useStartBtn.opacity = 1;
      useStartText.transform = 'translateY(0)';
      useStartText.opacity = 1;
    } else {
      useStartBtn.opacity = 0;
      useStartText.transform = 'translateY(60px)';
      useStartText.opacity = 0;
    }
  });

  return scrollEvent;
};

/** 화살표 클릭시 위/아래 슬라이드 이벤트 */
const SlideUpDown = (e, ref, arrow, setArrow) => {
  const refArea = ref.current.style;
  const current = e.target;

  setArrow(!arrow);

  if(arrow) {
    current.classList.add('arrow-active');
    refArea.maxHeight = 0;
    // sendArea.opacity = 0.2;

  } else {
    current.classList.remove('arrow-active');
    refArea.maxHeight = '100vh';
    // sendArea.opacity = 1;
  }
};
const ReverseSlideUpDown = (ref, arrow, setArrow, icon) => {
  const refArea = ref.current.style;
  const iconArea = icon.current.style;
  // const current = e.target;

  setArrow(!arrow);

  if(arrow) {
    iconArea.transform = 'rotate(180deg)';
    refArea.maxHeight = '100vh';
    
  } else {
    iconArea.transform = 'rotate(360deg)';
    // iconArea.classList.remove('arrow-active');
    refArea.maxHeight = 0;
  }
};

/** 화면에 보이게하는 이벤트 */
const ShowItem = (ref) => {
  const refArea = ref.current.style;

  refArea.display = 'block';
}

/** 화면에 안보이게 하는 이벤트 */
const HideItem = (ref) => {
  const refArea = ref.current.style;

  refArea.display = 'none';
}

export { ScrollEvent, SlideUpDown, ReverseSlideUpDown, ShowItem, HideItem }