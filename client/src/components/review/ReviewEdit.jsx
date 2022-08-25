/**
 * 고객 후기 수정 페이지
 */

/** 패키지 참조 */
import React, { memo, useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { putReview } from '../../slices/ReviewSlice';

// 컴포넌트 참조
import Meta from '../../Meta';
import PageTitle from '../PageTitle';
import Spinner from '../Spinner';
import { Input } from '../reception/TagBox';
import EditToastEditor from '../EditToastEditor';

import { ReviewWriteContainer } from '../../styles/ReviewStyle';

import RegexHelper from '../../libs/RegexHelper';

/**
 * 후기 수정
 */
const ReviewEdit = memo(() => {
  // 리덕스
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.review);
  console.log('edit에서 DATA 호출 >>> ',data);

  const navigate = useNavigate();

  // 파라미터값 추출
  const param = useParams();

  /** 기존 후기 상태값 관리 */
  const [reviewOrigin, setReviewOrigin] = useState({});
  console.log(reviewOrigin);

  // // 백엔드에 보낼 이미지 상태값
  // const [uploadImg, setUploadImg] = useState([]);

  /** 페이지가 열림과 동시에 id값에 대한 데이터를 조회하여 상태값에 반영한다. */
  useEffect(() => {
    if(data) {
      const index = data.item.findIndex((e) => e.review_no === parseInt(param.review_no));

      setReviewOrigin({
        review_no: data.item ? data.item[index]?.review_no : null,
        head: data.item ? data.item[index]?.head : null,
        title: data.item ? data.item[index]?.title : null,
        content: data.item ? data.item[index]?.content : null,
        regdate: data.item ? data.item[index]?.regdate : null,
      });
    }
  }, [data, param]);

  /** input 입력값 저장 */
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      setReviewOrigin({ ...reviewOrigin, [name]: value });
    },
    [reviewOrigin]
  );

  // // 자식컴포넌트에서 받은 이미지 url 배열을 백엔드에 전달할 useState에 저장
  // useEffect(() => {
  //   setTimeout(() => {
  //     setReviewOrigin({ ...reviewOrigin, img: JSON.stringify(uploadImg) });
  //   })
  // }, [uploadImg, setReviewOrigin]);

  /** 글쓰기 버튼의 submit 이벤트 발생 시 */
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const current = e.target;

      try {
        RegexHelper.value(current.head, '말머리를 선택해주세요.');

        RegexHelper.value(current.title, '제목을 입력해주세요');
        RegexHelper.inputCheck(current.title, '제목은 40자 내로 입력해주세요');

        if (reviewOrigin.content.trim().length === 0) {
          Swal.fire({
            icon: 'error',
            iconColor: '#f3b017',
            text: '내용을 입력해주세요',
            confirmButtonText: '확인',
            confirmButtonColor: '#f3b017',
          });
        } else {
          Swal.fire({
            icon: 'success',
            iconColor: '#f3b017',
            text: '후기가 수정되었습니다.',
            confirmButtonText: '확인',
            confirmButtonColor: '#f3b017',
          }).then(() => {
            if(reviewOrigin) {
              dispatch(putReview(reviewOrigin));
              // navigate(`/review/${reviewOrigin.review_no}`);
              navigate(-1);
            }
          });
        }
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
    },
    [reviewOrigin, dispatch, navigate]
  );

  /** 뒤로가기 버튼 눌렀을 때 실행 */
  const onPrevClick = useCallback(
    (e) => {
      e.preventDefault();

      Swal.fire({
        icon: 'question',
        iconColor: '#f3b017',
        text: '후기 수정을 취소할까요?',
        showCancelButton: true,
        confirmButtonText: '네!',
        confirmButtonColor: '#f3b017',
        cancelButtonText: '아니요',
        footer: '수정하신 내용은 저장되지 않습니다.',

      }).then((result) => {
        if (result.isConfirmed) {
          // navigate(`/review/${reviewOrigin.review_no}`);
          navigate(-1);
        }
      });
    },
    [navigate]
  );

  return (
    <div>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 후기수정'} />
      <PageTitle
        title={'후기수정'}
        subtitle={'저희 서비스를 이용하시고 생생한 후기를 공유해 주세요!'}
      />

      <ReviewWriteContainer>
        <div className="page-subtitle">
          <h3>수정하기</h3>
        </div>
        {reviewOrigin.head ? (
          <form className="review-content" onSubmit={onSubmit}>
            <div className="review-wrap">
              <div className="review-container">
                <div className="review-row">
                  <label htmlFor="">
                    말머리<span>*</span>
                  </label>
                  <select
                    name="head"
                    className="review-input"
                    defaultValue={reviewOrigin.head}
                    onChange={onChange}
                  >
                    <option value="" disabled>말머리를 선택해주세요</option>
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
                    defaultValue={reviewOrigin.title || ''}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="review-row">
                <label htmlFor="">
                  내용<span>*</span>
                </label>

                <EditToastEditor 
                  reviewContent={reviewOrigin.content}
                  reviewOrigin={reviewOrigin}
                  setReviewOrigin={setReviewOrigin}
                  // setUploadImg={setUploadImg}
                />

              </div>
            </div>
            <div className="btn-area">
              <button onClick={onPrevClick}>취소</button>
              <button className="submit-btn" type="submit">수정하기</button>
            </div>
          </form>
        ) : (
          <div>요청 처리가 만료되었습니다.</div>
        )}
      </ReviewWriteContainer>
    </div>
  );
});

export default ReviewEdit;
