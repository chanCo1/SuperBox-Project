/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

/**
 * 댓글 조회
 */
router.get('/get', async (req, res) => {
  console.log('댓글 조회 페이지 >>>', req.query);

  const { review_no } = req.query;

  const sql = 'SELECT * FROM comment WHERE review_no = ?';

  try {
    const result = await mysqlPool(sql, review_no);
    console.log('\t댓글조회 >>>', result);
    res.status(200).json({ success: true, item: result });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: '데이터를 호출 실패',
      errMsg: err
    });
  };
});

/**
 * 댓글 저장
 */
router.post('/post', async (req, res) => {
  console.log('댓글정보 >>> ', req.body);

  const { name, comment, user_no, review_no } = req.body;

  const sql = 'INSERT INTO comment (name, comment, user_no, review_no) VALUES (?, ?, ?, ?)' ;

  const param = [name, comment, user_no, review_no];

  try {
    await mysqlPool(sql, param).then(() => {
      res.status(200).json({ success: true, message: '댓글 저장 성공' });
    });
  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '후기 저장 실패' });
  };
});

export default router;