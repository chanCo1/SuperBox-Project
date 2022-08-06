/** 패키지 참조 */
import { join, resolve } from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: join(resolve(), '../env/config.env') });

const connectionInfo = {
  host: process.env.DATABASE_HOST, // MYSQL 서버 주소 (다른 PC인 경우 IP주소)
  port: process.env.DATABASE_PORT, // MYSQL 포트번호
  user: process.env.DATABASE_USERNAME, // MYSQL의 로그인 할 수 있는 계정 이름
  password: process.env.DATABASE_PASSWORD, // 비밀번호
  database: process.env.DATABASE_SCHEMA, // 사용하고자 하는 데이터베이스 이름
  connectionLimit: process.env.DATABASE_CONNECTION_LIMIT, // 최대 커넥션 수
  connectTimeout: process.env.DATABASE_CONNECT_TIMEOUT, // 커넥션 타임아웃
  waitForConnections: process.env.DATABASE_WAIT_FOR_CONNECTIONS, // 커넥션 풀이 다 찬 경우 처리
};

console.log(connectionInfo);

const pool = mysql.createPool(connectionInfo);

const mysqlPool = async (sql, param) => {
  let dbcon = null;
  let result = null;

  /** 커넥션 풀에서 접속객체 하나를 임대함 */
  try {
    dbcon = await pool.getConnection();
  } catch (e) {
    console.error('접속객체 임대에 실패했습니다.');
    console.error(e);

    // 임대한 자원이 있다면 반드시 반납해야 함.
    if (dbcon) dbcon.release();

    return;
  }

  /** SQL문 실행 */
  try {
    [result] = await dbcon.query(sql, param);
  } catch (e) {
    console.error('SQL문 수행에 실패했습니다.');
    console.error(e);
    return;
  } finally {
    // 임대한 접속 객체 반납
    if (dbcon) dbcon.release();
  }
  return result;
};

export default mysqlPool;
