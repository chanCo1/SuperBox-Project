/**
 * 데이터베이스에 접속하기 위한 pool 커넥션
 */
import { join, resolve } from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: join(resolve(), '../env/config.env') });

/** 환경변수 참조 */
const connectionInfo = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT, 
  user: process.env.DATABASE_USERNAME, 
  password: process.env.DATABASE_PASSWORD, 
  database: process.env.DATABASE_SCHEMA,
  connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
  connectTimeout: process.env.DATABASE_CONNECT_TIMEOUT, 
  waitForConnections: process.env.DATABASE_WAIT_FOR_CONNECTIONS, 
};

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
