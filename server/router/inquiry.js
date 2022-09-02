/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

/**
 * 1:1문의 사용자 조회
 */
router.get('/getUserInquiry', async (req,res) => {
  console.log('문의사용자조회 >>>', req.query);

  const { user_no } = req.query;

  const sql = 'SELECT * FROM inquiry WHERE user_no = ? ORDER BY inquiry_no DESC';

  try {
    const result = await mysqlPool(sql, user_no);
    res.status(200).json({ success: true, item: result });
  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '데이터 조회에 실패했습니다.' })
  }
});


/**
 * 1:1문의 등록
 */
router.post('/', async (req, res) => {
  console.log('문의등록 >>>',req.body);

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


/**
 * 배송 접수 수정 (put-취소요청)
 */
 router.put('/putCancelInquiry', async (req, res) => {
  console.log('\t문의취소번호 >>>', req.body);

  const { inquiry_no } = req.body;

  let sql = `UPDATE inquiry SET progress='취소' WHERE inquiry_no = ?`;

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, inquiry_no);

    if (affectedRows === 0) {
      throw new RuntimeException('데이터 수정에 실패하였습니다.');
    }

    // sql = 'SELECT * FROM reception WHERE user_no = ? ORDER BY reception_no DESC'
    // result = await mysqlPool(sql, user_no);

    // 수정된 데이터 반환
    res.status(200).json({
      success: true,
      message: '접수 취소 성공',
      // item: result,
    });

  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '데이터를 조회하지 못했습니다' });
  }
});

export default router;