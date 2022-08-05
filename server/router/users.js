/** 패키지 참조 */
import express from 'express';
import { mysqlPool } from '../mysql.js';

// export default () => {

//   return router;
// };

/** 로그인 */
const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.body);
  // 임시 데이터
  const userData = { userId: 'chan', password: '11' };

  const postData = { userId: req.body.userId, password: req.body.password };

  if (userData.userId === postData.userId) {
    if (userData.password === postData.password) {
      console.log('\t >>> 로그인 성공');

      res.status(200).json({ success: true, message: '로그인 성공' });
    } else {
      res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });
    }
  } else {
    res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' });
  }
});

/** 회원가입 */
router.post('/register', async (req, res, next) => {
  const postInfo = {
    userId: req.body.userId,
    password: req.body.password,
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  const sql =
    'INSERT INTO member (user_id, user_pw, user_name, user_email, user_phone) VALUES (?, ?, ?, ?, ?)';

  const param = [
    postInfo.userId,
    postInfo.password,
    postInfo.userName,
    postInfo.email,
    postInfo.phoneNumber,
  ];

  mysqlPool(sql, param);
  res.status(200).json({ success: true, message: '성공' });
});

export default router;
