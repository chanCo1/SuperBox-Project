/**
 * 비밀번호 암호화 함수
 */

/** 패키지 참조 */
import { join, resolve } from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: join(resolve(), '../../env/config.env') });

export default (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('base64');
};
