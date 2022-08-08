/** 패키지 참조 */
import express from 'express';
import axios from 'axios';

import mysqlPool from '../middleware/pool.js';
import encrypt from '../libs/encrypt.js';
import { createToken, createRefreshToken } from '../libs/jwt.js';
import auth from '../middleware/auth.js';

/** 
 * 로그인 
 */
const router = express.Router();

router.post('/login', async (req, res) => {
  console.log('\t사용자 입력 값 >>> ', req.body);

  const { userId, password } = req.body;

  const sql = 'SELECT * FROM member WHERE user_id = ?';

  // 비동기 처리
  try {
    // SQL문 실행 후 값을 가져온다.
    const result = await mysqlPool(sql, userId);

    let memberData = null;
    for (const data of result) {
      memberData = data;
    }

    // 데이터 정보가 있는지 확인
    if (userId === (memberData && memberData.user_id)) {
      if (encrypt(password) === memberData.user_pw) {
        // jwt 토큰 발급
        const accessToken = createToken(memberData);
        const refreshToken = createRefreshToken(memberData);

        const sql = 'UPDATE member SET token = ? WHERE user_id = ?';
        const param = [refreshToken, userId];
        
        // 발급받은 토큰을 데이터에 저장
        try {
          await mysqlPool(sql, param);
        } catch(err) {
          console.log(err);
        }

        res.status(200).json({ 
          success: true,
          message: '로그인 성공',
          accessToken,
          refreshToken,
        });

      } else {
        res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });
      }
    } else {
      res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' });
    }

    if (!memberData) res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' });

  } catch (err) {
    console.log(err);
  }
});


/** 
 * 회원가입 
 */
router.post('/register', async (req, res, next) => {
  const { userId, password, userName, email, phoneNumber } = req.body;

  const sql =
    'INSERT INTO member (user_id, user_pw, user_name, user_email, user_phone) VALUES (?, ?, ?, ?, ?)';

  const param = [userId, encrypt(password), userName, email, phoneNumber];

  try {
    mysqlPool(sql, param);
    res.status(200).json({ success: true, message: '회원가입 성공' });
  } catch (e) {
    res.status(400).json({ success: false, message: '회원가입 실패' });
  }
});


/** 
 * 회원 가입시 중복되는게 있는지 확인 (아이디, 이메일)
 */
router.post('/check', async (req, res) => {
  const { userId, email } = req.body;

  const sql = 'SELECT * FROM member WHERE user_id = ? OR user_email = ?';
  const param = [userId, email];

  // 비동기 처리
  try {
    const result = await mysqlPool(sql, param);

    let memberData = null;
    for (const data of result) {
      memberData = data;
    }
    console.log('MEMBER DATA >>> ',memberData);

    if (userId !== (memberData && memberData.user_id)) {
      if (email !== (memberData && memberData.user_email)) {
        res.status(200).json({ success: true, message: '회원가입이 가능합니다.' });
      } else {
        res.status(400).json({ success: false, message: '같은 이메일이 존재합니다.' });
      }
    } else {
      res.status(400).json({ success: false, message: '같은 아이디가 존재합니다.' });
    }
  } catch (err) {
    console.log(err);
  }
});


/**
 * 토큰 유효성 검사
 */
router.use('/token', auth);
router.get('/token', async (req, res) => {
  const { user_no } = req.decoded;
  const sql = 'SELECT * FROM member WHERE user_no = ?';

  let memberData = null;
  
  try {
    const result = await mysqlPool(sql, user_no);
    
    // 값이 배열안에 객체로 들어오기 때문에 for~in 문으로 추출
    for (const data of result) {
      memberData = data;
    }

  } catch(err) {
    res.status(401).json({ success: false, message: err });
  }
  res.status(200).json({ 
    success: true,
    message: '유효한 토큰입니다.',
    memberData
  });
});

/**
 * refresh 토큰
 */
router.use('/refresh', auth);
router.get('/refresh', async (req, res) => {
  const { user_no } = req.decoded;
  const sql = 'SELECT * FROM member WHERE user_no = ?';

  let memberData = null;

  try {
    const result = await mysqlPool(sql, user_no);
    
    for (const data of result) {
      memberData = data;
    }
    
    if(memberData !== null && memberData.token === req.token) {
      const accessToken = await createToken(memberData);
      res.send({ success: true, accessToken });

    } else {
      throw new Error('유효하지 않은 토큰입니다.');
    }
  } catch(err) {
    res.status(401).json({ success: false, message: err.message });
  }
});

export default router;
