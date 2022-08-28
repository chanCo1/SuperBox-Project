/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';
import RuntimeException from '../libs/RuntimeException.js';

/** 라우터 생성 */
const router = express.Router();


/**
 * 댓글 조회
 */
router.get('/getComment', async (req, res) => {
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
 * 댓글 저장 (post)
 */
router.post('/postComment', async (req, res) => {
  console.log('댓글정보 >>> ', req.body);

  const { name, comment, user_no, review_no } = req.body;

  let sql = 'INSERT INTO comment (name, comment, user_no, review_no) VALUES (?, ?, ?, ?)' ;

  const param = [name, comment, user_no, review_no];

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param)

    if (affectedRows === 0) {
      throw new RuntimeException('데이터 저장에 실패하였습니다.');
    }
    
    sql = 'SELECT * FROM comment WHERE review_no = ?';
    result = await mysqlPool(sql, review_no);
    res.status(200).json({
      success: true,
      message: '댓글 저장 성공',
      item: result 
    });
    
  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '댓글 저장 실패' });
  };

  // 댓글 수 업데이트 .. 이방법이 최선인지?
  try {
    sql = 'UPDATE review SET comment_count = comment_count + 1 WHERE review_no=?';

    await mysqlPool(sql, review_no);

  } catch(err) {
    console.log('댓글 수 업데이트 실패', err);
  }
});


/**
 * 댓글 수정 (put)
 */
 router.put('/put', async (req, res) => {
  console.log('수정된 댓글 들어온 값 >>>', req.body);

  const { comment_no, comment, review_no } = req.body;

  let sql = 'UPDATE comment SET comment=?, update_regdate=now() WHERE comment_no =?';
  const param = [comment, comment_no];

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param);

    if (affectedRows === 0) {
      throw new RuntimeException('데이터 수정에 실패하였습니다.');
    }

    // 수정된 댓글을 다시 조회한다.
    sql = 'SELECT * FROM comment WHERE review_no = ?';
    result = await mysqlPool(sql, review_no);
    console.log('수정된 댓글 반환 >>> ', result);

    // 수정된 데이터 반환
    res.status(200).json({
      success: true,
      message: '후기 저장 성공',
      item: result
    });

  } catch(err) {
    res.status(400).json({ success: false });
  };
});

export default router;