/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// 아이콘 참조
import { RiThumbUpFill, RiThumbDownFill, RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri';

/** 
 * 좋아요 구현
 * @props userNo 유저번호/ReviewDetail.jsx
 * @props reviewNo 게시물번호/ReviewDetail.jsx
 */
const Like = memo(({ userNo, reviewNo }) => {

  // 로그인 상태
  const { isLogin } = useSelector(state => state.user);

  // 유저 정보 -> 유저번호와 후기번호
  const [userInfo, setUserInfo] = useState({});
  //좋아요 상태값
  const [likeState, setLikeState] = useState(null);
  console.log('like >>>', likeState)
  //싫어요 상태값
  const [hateState, setHateState] = useState(null);
  console.log('hate >>>', hateState)

  
  // 화면 마운트시 ReviewDetail.jsx로 부터 받은 정보 저장
  useEffect(() => {
    setUserInfo({ user_no: userNo, review_no: reviewNo });
  }, [userNo, reviewNo]);

  // 후기 상세보기 페이지 마운트 시 좋아요 확인
  // -> 좋아요를 누른 상태라면 표시
  useEffect(() => {
    (async () => {
      try {
        /** 좋아요 */
        const likeResponse = await axios.get('/api/like/getlike', {
          params: { user_no: userNo, review_no: reviewNo }
        });
        console.log(likeResponse);

        // 백엔드로부터 받은 값을 map 함수를 사용하여 비교
        // -> 같다면 'like'
        likeResponse?.data?.result.map(v => (
          isLogin && v.user_no === userNo ? setLikeState('like') : null
        ));
        
        /** 싫어요 */
        const hateResponse = await axios.get('/api/like/gethate', {
          params: { user_no: userNo, review_no: reviewNo }
        });
        console.log(hateResponse);

        // 백엔드로부터 받은 값을 map 함수를 사용하여 비교
        // -> 같다면 'hate'
        hateResponse?.data?.result.map(v => (
          isLogin && v.user_no === userNo ? setHateState('hate') : null
        ));

      } catch(err) {
        console.log(err);
      }
    })();
  }, [userNo, reviewNo, isLogin]);

  /** 
   * 좋아요 버튼 클릭 
   */
  const onLikeClick = useCallback(e => {
    if(!isLogin) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#f3b017',
        text:'로그인 후 이용해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      });
      return;
    };  

    if(likeState === null) {
      (async () => {
        try {
          const response = await axios.post('/api/like/thumbup', userInfo);

          if(response.data.success) setLikeState('like');

          // 이미 싫어요 버튼이 눌러져 있는 상태라면? -> 취소
          if(hateState === 'hate') {
            await axios.post('/api/like/unthumbdown', userInfo);
            setHateState(null);
          };

        } catch(err) {
          console.log(err);
        }
      })();

      // 좋아요 한번 더 누르면 취소
    } else if(likeState === 'like') {
      (async () => {
        try {
          const response = await axios.post('/api/like/unthumbup', userInfo);

          if(response.data.success) setLikeState(null);

        } catch(err) {
          console.log(err);
        }
      })();
    }
  }, [likeState, userInfo, hateState, isLogin]);

  /** 
   * 싫어요 버튼 클릭 
   */
  const onHateClick = useCallback(e => {
    if(!isLogin) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#f3b017',
        text:'로그인 후 이용해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#f3b017',
      });
      return;
    };

    if(hateState === null) {
      (async () => {
        try {
          const response = await axios.post('/api/like/thumbdown', userInfo);

          if(response.data.success) setHateState('hate');

          // 이미 좋아요 버튼이 눌러져 있는 상태라면? -> 취소
          if(likeState === 'like') {
            await axios.post('/api/like/unthumbup', userInfo);
            setLikeState(null);
          };

        } catch(err) {
          console.log(err);
        }
      })();

      // 싫어요 한번 더 누르면 취소
    } else if(hateState === 'hate') {
      (async () => {
        try {
          const response = await axios.post('/api/like/unthumbdown', userInfo);

          if(response.data.success) setHateState(null);

        } catch(err) {
          console.log(err);
        }
      })();
    }
  }, [hateState, userInfo, likeState, isLogin]);

  return (
    <LikeContainer>
      <p>괜찮은 후기인가요?</p>
      <div className='like-area'>
        <div className='like' onClick={onLikeClick}>
          {likeState && likeState === 'like' ? <RiThumbUpFill /> : <RiThumbUpLine />}
        </div>
        <span>/</span>
        <div className='hate' onClick={onHateClick}>
          {hateState && hateState === 'hate' ? <RiThumbDownFill /> : <RiThumbDownLine />}
        </div>
      </div>
    </LikeContainer>
  );
});

export default Like;

const LikeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #bcbcbc;
  color: #404040;

  p { margin-right: 10px; }

  .like-area {
    width: 70px;
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #2a3768;

    .like,
    .hate {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`;