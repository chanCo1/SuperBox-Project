// 원본
const ScrollEvent = (logoRef, receiveTextRef, receiveImgRef, reviewImgRef, reviewTextRef, customerTextRef, customerImgRef, useStartTextRef, useStartBtnRef) => {

  const logo = logoRef.current.style;
  const receiveText = receiveTextRef.current.style;
  const receiveImg = receiveImgRef.current.style;
  const reviewImg = reviewImgRef.current.style;
  const reviewText = reviewTextRef.current.style;
  const customerText = customerTextRef.current.style;
  const customerImg = customerImgRef.current.style;
  const useStartText = useStartTextRef.current.style;
  const useStartBtn = useStartBtnRef.current.style;

  const scrollEvent = window.addEventListener('scroll', e => {
    if(window.scrollY > 250) {
      receiveText.opacity = 1;
      receiveText.transform = 'translateY(0)';
      receiveImg.opacity = 1;
    } else {
      receiveText.opacity = 0;
      receiveText.transform = 'translateY(60px)';
      receiveImg.opacity = 0;
    }

    if(window.scrollY > 350) {
      logo.opacity = 0;
    } else {
      logo.opacity = 1;
    }

    if(window.scrollY > 1000) {
      reviewImg.opacity = 1;
      reviewText.transform = 'translateY(0)';
      reviewText.opacity = 1;
    } else {
      reviewImg.opacity = 0;
      reviewText.transform = 'translateY(60px)';
      reviewText.opacity = 0;
    }

    if(window.scrollY > 1500) {
      customerImg.opacity = 1;
      customerText.transform = 'translateY(0)';
      customerText.opacity = 1;
    } else {
      customerImg.opacity = 0;
      customerText.transform = 'translateY(60px)';
      customerText.opacity = 0;
    }

    if(window.scrollY > 2000) {
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

export default ScrollEvent;
