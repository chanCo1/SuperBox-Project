/** 패키지 참조 */
import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import { Input } from '../components/reception/TagBox';

// import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { RiQuestionnaireLine } from 'react-icons/ri';
import faq from '../assets/image/faq.png';

const InquiryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  /* border: 1px solid #999; */
  border-radius: 11px;
  margin-bottom: 50px;
  box-shadow: 0px 0px 10px #00000027;

  .page-subtitle {
    padding: 10px 40px;
    background-color: #2a3768;
    color: #fff;
    font-size: 1.5rem;
    border-radius: 10px 10px 0 0;
  }

  .inquiry-content {
    position: relative;
    padding: 50px;
    color: #404040;

    .inquiry-container {
      position: relative;
      display: flex;

      .inquiry-wrap {
        width: 50%;
      }

      .inquiry-icon {
        position: relative;
        font-size: 20rem;
        width: 60%;
        color: #2a3768;
        display: flex;
        justify-content: center;
        align-items: center;

        img { width: 100%; }
      }
    }

    .inquiry-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      label {
        font-size: 1.2rem;
        margin-bottom: 5px;

        span {
          font-size: 1em;
          color: #f3b017;
          margin-left: 5px;
        }
      }

      .inquiry-input {
        border: none;
        border-radius: 5px;
        border: 1px solid #bcbcbc;
        padding: 10px;
        color: #404040;
        font-size: 15px;

        &::-webkit-input-placeholder { color: #bcbcbc; }
        &:focus { box-shadow: 0 0 5px #2a376888; }
      }

      textarea {
        min-height: 350px;
        resize: none;
        padding: 30px !important;
      }
    }

    button {
      position: relative;
      /* left: 50%; */
      text-align: center;
      width: 30%;
      font-size: 1.3rem;
      color: #404040;
      padding: 10px 40px;
      border-radius: 10px;
      border: 1px solid #f3b017;
      background-color: #fff;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        background-color: #f3b017;
        color: #fff;
      }
      &:active { transform: scale(0.9, 0.9); }
    }
  }
`;

const InquiryPage = memo(() => {
  /**
   * 문의 입력 상태값 관리
   */
  const [inquiry, setInquiry] = useState({
    type: '',
    title: '',
    name: '',
    email: '',
    contact: '',
    content: '',
  });
  console.log(inquiry);

  // 문의 입력 값 갱신
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      setInquiry({ ...inquiry, [name]: value });
    },
    [inquiry]
  );

  return (
    <div>
      <Meta title={'SuperBox :: 1:1 문의'} />
      <PageTitle
        title={'1:1 문의'}
        subtitle={'궁금하신게 있으시면 1:1문의로 알려주세요.'}
      />

      <InquiryContainer>
        <div className="page-subtitle">
          <h4>1:1 문의</h4>
        </div>

        <form className="inquiry-content">
          <div className="inquiry-container">
            <div className="inquiry-wrap">
              <div className="inquiry-row">
                <label htmlFor="">
                  문의 유형<span>*</span>
                </label>
                <select name="type" className="inquiry-input" onChange={onChange}>
                  <option value="">선택하세요</option>
                  <option value="배송 문의">배송 문의</option>
                  <option value="요금 문의">요금 문의</option>
                  <option value="회원 정보">회원 정보</option>
                  <option value="기타 문의">기타 문의</option>
                </select>
              </div>

              <Input
                label={'문의제목'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'text'}
                name={'title'}
                placeholder={'문의 제목을 입력해주세요'}
                onChange={onChange}
              />
              <Input
                label={'이름'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'text'}
                name={'name'}
                placeholder={'이름을 입력해주세요'}
                defaultValue={''}
                onChange={onChange}
              />
              <Input
                label={'이메일 주소'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'email'}
                name={'email'}
                placeholder={'이메일 주소를 입력해주세요'}
                defaultValue={''}
                onChange={onChange}
              />
              <Input
                label={'연락처'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'text'}
                name={'contact'}
                placeholder={"' - ' 빼고 입력해주세요"}
                defaultValue={''}
                onChange={onChange}
              />
            </div>

            <div className="inquiry-icon">
              <img src={faq} alt="1:1문의 로고" />
            </div>
          </div>

          <div className="inquiry-row">
            <label htmlFor="">
              문의 내용<span>*</span>
            </label>
            <textarea
              className="inquiry-input"
              type="text"
              name="content"
              placeholder="문의 하실 내용을 입력해주세요"
              onChange={onChange}
            />
          </div>

          <button type="submit">문의하기</button>
        </form>
      </InquiryContainer>
    </div>
  );
});

export default InquiryPage;
