/** 패키지 참조 */
import express from "express";

export default () => {
  const router = express.Router();
  
  router.post('/login', (req, res) => {
    console.log('req로 들어오는 값 >>> ', req.body);
    const userData = { email: 'chan@chan.com', password: '123123'};  // 임시 데이터
  
    const postData = { email: req.body.email, password: req.body.password};
  
    if(userData.email === postData.email) {
      if(userData.password === postData.password) {
        res.status(200).json({ success: true, message: 'Hi!' });
      } else {
        res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });
      }
    } else {
      res.status(400).json({ success: false, message: '이메일이 존재하지 않습니다.' });
    }
  });

  return router;
};

