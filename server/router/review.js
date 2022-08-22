/** 패키지 참조 */
import express from 'express';
import axios from 'axios';
import mysqlPool from '../middleware/pool.js';
import RuntimeException from '../libs/RuntimeException.js';

/** 라우터 생성 */
const router = express.Router();

/**
 * 후기 조회 (get)
 */
router.get('/', async (req, res) => {
  
  const sql = 'SELECT * FROM review'

  try {
    const result = await mysqlPool(sql);
    res.status(200).json({ success: true, item: result });

  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: err });
  }
});



/** 
 * 후기 등록 (post)
 */
router.post('/post', async (req, res) => {
  console.log('후기 들어온 값 >>> ',req.body);

  const { head, title, content, img, name, user_no } = req.body;

  let sql = 
    'INSERT INTO review (head, title, content, img, name, user_no) VALUES (?, ?, ?, ?, ?, ?)';

  const param = [head, title, content, img, name, user_no];

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param);

    if(affectedRows === 0) {
      throw new RuntimeException('데이터 저장에 실패하였습니다.');
    }

    sql = 'SELECT * FROM review WHERE user_no = ?';
    result = await mysqlPool(sql, user_no);
    console.log('result >>> ',result);

  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: err });
  };

  res.status(200).json({ success: true, message: '후기 저장 성공', item: result });
});

export default router;