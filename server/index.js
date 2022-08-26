/**
 * @filename: index.js
 * @author: 박찬우
 * @description: - express 객체 생성 및 추가 설정
 *               - 사용할 백엔드 정의
 *               - 서버 구동
 */

/** 패키지 참조 */
import path from 'path';                      // 내장 모듈 참조
import express from 'express';                // express 참조
import dotenv from 'dotenv';                  // env 파일 사용
import userAgent from 'express-useragent';    // 클라이언트의 정보를 조회할 수 있는 패키지
import bodyParser from 'body-parser';         // POST 파라미터 처리
import methodOverride from 'method-override'; // PUT 파라미터 처리
import cookieParser from 'cookie-parser';     // Cookie 처리
import expressSession from 'express-session'; // Session 처리
import cors from 'cors';                      // cors 처리
import serveStatic from 'serve-static';       // 특정 폴더의 파일을 URL로 노출시킴

/** 라우터 */
import users from './router/users.js';
import reception from './router/reception.js';
import inquiry from './router/inquiry.js';
import review from './router/review.js';
import like from './router/like.js';
import fileUpload from './router/fileUpload.js';


/** Express 객체 생성 */
const app = express();

// 프로젝트 폴더 위치
const __dirname = path.resolve();

// 보안성을 높이기 위한 config.env 파일 참조
dotenv.config({ path: path.join(__dirname, '../env/config.env') });


/** 클라이언트 접속 이벤트 */
app.use(userAgent.express());
app.use((req, res, next) => {
  console.log('클라이언트가 접속했습니다.');

  res.on('finish', () => {
    console.log('클라이언트의 접속이 종료 되었습니다.');
  });

  next();
});


/** Express 객체 추가 설정 */
// cors 해결
app.use(cors());

// 업로드 된 파일이 저장될 폴더를 URL에 노출함
app.use('/', serveStatic(process.env.PUBLIC_PATH));
app.use(process.env.UPLOAD_URL, serveStatic(process.env.UPLOAD_DIR));

// POST 파라미터 수신 모듈 설정
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());  // TEXT형식의 파라미터 수신 가능
app.use(bodyParser.json());  // JSON형식의 파라미터 수신 가능

// HTTP PUT, DELETE 전송방식 확장 
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

// 쿠키를 처리할 수 있는 객체 연결
app.use(cookieParser());

// // 세션 설정
// app.use(expressSession({
//   // key: 'loginData',
//   secret: process.env.SESSION_ENCRYPT_KEY,  // 암호화 키
//   resave: false,  // 세션이 초기화 되지 않더라도 새로 저장할지 여부 (일반적으로 false)
//   saveUninitialized: false,  // 세션이 저장되기 전에 기존의 세션을 초기화 상태로 만들지 여부
//   cookie: {
//     expires: 60 * 60 * 24,
//     httpOnly: true
//   }
// }));


/** router 사용 */
app.use('/api/users', users);
app.use('/api/reception', reception);
app.use('/api/inquiry', inquiry);
app.use('/api/review', review);
app.use('/api/like', like);

app.use('/api/image', fileUpload);


/** 서버 구동 */
app.listen(process.env.PORT || 5000, () => {
  console.log('-----------------------------------');
  console.log('|       Start Express Server      |');
  console.log('-----------------------------------');
  console.log('- - - - - - - - - - - - - - - - - -');
});