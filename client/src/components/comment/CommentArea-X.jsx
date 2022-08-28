// /**
//  * ReviewDetail로 보낼 컴포넌트
//  * 댓글 입력창과 댓글 리스트 생성
//  */

// /** 패키지 참조 */
// import React, { memo } from 'react';
// import { useSelector } from 'react-redux'

// // 컴포넌트 참조
// import CommentWrite from './CommentWrite';
// import CommentList from './CommentList';

// const CommentArea = memo(({ reviewNo }) => {

//   // 로그인된 사용자 정보
//   const { memberData, isLogin } = useSelector(state => state.user);

//   return (
//     <div>
//       <CommentWrite
//         memberData={memberData}
//         isLogin={isLogin}
//         reviewNo={reviewNo}
//       />

//       <CommentList reviewNo={reviewNo} />
//     </div>
//   );
// });

// export default CommentArea;