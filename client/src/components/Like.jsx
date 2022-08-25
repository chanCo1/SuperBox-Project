/** 패키지 참조 */
import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';

import { RiThumbUpFill, RiThumbDownFill, RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri';

/** 
 * 좋아요 구현
 * @param userNo ReviewDetail.jsx
 * @param reviewNo ReviewDetail.jsx
 */
const Like = memo(({ userNo, reviewNo }) => {

  const { isLogin } = useSelector(state => state.user);

  //좋아요 상태값
  const [likeAction, setLikeAction] = useState(null);
  //싫어요 상태값
  const [hateAction, setHateAction] = useState(null);

  // 유저 정보
  const [userState, setUserState] = useState();
  console.log(userState);
  
  // ReviewDetail.jsx로 부터 받은 정보 저장
  useEffect(() => {
    if(userNo && reviewNo) {
      setUserState({
        user_no: userNo,
        review_no: reviewNo,
      });
    };
  }, [userNo, reviewNo]);

  // 후기 상세보기 페이지 마운트 시 좋아요 확인
  // -> 좋아요를 누른 상태라면 표시
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/like/getlike', {
          params: {
            user_no: userNo,
            review_no: reviewNo,
          }
        });
        console.log(response);

        // 백엔드로부터 받은 값을 map 함수를 사용하여 비교
        response?.data?.result.map((v,i) => (
          isLogin && v.user_no === userNo ? setLikeAction('like') : null
        ));

      } catch(err) {
        console.log(err);
      }
    })();
  }, [userNo, reviewNo]);

  /** 좋아요 버튼 클릭 */
  const onLikeClick = useCallback(e => {
    if(likeAction === null) {
      (async () => {
        try {
          const response = await axios.post('/api/like/thumbup', userState);
          console.log(response);
          setLikeAction('like');
        } catch(err) {
          console.log(err);
        }
      })();

    } else if(likeAction === 'like') {
      (async () => {
        try {
          const response = await axios.post('/api/like/unthumbup', userState);
          console.log(response);
          setLikeAction(null);
        } catch(err) {
          console.log(err);
        }
      })();
    }
  }, [likeAction, userState]);

  /** 싫어요 버튼 클릭 */
  const onHateClick = useCallback(e => {
    if(hateAction === null) {
      setHateAction('hate');
    } else if(hateAction === 'hate') {
      setHateAction(null);
    }
  }, [hateAction]);

  return (
    <LikeContainer>
      <p>괜찮은 후기인가요?</p>
      <div className='like-area'>
        <div className='like' onClick={onLikeClick}>
          {likeAction && likeAction === 'like' ? <RiThumbUpFill /> : <RiThumbUpLine />}
        </div>
        <span>/</span>
        <div className='hate' onClick={onHateClick}>
          {hateAction && hateAction === 'hate' ? <RiThumbDownFill /> : <RiThumbDownLine />}
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


