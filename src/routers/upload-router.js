import express from 'express';
import path from 'path';
import multer from 'multer';

const uploadRouter = express.Router();

const upload = multer({
  // storage : 어디에 저장할 것인지
  // 서버 디스크에 저장하거나 AWS S3와 같은 외부에 저장합니다.
  // multer-s3나 multer-google-storage와 같은 모듈을 찾아서 활용해봅시다
  storage: multer.diskStorage({
    //destination은 저장할 경로. 동일 경로 내 uploads에 저장할 것임.
    // uploads 폴더를 생성해 둘 것.
    destination(req, file, cb) {
      cb(null, 'src/public/uploads/');
    },
    // filename은 저장할 파일의 이름
    filename(req, file, cb) {
      // ext는 확장자 명을 말합니다.
      const ext = path.extname(file.originalname);
      // basename은 파일 이름입니다. 파일 이름 + 현재 시간 + 확장자로 정하겠습니다.
      //날짜를 붙이는 건 중복을 피하기 위함입니다.
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext,
      );
    },
  }),
});

// multer 미들웨어를 설정합니다.
// upload.single외에도 array, fields, none이 존재합니다.
// upload.single()에는 제출하는 input의 name을 적어주면 됩니다.
uploadRouter.post('/', upload.single('img'), (req, res) => {
  // 멀터가 해석한 이미지나 동영상은 req.file 객체 내부에 담깁니다.
  // 그 외의 정보는 req.body에 담깁니다.
  res.json({ url: `/static/uploads/${req.file.filename}` });
});

export { uploadRouter };
