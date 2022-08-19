/**
 * 1:1 문의 페이지
 */

/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { postInquiry } from '../slices/InquirySlice'; 

// 컴포넌트 참조
import Meta from '../Meta';
import PageTitle from '../components/PageTitle';
import { Input } from '../components/reception/TagBox';
import ImageUpload from '../components/inquiry/ImageUpload';
import Spinner from '../components/Spinner';

import RegexHelper from '../libs/RegexHelper';

// 이미지 참조
import inquiryCharacter from '../assets/image/inquiry-character.png';

/** 스타일 */
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
        width: 60%;
        text-align: center;
        
        img { 
          width: 50%;;
        }
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
        border: 1px solid #ddd;
        padding: 10px;
        color: #404040;
        font-size: 1rem;

        &::-webkit-input-placeholder { color: #bcbcbc; }
        &:focus { box-shadow: 0 0 5px #2a376888; }
      }

      textarea {
        min-height: 350px;
        resize: none;
        padding: 30px !important;
      }
    }

    .submit-btn {
      position: relative;
      left: 50%;
      transform: translate(-50%);
      right: 0px;
      width: 35%;
      font-size: 1.3rem;
      color: #404040;
      padding: 10px 40px;
      margin-top: 50px;
      border-radius: 10px;
      border: 1px solid #f3b017;
      background-color: #fff;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background-color: #f3b017;
        color: #fff;
      }
      /* &:active { transform: scale(0.9, 0.9); } */
    }
  }
`;

const InquiryPage = memo(() => {

  // 리덕스의 디스패치 사용
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Store를 통해 user 상태값 호출 */
  const { memberData, loading, isLogin } = useSelector((state) => state.user);

  // 백엔드에 보낼 이미지 상태값
  const [uploadImg, setUploadImg] = useState();

  // 이미지 첨부 확인 여부
  const [confirm, setConfirm] = useState(false);

  /**
   * 1:1문의 입력 상태값 관리
   */
  const [inquiry, setInquiry] = useState({});
  // console.log(inquiry);

  // 새로고침 했을 때 값이 안들어가는 현상 해결
  useEffect(() => {
    memberData && setTimeout(() => {
      setInquiry({
        type: '',
        title: '',
        name: isLogin ? memberData?.user_name : '',
        email: isLogin ? memberData?.user_email : '',
        contact: isLogin ? memberData?.user_phone : '',
        content: '',
        img: null,
        user_no: isLogin ? memberData?.user_no : '',
      })
    });
  }, [memberData, isLogin]);

  useEffect(() => {
    setInquiry({ ...inquiry, img: uploadImg });

  }, [uploadImg, setInquiry]);

  // 문의 입력 값 갱신
  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const { name, value } = e.target;
      setInquiry({ ...inquiry, [name]: value });
    },
    [inquiry]
  );

  // 문의하기 버튼의 submit 이벤트 발생시
  const onSubmit = useCallback( async (e) => {
    e.preventDefault();

    const current = e.target;

    // 유효성 검사
    try {
      RegexHelper.value(current.type, '문의 유형을 선택해주세요');

      RegexHelper.value(current.title, '문의 제목을 입력해주세요');
      RegexHelper.inputCheck(current.title, '문의 제목은 2~20자 내로 입력해주세요. 한글 초성은 입력할 수 없습니다.');

      RegexHelper.value(current.name, '이름을 입력해주세요');
      RegexHelper.nameCheck(current.name, '이름은 2~10자리의 영문(소문자), 한글만 가능합니다.');

      RegexHelper.value(current.email, '이메일 주소를 입력해주세요');
      RegexHelper.emailCheck(current.email, '이메일 형식에 맞지 않습니다.');

      RegexHelper.value(current.contact, '연락처를 입력해주세요');
      RegexHelper.phone(current.contact, "전화번호 형식이 아닙니다. ' - '이 있다면 빼고 입력해주세요.");

      RegexHelper.value(current.content, '문의 내용을 입력해주세요');

      Swal.fire({
        icon: 'success',
        iconColor: '#f3b017',
        text: '1:1문의 등록이 완료되었습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      }).then(() => {
        dispatch(postInquiry(inquiry));
        navigate('/mypage');
      })

    } catch(err) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: err.message,
        confirmButtonColor: '#f3b017',
      }).then(() => {
        setTimeout(() => {
          err.field.focus();
          err.field.style.boxShadow = '0 0 5px #ff0000';

          // setTimeout(() => {
          //   err.field.style.boxShadow = 'none';
          // }, 2000);
        }, 300);
      });

      return;
    };

    if(confirm) {
      Swal.fire({
        icon: 'error',
        iconColor: '#f3b017',
        text: '이미지 사용 여부를 확인해주세요',
        confirmButtonColor: '#f3b017',
      })
    };
    
  }, [dispatch, inquiry, navigate, confirm]);

  return (
    <div>
      <Spinner visible={loading} />
      <Meta title={'SuperBox :: 1:1 문의'} />
      <PageTitle
        title={'1:1 문의'}
        subtitle={'궁금하신게 있으시면 1:1문의로 알려주세요'}
      />

      <InquiryContainer>
        <div className="page-subtitle">
          <p>1:1 문의</p>
        </div>

        <form className="inquiry-content" onSubmit={onSubmit}>
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
                label={'문의 제목'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'text'}
                name={'title'}
                placeholder={'최대 20자 이하로 입력해주세요'}
                onChange={onChange}
              />
              <Input
                label={'이름'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'text'}
                name={'name'}
                placeholder={'영문(소문자), 한글만 입력해주세요.'}
                defaultValue={isLogin ? memberData?.user_name : ''}
                onChange={onChange}
              />
              <Input
                label={'이메일 주소'}
                require={'*'}
                className1="inquiry-row"
                className2="inquiry-input"
                type={'email'}
                name={'email'}
                placeholder={'형식에 맞게 이메일 주소를 입력해주세요'}
                defaultValue={isLogin ? memberData?.user_email : ''}
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
                defaultValue={isLogin ? memberData?.user_phone : ''}
                onChange={onChange}
              />
            </div>

            <div className="inquiry-icon">
              <img src={inquiryCharacter} alt="1:1문의 캐릭터" />
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

          <ImageUpload setUploadImg={setUploadImg} setConfirm={setConfirm} />

          <button className='submit-btn' type="submit">문의하기</button>
        </form>
      </InquiryContainer>
    </div>
  );
});

export default InquiryPage;
