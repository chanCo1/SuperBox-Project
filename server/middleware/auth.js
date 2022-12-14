/**
 * jwt 유효성 검사 -> 유저 정보 디코딩
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { join, resolve } from 'path';

dotenv.config({ path: join(resolve(), '../env/config.env') });

const secret = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  const token = req.query.token || req.headers['access-token'];

  if (!token) {
    console.log('토큰이 존재하지 않습니다.');
    return res.status(401).json({ success: false, message: '토큰이 존재하지 않습니다.' });
  }

  // 토큰 확인
  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // res.status(401).json({ success: false, message: err.message });
        throw new Error('유효하지 않은 토큰입니다.(verify)');
      }
      req.decoded = decoded;
      req.token = token;
      next();
    });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

export default auth;
