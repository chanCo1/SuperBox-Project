/**
 * 고객 후기 작성 페이지
 */

/** 패키지 참조 */
import React, { memo, useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import { Input } from '../reception/TagBox';
import ToastEditor from '../ToastEditor';
import { ReviewWriteContainer } from '../../styles/ReviewStyle';

import RegexHelper from '../../libs/RegexHelper';
import { postReview } from '../../slices/ReviewSlice';

/**
 * @description 후기 작성
 * @param memberData 로그인한 사용자 정보 /App.jsx
 * @param loading 로딩상태 /App.jsx
 * @param isLogin 로그인 상태 /App.jsx
 */
const ReviewWrite = memo(({ memberData, loading, isLogin }) => {
  // 리덕스의 디스패치 사용
  const dispatch = useDispatch();

  const { data, error } = useSelector(state => state.review);

  const navigate = useNavigate();

  // // 백엔드에 보낼 이미지 상태값
  // const [uploadImg, setUploadImg] = useState([]);

  /** 후기작성 상태값 관리 */
  const [review, setReview] = useState({});

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
          profile_img: isLogin ? memberData?.profile_img : null,
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

  // // 자식컴포넌트에서 받은 이미지 url 배열을 백엔드에 전달할 useState에 저장
  // useEffect(() => {
  //   setReview({ ...review, img: JSON.stringify(uploadImg) });
  // }, [uploadImg, setReview]);

  /** 뒤로가기 버튼 눌렀을 때 실행 */
  const onPrevClick = useCallback(
    (e) => {
      e.preventDefault();

      Swal.fire({
        icon: 'question',
        iconColor: '#f3b017',
        text: '후기 작성을 취소할까요?',
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

      if (review.content.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          iconColor: '#f3b017',
          text: '내용을 입력해주세요',
          confirmButtonText: '확인',
          confirmButtonColor: '#f3b017',
        });
      } else {

        dispatch(postReview(review));

        Swal.fire({
          icon: 'success',
          iconColor: '#f3b017',
          text: '후기가 등록되었습니다.',
          showConfirmButton: false,
          timer: 1500,
          footer: '소중한 후기 고마워요! 👍',
        }).then(() => {
          navigate('/review');
        });
      };

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
        title={'후기작성'}
        subtitle={'저희 서비스를 이용하시고 생생한 후기를 공유해 주세요!'}
      />

      <ReviewWriteContainer>
        <div className="page-subtitle">
          <h3>새 글 쓰기</h3>
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
                  placeholder={'제목을 입력해주세요'}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="review-row">
              <label htmlFor="">
                내용<span>*</span>
              </label>

              <ToastEditor
                review={review}
                setReview={setReview}
                // setUploadImg={setUploadImg}
              />
        
            </div>
          </div>
          <div className="btn-area">
            <button onClick={onPrevClick}>취소</button>
            <button className="submit-btn" type="submit">
              글쓰기
            </button>
          </div>
        </form>
      </ReviewWriteContainer>
    </div>
  );
});

export default ReviewWrite;