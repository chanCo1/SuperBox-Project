/** 패키지 참조 */
import React, { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import BoxSize from '../components/reception/BoxSize';
import { ReverseSlideUpDown } from '../utils/Event';

// 기타 이미지 및 아이콘
import { TbZoomQuestion } from 'react-icons/tb';
import arrow_down from '../assets/image/arrow_down.png';

/** 
 * FAQ 페이지 시작 
 */
const FaqPage = memo(() => {

  const [priceArrow, setPriceArrow] = useState(true);
  const [testArrow, setTestArrow] = useState(true);

  const priceRef = useRef();
  const priceIconRef = useRef();
  const testRef = useRef();
  const arrowIconRef = useRef();

  return (
    <div>
      <Meta title={'SuperBox :: 자주 찾는 질문'} />
      <PageTitle title={'자주 찾는 질문'} subtitle={'자주 찾으시는 질문은 여기에 모여있어요'} />

      <FaqPageContainer>
        <div className='faq-wrap'>
          <div className='faq-question' onClick={(e) => ReverseSlideUpDown(testRef, testArrow, setTestArrow, arrowIconRef)}>
            <TbZoomQuestion className='question-icon' />
            <p>자주찾는질문자주찾는질문자주찾는질문</p>
            <img src={arrow_down} alt="arrow_button" ref={arrowIconRef}/>
          </div>
          <div className='faq-answer' ref={testRef}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus facere sequi rem, esse nulla exercitationem iure expedita quidem blanditiis qui molestiae excepturi ratione corporis deleniti dolores nisi saepe nostrum tenetur?
          </div>
        </div>
        <div className='faq-wrap'>
          <div className='faq-question' onClick={(e) => ReverseSlideUpDown(testRef, testArrow, setTestArrow, arrowIconRef)}>
            <TbZoomQuestion className='question-icon' />
            <p>자주찾는질문자주찾는질문자주찾는질문</p>
            <img src={arrow_down} alt="arrow_btn" ref={arrowIconRef}/>
          </div>
          <div className='faq-answer' ref={testRef}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus facere sequi rem, esse nulla exercitationem iure expedita quidem blanditiis qui molestiae excepturi ratione corporis deleniti dolores nisi saepe nostrum tenetur?
          </div>
        </div>
        <div className='faq-wrap'>
          <div className='faq-question' onClick={(e) => ReverseSlideUpDown(priceRef, priceArrow, setPriceArrow, priceIconRef)}>
            <TbZoomQuestion className='question-icon' />
            <p>이용 요금은 어떻게 되나요?</p>
            <img src={arrow_down} alt="arrow_btn" ref={priceIconRef}/>
          </div>
          <div className='faq-answer' ref={priceRef}>
            <BoxSize />
            <ul className='faq-list'>
              <li>* 타권역 추가요금 0원</li>
              <li>* 제주도 할증 요금 3000원</li>
              <li>* 도서산간 할증 요금 4000원</li>
              <li>* 물품가격 50만원 이상일 경우, 고액할증료 2000원 추가</li>
            </ul>
          </div>
        </div>

        <hr />

        <div className='more-question'>
          <p>다른 궁금증이 있으신가요?</p>
          <p>1:1 문의로 알려주세요.</p>
          <p>친절히 안내 해드릴께요.</p>
          <Link to={'/customer/inquiry'}>
            <button className='inquiry-btn'>1:1 문의 하기</button>
          </Link>
        </div>
      </FaqPageContainer>
    </div>
  );
});

export default FaqPage;


/** 스타일 */
const FaqPageContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 90px;

  .faq-wrap {
    color: #404040;
    transition: .4s ease-in-out;
    
    .faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1000px;
      height: 50px;
      margin: 0 auto;
      cursor: pointer;
      border-radius: 15px;

      &:hover {
        background-color: #f7f8fb;
      }

      .question-icon {
        color: #f3b017;
        font-size: 30px;
        margin-left: 10px;
      }

      p {
        font-size: 20px;
        width: 90%;
      }

      img {
        margin-right: 20px;
        width: 15px;
        opacity: .4;
        cursor: pointer;
        transition: .5s ease;

      }
      /* .arrow-active { transform: rotate(180deg); } */
    }

    .faq-answer {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 900px;
      margin: 20px auto;
      transition: 0.4s ease-out;
      max-height: 0;
      overflow: hidden;

      .faq-list {
        position: relative;
        margin-top: 40px;
        left: -29%;
      }
    }
  }

  hr { 
    margin: 90px auto;
    opacity: .5;
  }

  .more-question {
    width: 1100px;
    margin: 0 auto;

    p {
      color: #404040;
      
      &:nth-child(1) {
        font-size: 2rem;
        font-weight: 500;
        padding-bottom: 20px;
      }

      &:nth-child(2) {
        font-size: 1.4rem;
      }

      &:nth-child(3) {
        padding-bottom: 40px;
      }
    }
  }

  .inquiry-btn {
    width: 33%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: #404040;
    border: 1px solid #f3b017;
    background-color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    transition: .3s ease;

    &:hover {
      background-color: #f3b017;
      color: #fff;
    }
    &:active { transform: scale(.9, .9); }
  }
`;