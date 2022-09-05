/** 패키지 참조 */
import express from 'express';
import mysqlPool from '../middleware/pool.js';
import encrypt from '../libs/encrypt.js';

/** 라우터 생성 */
const router = express.Router();

/** 
 * 프로필 수정 
 */
router.put('/putProfile', async (req,res) => {
  console.log('프로필 수정 >>>',req.body);

  const { userName, password, phoneNumber, postcode, addr1, addr2, user_no } = req.body;

  const sql = 'SELECT * FROM member WHERE user_no = ?';

  let memberData = null;

  try {
    // 기존의값 호출
    const result = await mysqlPool(sql, user_no)
    console.log('개인정보수정하려는데데이터뭥ㅁ? >>' , result);

    for (const data of result) {
      memberData = data;
    }

    // 기존데이터의 비밀번호와 들어온 비밀번호 값이 같다면?
    if(password === memberData.user_pw ) {
      const sql = 'UPDATE member SET user_name=?, user_phone=?, postcode=?, addr1=?, addr2=? WHERE user_no=?';

      const param = [userName, phoneNumber, postcode, addr1, addr2, user_no]

      try {
        await mysqlPool(sql, param);
        res.status(200).json({ success: true, message: '비밀번호를 제외한 회원정보를 수정했습니다' })
      } catch(err) {
        console.log(err);
        res.status(400).json({ success: false, message: '회원정보 수정 실패' });
      };

    } else {
      const sql = 'UPDATE member SET user_name=?, user_pw=?, user_phone=?, postcode=?, addr1=?, addr2=? WHERE user_no=?';

      const param = [userName, encrypt(password), phoneNumber, postcode, addr1, addr2, user_no];

      try {
        await mysqlPool(sql, param);
        res.status(200).json({ success: true, message: '회원정보를 수정했습니다' })
      } catch(err) {
        console.log(err);
        res.status(400).json({ success: false, message: '회원정보 수정 실패' });
      };
    }
  } catch(err) {
    res.status(400).json({ success: false, message: '회원정보 수정 실패' });
  }
});


/**
 * 프로필 이미지 수정
 */
router.put('/putProfileImg', async (req, res) => {
  console.log('프로필이미지주소 >>> ',req.body);

  const { profile_img, user_no } = req.body;

  const param = [profile_img, user_no];
  
  let sql = null;

  try {
    sql = 'UPDATE member SET profile_img=? WHERE user_no=?';
    await mysqlPool(sql, param);

    sql = 'UPDATE review SET profile_img=? WHERE user_no=?';
    await mysqlPool(sql, param);

    sql = 'UPDATE comment SET profile_img=? WHERE user_no=?';
    await mysqlPool(sql, param);

    res.status(200).json({ success: true });

  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '프로필 이미지 수정 실패' });
  }
});


/**
 * 프로필 이미지 삭제
 */
router.put('/deleteProfileImg', async (req, res) => {
  console.log('프로필이미지주소 >>> ',req.body);

  const { user_no } = req.body;
  
  let sql = null;

  try {
    sql = `UPDATE member SET profile_img=NULL WHERE user_no=?`;
    await mysqlPool(sql, user_no);

    sql = `UPDATE review SET profile_img=NULL WHERE user_no=?`;
    await mysqlPool(sql, user_no);

    sql = `UPDATE comment SET profile_img=NULL WHERE user_no=?`;
    await mysqlPool(sql, user_no);

    res.status(200).json({ success: true });

  } catch(err) {
    console.log(err);
    res.status(400).json({ success: false, message: '프로필 이미지 수정 실패' });
  }
});

export default router;
