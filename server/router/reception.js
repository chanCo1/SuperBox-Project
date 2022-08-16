/** 패키지 참조 */
import express from 'express';
import axios from 'axios';
import mysqlPool from '../middleware/pool.js';

/** 라우터 생성 */
const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);

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
    'INSERT INTO reception (send_name, send_contact, send_postcode, send_address1, send_address2, arrive_name, arrive_contact, arrive_postcode,arrive_address1, arrive_address2, product_name, product_price, product_size, product_qty,product_note, visit_date, payment, message, receive_date, user_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?)';

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
    await mysqlPool(sql, param);
    res.status(200).json({ success: true, message: '배송접수 성공' });
  } catch (e) {
    res.status(400).json({ success: false, message: '배송접수 실패' });
  }
});

export default router;
