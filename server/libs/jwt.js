/**
 * Json Web Token 발급
 */

/** 패키지 참조 */
import { join, resolve } from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: join(resolve(), '../../env/config.env') });

const createToken = (memberData) => {

  const { user_no, user_id, profile_img } = memberData;

  return jwt.sign(
    { user_no, user_id, profile_img }, 
    process.env.SECRET_KEY,
    { expiresIn: '10s' }
  );
}

const createRefreshToken = (memberData) => {

  return jwt.sign(
    { id: memberData.user_id }, 
    process.env.SECRET_KEY,
    { expiresIn: '7d' }
  );
}

export { createToken, createRefreshToken };