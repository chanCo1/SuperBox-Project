/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';
import RuntimeException from '../libs/RuntimeException.js';

/** 라우터 생성 */
const router = express.Router();

/**
 * 후기 전체 조회 (get)
 */
router.get('/getReview', async (req, res) => {
  console.log('후기 조회 들어온값 ... >>', req.query)

  const { query, sort } = req.query;

  const sql = `
    SELECT * 
    FROM review 
    WHERE title 
    LIKE '%${query}%' 
    ORDER BY ${sort} DESC, review_no DESC
  `;
    // LIMIT 0, ${rows}

  try {
    const result = await mysqlPool(sql);
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
 * 단일(detail) 데이터 조회 (get)
 */
router.get('/detail', async (req, res) => {
  console.log('게시글 번호 >>> ', req.query);

  const { reviewNo } = req.query;

  let sql = 'SELECT * FROM review WHERE review_no = ?';

  let result = null;

  try {
    result = await mysqlPool(sql, reviewNo);
    console.log('detail result >>> ', result);

    res.status(200).json({
      success: true,
      message: '후기 데이터를 불러왔습니다.',
      item: result,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: '후기 데이터를 불러오지 못했습니다.',
      errMsg: err,
    });
  };

  // 조회수 업데이트 .. 이방법이 최선인지?
  try {
    sql = 'UPDATE review SET view_count = view_count + 1 WHERE review_no=?';

    await mysqlPool(sql, reviewNo)

  } catch(err) {
    console.log('조회수 업데이트 실패', err);
  }
});


/**
 * 후기 등록 (post)
 */
router.post('/post', async (req, res) => {
  console.log('후기 들어온 값 >>> ', req.body);

  const { head, title, content, img, name, user_no } = req.body;

  let sql =
    'INSERT INTO review (head, title, content, img, name, user_no) VALUES (?, ?, ?, ?, ?, ?)';

  const param = [head, title, content, img, name, user_no];

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param);

    if (affectedRows === 0) {
      throw new RuntimeException('데이터 저장에 실패하였습니다.');
    }

    // 저장된 데이터를 다시 조회한다.
    // -> 이거 하나만 들어오게 수정해야함 ..
    sql = 'SELECT * FROM review WHERE user_no = ?';
    result = await mysqlPool(sql, user_no);
    console.log('저장된 데이터 반환 >>> ', result);

    // 저장된 데이터 반환
    res.status(200).json({
      success: true,
      message: '후기 저장 성공',
      item: result
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: '후기 저장 실패',
      errMsg: err
    });
  };
});


/**
 * 후기 수정 (put)
 */
router.put('/put', async (req, res) => {
  console.log('수정된 후기 들어온 값 >>>', req.body);

  const { review_no, head, title, content } = req.body;

  let sql = 'UPDATE review SET head=?, title=?, content=?, update_regdate=now() WHERE review_no =?';
  const param = [head, title, content, review_no];

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param);

    if (affectedRows === 0) {
      throw new RuntimeException('데이터 수정에 실패하였습니다.');
    }

    // 저장된 데이터를 다시 조회한다.
    sql = 'SELECT * FROM review WHERE review_no = ?';
    [result] = await mysqlPool(sql, review_no);
    console.log('저장된 데이터 반환 >>> ', result);

    // 저장된 데이터 반환
    res.status(200).json({
      success: true,
      message: '후기 저장 성공',
      item: result
    });

  } catch(err) {
    res.status(400).json({ success: false });
  };
});



/**
 * 후기 삭제 (delete)
 */
router.delete('/delete', async (req, res) => {
  console.log('삭제할 게시글 번호 >>> ', req.query);

  const { review_no } = req.query;

  let sql = null;
  try {
    sql = 'DELETE FROM review_like WHERE review_no=?';
    await mysqlPool(sql, review_no);
    
    sql = 'DELETE FROM review_hate WHERE review_no=?';
    await mysqlPool(sql, review_no);

    sql = 'DELETE FROM review WHERE review_no = ?';
    const result = await mysqlPool(sql, review_no);
    
    res.status(200).json({ success: true, message: '데이터를 삭제했습니다.' });

  } catch(err) {
    res.status(400).json({ success: false, message: '데이터 삭제 실패', errMsg: err })
  }
});

export default router;
