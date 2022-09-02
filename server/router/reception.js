/** 패키지 참조 */
import express from 'express';
import axios from 'axios';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

/**
 * 배송 접수 조회
 */
router.get('/getReception', async (req, res) => {
  console.log('\t배송조회사용자번호 >>>', req.query);

  const { user_no } = req.query;

  const sql = `
    SELECT * 
    FROM reception 
    WHERE user_no = ?
    ORDER BY reception_no DESC
  `;

  try {
    const result = await mysqlPool(sql, user_no);
    res.status(200).json({ success: true, item: result });
  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '데이터를 조회하지 못했습니다' });
  }
});

/**
 * 배송 접수
 */
router.post('/', async (req, res) => {
  console.log('\t배송접수 >>>', req.body);

  const {
    sendName,
    sendContact,
    sendPostCode,
    sendAddress1,
    sendAddress2,
    arriveName,
    arriveContact,
    arrivePostCode,
    arriveAddress1,
    arriveAddress2,
    productName,
    productPrice,
    productSize,
    productQty,
    productNote,
    visitDate,
    payment,
    deliveryMessage,
    user_no,
  } = req.body;

  const sql =
    'INSERT INTO reception (send_name, send_contact, send_postcode, send_address1, send_address2, arrive_name, arrive_contact, arrive_postcode,arrive_address1, arrive_address2, product_name, product_price, product_size, product_qty,product_note, visit_date, payment, message, user_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const param = [
    sendName,
    sendContact,
    sendPostCode,
    sendAddress1,
    sendAddress2,
    arriveName,
    arriveContact,
    arrivePostCode,
    arriveAddress1,
    arriveAddress2,
    productName,
    productPrice,
    productSize,
    productQty,
    productNote,
    visitDate,
    payment,
    deliveryMessage,
    user_no
  ];

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, param);

    if(affectedRows === 0) {
      throw new RuntimeException('데이터 저장에 실패하였습니다.');
    }

    // sql = 'SELECT * FROM reception WHERE user_no = ?';
    // result = await mysqlPool(sql, user_no);
    res.status(200).json({
      success: true,
      message: '배송 접수 성공',
      // item: result 
    });

  } catch (err) {
    res.status(400).json({ success: false, message: '배송 접수 실패' });
  }
});

/**
 * 배송 접수 수정 (put-취소요청)
 */
router.put('/putReception', async (req, res) => {
  console.log('\t배송취소번호 >>>', req.body);

  const { reception_no } = req.body;

  let sql = `UPDATE reception SET progress='취소' WHERE reception_no = ?`;

  let result = null;

  try {
    const { insertId, affectedRows } = await mysqlPool(sql, reception_no);

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
