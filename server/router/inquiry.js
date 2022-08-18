/** 패키지 참조 */
import express from 'express';
import axios from 'axios';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);

  const { type, title, name, email, contact, content, img, user_no } = req.body;

  // sql 파일 저장 몇개 할껀지 수정해야함 ..
  const sql = 'INSERT INTO inquiry (type, title, name, email, contact, content, img, user_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  const param = [type, title, name, email, contact, content, img, user_no];

  try {
    await mysqlPool(sql, param);
    res.status(200).json({ success: true, message: '1:1문의 등록 성공' });

  } catch(err) {
    res.status(400).json({ success: false, message: '1:1문의 등록 실패' });
  }
});

export default router;