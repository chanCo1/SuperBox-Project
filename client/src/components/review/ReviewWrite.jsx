/**
 * 고객 후기 작성 페이지
 */

/** 패키지 참조 */
import React, { memo, useRef, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import { Input } from '../reception/TagBox';
import ToastEditor from '../ToastEditor';

import RegexHelper from '../../libs/RegexHelper';
import { postReview } from '../../slices/ReviewSlice';

/**
 * 후기 작성 함수 시작
 */
const ReviewWrite = memo(() => {
  // 리덕스의 디스패치 사용
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Store를 통해 user 상태값 호출 */
  const { memberData, loading, isLogin } = useSelector((state) => state.user);

  // 백엔드에 보낼 이미지 상태값
  const [uploadImg, setUploadImg] = useState([]);

  /** 후기작성 상태값 관리 */
  const [review, setReview] = useState({});
  // console.log(review);

  // 새로고침 했을 때 값이 안들어가는 현상 해결
  useEffect(() => {
    memberData &&
      setTimeout(() => {
        setReview({
          head: '',
          title: '',
          content: '',
          img: null,
          name: isLogin ? memberData?.user_name : '',
          user_no: isLogin ? memberData?.user_no : '',
        });
      });
  }, [memberData, isLogin]);

  /** input 입력값 저장 */
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      setReview({ ...review, [name]: value });
    },
    [review]
  );

  // 자식컴포넌트에서 받은 이미지 url 배열을 백엔드에 전달할 useState에 저장
  useEffect(() => {
    setReview({ ...review, img: JSON.stringify(uploadImg) });
  }, [uploadImg, setReview]);

  /** 뒤로가기 버튼 눌렀을 때 확인 */
  const onPrevClick = useCallback(
    (e) => {
      e.preventDefault();

      Swal.fire({
        icon: 'question',
        iconColor: '#f3b017',
        text: '정말 목록페이지로 돌아갈까요?',
        showCancelButton: true,
        confirmButtonText: '네!',
        confirmButtonColor: '#f3b017',
        cancelButtonText: '아니요',
        footer: '작성하신 내용은 저장되지 않습니다.',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/review');
        }
      });
    },
    [navigate]
  );

  /** 글쓰기 버튼의 submit 이벤트 발생 시 */
  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const current = e.target;

    try {
      RegexHelper.value(current.head, '말머리를 선택해주세요.');

      RegexHelper.value(current.title, '제목을 입력해주세요');
      RegexHelper.inputCheck(current.title, '제목은 40자 내로 입력해주세요');

      if (review.content === '') {
        Swal.fire({
          icon: 'error',
          iconColor: '#f3b017',
          text: '내용을 입력해주세요',
          confirmButtonText: '확인',
          confirmButtonColor: '#f3b017',
        });
      };

      Swal.fire({
        icon: 'success',
        iconColor: '#f3b017',
        text: '후기가 등록되었습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        dispatch(postReview(review));
        navigate('/review');
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.message,
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        // focus가 풀리는 문제를 setTimeout으로 해결
        setTimeout(() => {
          err.field.focus();
          err.field.style.boxShadow = '0 0 5px #ff0000';
        }, 300);
      });
    }
  }, [review, dispatch, navigate]);

  return (
    <div>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 후기작성'} />
      <PageTitle
        title={'후기 작성'}
        subtitle={'저희 서비스를 이용하시고 생생한 후기를 공유해 주세요'}
      />

      <ReviewAddContainer>
        <div className="page-subtitle">
          <p>새 글 쓰기</p>
        </div>

        <form className="review-content" onSubmit={onSubmit}>
          <div className="review-wrap">
            <div className="review-container">
              <div className="review-row">
                <label htmlFor="">
                  말머리<span>*</span>
                </label>
                <select name="head" className="review-input" onChange={onChange}>
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
                  placeholder={'최대 40자 이하로 입력해주세요'}
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

              <ToastEditor
                review={review}
                setReview={setReview}
                setUploadImg={setUploadImg}
              />
        
            </div>
          </div>
          <div className="btn-area">
            <button onClick={onPrevClick}>뒤로가기</button>
            <button className="submit-btn" type="submit">
              글쓰기
            </button>
          </div>
        </form>
      </ReviewAddContainer>
    </div>
  );
});

export default ReviewWrite;

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
      /* textarea {
        min-height: 350px;
        resize: none;
        padding: 30px !important;
      } */
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

  .toastui-editor-defaultUI {
    &:focus-within {
      box-shadow: 0 0 5px #2a376888;
    }
  }
`;
