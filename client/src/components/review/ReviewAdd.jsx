/**
 * 고객 후기 작성 페이지
 */

/** 패키지 참조 */
import React, { memo, useRef, useCallback, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import { Input } from '../reception/TagBox';
import ToastEditor from '../ToastEditor';

/** 스타일 */
const ReviewAddContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
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

  .review-content {
    position: relative;
    padding: 50px;
    color: #404040;

    .review-wrap {
      .review-container {
        width: 50%;
      }

      .review-row {
        display: flex;
        flex-direction: column;

        label {
          font-size: 1.2rem;
          margin-bottom: 5px;

          span {
            font-size: 1em;
            color: #f3b017;
            margin-left: 5px;
          }
        }

        .review-input {
          border: none;
          border-radius: 5px;
          border: 1px solid #ddd;
          padding: 10px;
          color: #404040;
          margin-bottom: 30px;
          font-size: 1rem;

          &::-webkit-input-placeholder {
            color: #999;
          }
          &:focus {
            box-shadow: 0 0 5px #2a376888;
          }
        }
      }
      textarea {
        min-height: 350px;
        resize: none;
        padding: 30px !important;
      }
    }

    .btn-area {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;

      button {
        padding: 5px 15px;
        margin: 0 0 0 10px;
        border: 1px solid #f3b017;
        background-color: #fff;
        color: #404040;
        border-radius: 10px;
        font-size: 1.1rem;
        cursor: pointer;
      }

      .submit-btn {
        color: #fff;
        background-color: #f3b017;
      }
    }
  }
`;

const ReviewAdd = memo(() => {

  const editorRef = useRef();
  // console.log(editorRef);

  /**
   * 후기작성 상태값 관리
   */
  const [review, setReview] = useState({
    title: '',
    content: '',
  });
  console.log(review);

  /** input 입력값 저장 */
  const onChange = useCallback((e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  }, [review]);

  return (
    <div>
      {/* <Spinner visible={loading} /> */}
      <Meta title={'SuperBox :: 후기작성'} />
      <PageTitle
        title={'후기 작성'}
        subtitle={'저희 서비스를 이용하시고 생생한 후기를 공유해 주세요'}
      />

      <ReviewAddContainer>
        <div className="page-subtitle">
          <p>새 글 쓰기</p>
        </div>

        <form className="review-content">
          <div className="review-wrap">
            <div className="review-container">
              <div className="review-row">
                <label htmlFor="">
                  말머리<span>*</span>
                </label>
                <select name="type" className="review-input">
                  <option value="">말머리를 선택해주세요</option>
                  <option value="좋아요">좋아요</option>
                  <option value="그냥그래요">그냥그래요</option>
                  <option value="별로예요">별로예요</option>
                </select>

                <Input
                  label={'제목'}
                  require={'*'}
                  className1="review-row"
                  className2="review-input"
                  type={'text'}
                  name={'title'}
                  placeholder={'최대 20자 이하로 입력해주세요'}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="review-row">
              <label htmlFor="">
                내용<span>*</span>
              </label>
              {/* <textarea
                className="review-input"
                type="text"
                name="content"
                placeholder="내용을 입력해주세요"
                // onChange={onChange}
              /> */}
              <ToastEditor review={review} setReview={setReview} />
            </div>
          </div>
          <div className="btn-area">
            <Link to={'/review'}>
              <button>뒤로가기</button>
            </Link>
            <button className="submit-btn" type="submit">
              글쓰기
            </button>
          </div>
        </form>
      </ReviewAddContainer>
    </div>
  );
});

export default ReviewAdd;
