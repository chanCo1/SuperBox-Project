/**
 * Json Web Token 발급
 */

/** 패키지 참조 */
import { join, resolve } from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: join(resolve(), '../../env/config.env') });

const createToken = (memberData) => {

  const { user_no, user_id } = memberData;

  return jwt.sign(
    { user_no, user_id }, 
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
}

const createRefreshToken = (memberData) => {

  const { user_no, user_id } = memberData;

  return jwt.sign(
    { user_no, user_id }, 
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );
}

export { createToken, createRefreshToken };