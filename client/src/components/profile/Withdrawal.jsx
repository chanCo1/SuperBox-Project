/** 패키지 참조 */
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setIsLogin } from '../../slices/UserSlice';

import { GrCircleAlert } from 'react-icons/gr';

/**
 * @description 회원탈퇴 컴포넌트
 * @param memberData 로그인한 사용자 정보 from MyPage.jsx
 */
const Withdrawal = memo(({ memberData }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 회원탈퇴 */
  const onWithdrawalUSer = useCallback((e) => {
    Swal.fire({
      icon: 'question',
      iconColor: '#f3b017',
      text: '정말 탈퇴 하시겠어요?',
      showCancelButton: true,
      confirmButtonText: '네',
      confirmButtonColor: '#f3b017',
      cancelButtonText: '아니요',
    }).then((result) => {
      if(result.isConfirmed) {
        (async () => {
          try {
            await axios.delete('/api/users/withdrawal', {
              params: { user_no: memberData?.user_no }
            });

            // 로컬스토리지 삭제
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            // 로그인상태 false로 변경
            dispatch(setIsLogin(false));

            Swal.fire({
              icon: 'success',
              iconColor: '#f3b017',
              text: '탈퇴가 정상적으로 처리되었습니다',
              confirmButtonText: '확인',
              confirmButtonColor: '#f3b017',
              footer: '이용해주셔서 감사합니다 😁'
            }).then(() => {
              navigate('/main');
            });

          } catch(err) {
            console.log(err);
            Swal.fire({
              icon: 'error',
              iconColor: '#f3b017',
              text: '탈퇴 처리 중 장애가 발생했습니다',
              confirmButtonText: '확인',
              confirmButtonColor: '#f3b017',
            });
          }
        })();
      }
    });
  }, [dispatch, navigate, memberData]);

  return (
    <WithdrawalContainer>
      <p>
        <GrCircleAlert style={{ marginRight: '5px' }} />
        회원탈퇴를 원하시면&nbsp;
        <span className="withdrawal" onClick={onWithdrawalUSer}>여기</span>
        를 눌러주세요.
      </p>
    </WithdrawalContainer>
  );
});

export default Withdrawal;

/** 회원탈퇴 스타일 */
const WithdrawalContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 1200px;
  margin: 30px auto;

  & > p {
    display: flex;
    align-items: center;

    .withdrawal {
      color: #5050fd;
      cursor: pointer;
  
      &:hover { text-decoration: underline; }
    }
  }

`;
