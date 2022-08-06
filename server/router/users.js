/** 패키지 참조 */
import express from 'express';
import pool from '../pool.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;


/** 로그인 */
const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('\t들어온 값 >>> ', req.body);

  const postData = { userId: req.body.userId, password: req.body.password };

  const sql = 'SELECT * FROM member WHERE user_id = ?';
  const param = postData.userId;

  // 비동기 처리
  try {
    const result = await pool(sql, param);
    
    let userData = null;
    for(const data of result) {
      userData = data;
    };

    if(postData.userId === (userData && userData.user_id)) {
      if(postData.password === userData.user_pw) {
        res.status(200).json({ success: true, message: '로그인 성공'});
      } else {
        res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });
      } 
    } else {
      res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' })
    };

    if(!userData) {
      res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' });
    }
  } catch(err) {
    console.log(err);
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

  try {
    pool(sql, param);
    console.log('회원가입 성공');
    res.status(200).json({ success: true, message: '회원가입 성공' });
  } catch(e) {
    res.status(400).json({ success: true, message: '회원가입 실패' });
  }
});

export default router;
