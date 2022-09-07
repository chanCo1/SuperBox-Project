/** 패키지 참조 */
import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../../config/axios';
import Swal from 'sweetalert2';

// 리덕스
import { useSelector, useDispatch } from 'react-redux';
import { putProfileImg } from '../../slices/ProfileSlice';
import { tokenVerify } from '../../slices/UserSlice';
// import { setProfileImg } from '../../slices/UserSlice';

// 컴포넌트 참조
import EditProfile from '../profile/EditProfile';
import Spinner from '../Spinner';

// 아이콘 참조
import { BsMegaphone } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi';

const IMG_URL = process.env.REACT_APP_IMG_URL;

/**
 * @description 개인정보 수정
 * @param memberData 로그인한 사용자 정보 /App.jsx
 */
const MypageProfile = memo(({ memberData }) => {

  const dispatch = useDispatch();

  // 프로필 수정 상태값
  const [editProfileState, setEditProfileState] = useState(false);
  // 보여줄 이미지 상태값 관리
  const [showImgFile, setShowImgFile] = useState('');
  // 이미지 사용 여부 확인을 보여주기 위한 상태값
  const [imgConfirm, setImgConfirm] = useState(false);
  // 업로드할 이미지 주소 상태값
  const [formDataImg, setFormDataImg] = useState('');
  // 백엔드 통신 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // formData 사용
  const formData = new FormData();

  /** 개인정보수정 toggle */
  const onEditProfile = useCallback((e) => {
    e.preventDefault();

    setEditProfileState(!editProfileState);
  }, [editProfileState]);

  /** 프로필 이미지 선택 */
  const fileSelect = useCallback((e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setShowImgFile(URL.createObjectURL(file));

    setFormDataImg(file);
    setImgConfirm(true);
  }, []);

  /** 이미지 선택 취소(삭제) */
  const cancelFile = useCallback(e => {
    e.preventDefault();

    URL.revokeObjectURL(showImgFile);
    setShowImgFile('');
    setImgConfirm(false);
  }, [showImgFile]);

  /** 이미지 업로드 */
  const uploadFile = useCallback( async e => {
    e.preventDefault();

    formData.append('imgFile', formDataImg);
    console.log('업로드파일 .. >>', formData);

    try {
      setIsLoading(true)

      const response = await axios.post('/api/image/upload/single', formData);
      console.log('이미지요청 >>', response);

      dispatch(putProfileImg({
        profile_img: `${IMG_URL}${response.data.filePath.filename}`,
        user_no: memberData?.user_no,
      }));

      dispatch(tokenVerify());
      setImgConfirm(false);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formDataImg, dispatch, memberData]);

  /** 프로필 이미지 삭제 */
  const onDeleteProfileImg = useCallback(e => {
    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '프로필 이미지를 삭제할까요?',
      showCancelButton: true,
      confirmButtonText: '네!',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            await axios.put('/api/profile/deleteProfileImg', {
               user_no: memberData.user_no
            });
          } catch(err) {
            console.log(err);
          }
        })();
      };

      dispatch(tokenVerify());
    })
  }, [memberData?.user_no, dispatch]);

  return (
    <>
      <Spinner visible={isLoading} />
      <MypageProfileContaier>
        <div className="profile-img-wrap">
          {imgConfirm ? (
            <>
              <div className='profile-img-box'>
                <img src={showImgFile} alt="프로필 이미지" className="profile-img" />
              </div>
              <div className='file-confirm'>
                <p>이 이미지를 사용할까요?</p>
                <button className='edit-profile'onClick={uploadFile}>
                  네
                </button>
                <button className='edit-profile edit-profile-cancel' onClick={cancelFile}>
                  아니요
                </button>
              </div>
            </>
          ) : (
            <>
              {memberData?.profile_img ? (
                <div className='profile-img-box'>
                  <img 
                    src={memberData?.profile_img} 
                    alt={`${memberData?.user_name} 프로필 이미지`} 
                    className='profile-img'
                    onClick={onDeleteProfileImg}
                  />
                </div>
              ) : (
                <FaUserCircle className="profile-img-default" />
              )}
              <label
                htmlFor="imageUpload" 
                className='edit-profile-btn' 
                onChange={fileSelect}>프로필 변경

                <input 
                  type="file" 
                  id='imageUpload' 
                  name="imageUpload" 
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </label>
            </>
          )}
        </div>
        <div className="user-info-container">
          <div className="user-info-top">
            <div className="welcome-user">
              <BsMegaphone style={{ marginRight: '10px' }} />
              <span>{memberData && memberData.user_name}</span>&nbsp;님 반가워요!
            </div>

            {editProfileState ? (
              <div className="edit-wrap">
                <button className="edit-profile edit-profile-cancel" onClick={onEditProfile}>
                  취소
                </button>
              </div>
            ) : (
              <button className="edit-profile" onClick={onEditProfile}>
                개인정보수정
              </button>
            )}
          </div>

          {!editProfileState ? (
            <div className="user-info-box">
              <div className="user-info-wrap">
                <div className="user-info">
                  <label>이름</label>
                  <p>{memberData?.user_name || ''}</p>
                </div>
                <div className="user-info">
                  <label>비밀번호</label>
                  {/* <p>************</p> */}
                  <p>{memberData?.user_pw.substring(0,20) || ''}</p>
                </div>
                <div className="user-info">
                  <label>전화번호</label>
                  <p>{memberData?.user_phone || ''}</p>
                </div>
              </div>
              <div className="user-info-wrap">
                <div className="user-info">
                  <label>우편번호</label>
                  <p className="address">{memberData?.postcode || ''}</p>
                </div>
                <div className="user-info">
                  <label>주소</label>
                  <p className="address">{memberData?.addr1 || ''}</p>
                </div>
                <div className="user-info">
                  <label>상세주소</label>
                  <p className="address">{memberData?.addr2 || ''}</p>
                </div>
              </div>
            </div>
          ) : (
            <EditProfile setEditProfileState={setEditProfileState} />
          )}
        </div>
      </MypageProfileContaier>
    </>
  );
});

export default MypageProfile;

/** 마이페이지-개인정보 컴포넌트 스타일 */
const MypageProfileContaier = styled.div`
  position: relative;
  display: flex;
  width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #bcbcbc;
  padding: 50px 0;
  color: #404040;

  .profile-img-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;

    .profile-img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      .profile-img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-bottom: 10px;
  
        &:hover {
          filter: blur(3px);
          cursor: pointer;
        }
      }

      &:hover::before {
        content: '삭제';
        position: absolute;
        z-index: 9;
        color: #fff;
        text-shadow: -1px 0px #000, 0px 1px #000, 1px 0px #000, 0px -1px #000;
        font-size: 18px;
      }
    }

    .profile-img-default {
      font-size: 200px;
      color: #bcbcbc;
      margin-bottom: 10px;
    }

    .file-confirm {
      text-align: center;

      & > p { margin-bottom: 10px; }
      & > button:nth-child(2) { margin-right: 10px; }
    }

    .edit-profile-btn {
      text-decoration: underline;
      transition: .2s ease;
      cursor: pointer;

      &:hover { color: #5050fd; }
    }
  }

  .edit-profile {
    font-size: 14px;
    border: 1px solid #f3b017;
    background-color: #fff;
    border-radius: 10px;
    padding: 5px 10px;
    color: #f3b017;
    cursor: pointer;
    transition: .2s ease;

    &:active { transform: scale(.9, .9); }
  }

  .edit-profile-cancel {
    border: 1px solid #999;
    color: #999;
  }

  .user-info-container {
    display: flex;
    flex-direction: column;
    width: 70%;

    .user-info-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;

      .welcome-user {
        display: flex;
        align-items: center;

        & > span {
          font-size: 20px;
          font-weight: 400;
        }
      }
    }

    .user-info-box {
      display: flex;
      justify-content: space-between;

      .user-info-wrap {
        display: flex;
        flex-direction: column;

        .user-info {
          display: flex;
          border-bottom: 1px solid #bcbcbc;
          padding-bottom: 10px;
          margin-bottom: 20px;

          label { width: 100px; }
          p {
            display: flex;
            font-size: 14px;
            /* flex-wrap: wrap; */
            width: 250px;
            align-items: center;
            color: #bcbcbc;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .address { width: 350px; }
        }
      }
    }
  }
`;