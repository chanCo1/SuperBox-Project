/** 패키지 참조 */
import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';

// 컴포넌트 참조
import EditProfile from '../profile/EditProfile';

// 아이콘 참조
import { BsMegaphone } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

/**
 * @description 개인정보수정
 */
const MypageProfile = memo(() => {
  /** Store를 통해 user 상태값 호출 */
  const { memberData } = useSelector((state) => state.user);

  // 프로필 수정 상태값
  const [editProfileState, setEditProfileState] = useState(false);

  const onEditProfile = useCallback((e) => {
    setEditProfileState(!editProfileState);
  }, [editProfileState]);

  return (
    <MypageProfileContaier>
      <div className="user-img-wrap">
        <FaUserCircle className="user-img" />
      </div>
      <div className="user-info-container">
        <div className="user-info-top">
          <div className="welcome-user">
            <BsMegaphone style={{ marginRight: '10px' }} />
            <span>{memberData && memberData.user_name}</span>&nbsp;님 반가워요!
          </div>

          {editProfileState ? (
            <div className="edit-wrap">
              <button
                className="edit-profile edit-profile-cancel"
                onClick={onEditProfile}
              >
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
                <p>{memberData.user_name}</p>
              </div>
              <div className="user-info">
                <label>비밀번호</label>
                <p>************</p>
              </div>
              <div className="user-info">
                <label>전화번호</label>
                <p>{memberData.user_phone}</p>
              </div>
            </div>
            <div className="user-info-wrap">
              <div className="user-info">
                <label>우편번호</label>
                <p className="address">{memberData.postcode || ''}</p>
              </div>
              <div className="user-info">
                <label>주소</label>
                <p className="address">{memberData.addr1 || ''}</p>
              </div>
              <div className="user-info">
                <label>상세주소</label>
                <p className="address">{memberData.addr2 || ''}</p>
              </div>
            </div>
          </div>
        ) : (
          <EditProfile />
        )}
      </div>
    </MypageProfileContaier>
  );
});

export default MypageProfile;

const MypageProfileContaier = styled.div`
  position: relative;
  display: flex;
  width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid #bcbcbc;
  padding: 50px 0;
  margin-bottom: 70px;
  color: #404040;

  .user-img-wrap {
    display: flex;
    justify-content: center;
    width: 25%;

    .user-img {
      font-size: 200px;
      color: #bcbcbc;
    }
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

          label {
            width: 100px;
          }
          p {
            display: flex;
            width: 250px;
            align-items: center;
            color: #bcbcbc;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .address {
            width: 350px;
          }
        }
      }
    }
  }
`;