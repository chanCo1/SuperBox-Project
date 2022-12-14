/** 패키지 참조 */
import express from 'express';
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
        // // 역슬래시를 슬래시로 변경
        // file.upload_dir = process.env.UPLOAD_DIR.replace(/\\/gi, '/');

        cb(null, process.env.UPLOAD_DIR);
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
 * 에러 확인 함수
 */
const checkUploadError = err => {
  // 결과 코드와 결과 메세지 변수
  let result_code = 200;
  let result_msg = '업로드 성공';

  if(err) {
    if(err instanceof multer.MulterError) {
      switch (err.code) {
        case 'LIMIT_FILE_COUNT':
          err.result_code = 500;
          err.result_msg = '이미지 업로드는 5개 까지 가능합니다.';
          break;
        case 'LIMIT_FILE_SIZE':
          err.result_code = 500;
          err.result_msg = '업로드 가능한 파일 용량을 초과했습니다.';
          break;
        default:
          err.result_code = 500;
          err.result_msg = '알 수 없는 에러가 발생했습니다.';
          break;
      }
    }
    result_code = err.result_code;
    result_msg = err.result_msg;
  };

  return {
    result_code: result_code,
    result_msg: result_msg
  };
};

/**
 * 단일 파일 업로드
 */
router.post('/upload/single', (req, res) => {
  
  // name 속성이 imageUpload 인 경우에 대한 업로드 수행
  const upload = initMulter().single('imgFile'); 
  

  upload(req, res, (err) => {
    // file은 single, files는 array에 사용
    console.log('이미지 정보 >>> ', req.file);
    
    // 에러여부를 확인하여 결과코드와 메시지를 생성한다.
    let { result_code, result_msg } = checkUploadError(err);
    
    if(err) {
      res.status(result_code).json({ 
        success: false, message: err, result: result_msg 
      });
    } else {
      res.status(result_code).json({
        success: true, message: result_msg, filePath: req.file
      });
    };
  });
});


/**
 * 다중 파일 업로드
 */
router.post('/upload/multiple', (req, res) => {

  const upload = initMulter().array('imgFile');

  upload(req, res, (err) => {
    console.log('이미지 정보 >>> ', req.files);

    // 에러여부를 확인하여 결과코드와 메시지를 생성한다.
    let { result_code, result_msg } = checkUploadError(err);
    
    if(err) {
      res.status(result_code).json({ 
        success: false, message: err, result: result_msg 
      });
    } else {
      res.status(result_code).json({
        success: true, message: result_msg, filePath: req.files
      });
    };
  });
});

export default router;