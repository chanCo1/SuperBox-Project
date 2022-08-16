/** 패키지 참조 */
import express from 'express';
import axios from 'axios';
import mysqlPool from '../middleware/pool.js';
import multer from 'multer';
import { join, extname } from 'path';

/** 라우터 생성 */
const router = express.Router();

/**
 * 파일 업로드 함수
 */
// multer 객체 생성
const initMulter = () => {
  const multipart = multer({
    // 저장 될 디렉토리 경로 및 파일 이름 설정
    storage: multer.diskStorage({
      // 업로드 된 파일이 저장될 디렉토리 설정
      destination: (req, file, cb) => {
        console.log(file);
        cb(null, 'image/');
      },
  
      // 업로드 된 파일이 저장될 이름 설정
      filename: (req, file, cb) => {
        // 파일의 원본 이름에서 확장자만 추출 -> ex) .png
        const extName = extname(file.originalname).toLowerCase();
        // 파일이 저장될 이름 (현재 시작의 timestamp + 확장자)
        const saveName = new Date().getTime().toString() + extName;
  
        cb(null, saveName);
      },
    }),
  
    // 용량, 최대 업로드 파일 수 제한 설정
    limits: {
      files: parseInt(process.env.UPLOAD_MAX_COUNT),
      fileSize: parseInt(eval(process.env.UPLOAD_MAX_SIZE)),
    }
  });

  return multipart;
};

/**
 * 파일 업로드
 */
router.post('/upload', (req, res) => {
  req.file = [];

  // name 속성이 imageUpload 인 경우에 대한 업로드 수행
  const uploade = initMulter().array('imageUpload'); 
  uploade(req, res, (err) => {
    console.log(req.file);

    if(err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({
        success: true, filePath: res.req.file.path
      });
    }
  })
})

export default router;