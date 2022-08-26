/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

/** 좋아요 정보 조회 */
router.get('/getlike', async (req, res) => {
  console.log('좋아요유저정보 >>>', req.query);

  const { user_no, review_no } = req.query;

  const sql = 'SELECT * FROM review_like WHERE user_no=? && review_no=?';
  const param = [user_no, review_no];

  try {
    const result = await mysqlPool(sql, param);
    console.log('result >>> ',result);

    res.status(200).json({ success: true, message: '좋아요 정보 조회', result: result });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '데이터를 불러오지 못했습니다.' });
  }
});


/** 좋아요 */
router.post('/thumbup', async (req, res) => {
  console.log('좋아요 누른 정보 >>>', req.body);

  const { user_no, review_no } = req.body;

  let sql = 'UPDATE review SET like_count = like_count + 1 WHERE review_no =?';

  try {
    await mysqlPool(sql, review_no);
    res.status(200).json({ success: true, message: '좋아요를 눌렀습니다.' });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '좋아요 실패' });
  };

  try {
    sql = 'INSERT INTO review_like (user_no, review_no) VALUES (?, ?)';
    const param = [user_no, review_no];

    await mysqlPool(sql, param);
  } catch(err) {
    console.log(err);
  }
});


/** 좋아요 취소 */
router.post('/unthumbup', async (req, res) => {
  console.log('좋아요 다시 누른 정보 >>>', req.body);

  const { user_no, review_no } = req.body;

  let sql = 'UPDATE review SET like_count = like_count - 1 WHERE review_no =?';

  try {
    await mysqlPool(sql, review_no);
    res.status(200).json({ success: true, message: '좋아요 취소' });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '좋아요 취소 실패' });
  };

  try {
    sql = 'DELETE FROM review_like WHERE user_no=? && review_no=?';
    const param = [user_no, review_no];

    await mysqlPool(sql, param);
  } catch(err) {
    console.log(err);
  }
});


/** 싫어요 정보 조회 */
router.get('/gethate', async (req, res) => {
  console.log('싫어요유저정보 >>>', req.query);

  const { user_no, review_no } = req.query;

  const sql = 'SELECT * FROM review_hate WHERE user_no=? && review_no=?';
  const param = [user_no, review_no];

  try {
    const result = await mysqlPool(sql, param);
    console.log('result >>> ',result)

    res.status(200).json({ success: true, message: '싫어요 정보 조회', result: result });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '데이터를 불러오지 못했습니다.' });
  }
});


/** 싫어요 */
router.post('/thumbdown', async (req, res) => {
  console.log('싫어요 누른 정보 >>>', req.body);

  const { user_no, review_no } = req.body;

  // 싫어요 업데이트
  let sql = 'UPDATE review SET like_count = like_count - 1 WHERE review_no =?';

  try {
    await mysqlPool(sql, review_no);
    res.status(200).json({ success: true, message: '싫어요를 눌렀습니다.' });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '싫어요 실패' });
  };

  try {
    // 싫어요 등록
    sql = 'INSERT INTO review_hate (user_no, review_no) VALUES (?, ?)';
    const param = [user_no, review_no];

    await mysqlPool(sql, param);
  } catch(err) {
    console.log(err);
  }
});


/** 싫어요 취소 */
router.post('/unthumbdown', async (req, res) => {
  console.log('싫어요 다시 누른 정보 >>>', req.body);

  const { user_no, review_no } = req.body;

  // 싫어요 취소 업데이트
  let sql = 'UPDATE review SET like_count = like_count + 1 WHERE review_no =?';

  try {
    await mysqlPool(sql, review_no);
    res.status(200).json({ success: true, message: '싫어요 취소' });
  } catch(err) {
    console.log(err)
    res.status(400).json({ success: false, message: '싫어요 취소 실패' });
  };

  try {
    // 싫어요 등록 삭제
    sql = 'DELETE FROM review_hate WHERE user_no=? && review_no=?';
    const param = [user_no, review_no];

    await mysqlPool(sql, param);
  } catch(err) {
    console.log(err);
  }
});

export default router;