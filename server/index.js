require("dotenv").config();
const fs = require("fs");
const https = require("https");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const form_data = multer();

const upload = multer({ dest: "uploads/" });
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  //AWS SDK 설정 항목
  accessKeyId: process.env.AWS_S3_ACCESS_KEYID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: "us-east-1",
});

const storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "euilimchoibucket", //bucket 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
});

const controllers = require("./controllers");

const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(form_data.array());

//로그인, 아웃
app.post("/users/login", controllers.login); //로그인
app.get("/users/logout", controllers.logout); //로그아웃
app.post("/users/oauth", controllers.oauth); //oauth 로그인

//신규 유저 가입, 탈퇴, 유저 정보 조회, 유저 정보 변경
app.post("/users", controllers.signup); // 유저 정보 변경
app.delete("/users", controllers.signout); // 회원 탈퇴
app.get("/users", controllers.userinfo); // 유저 정보 조회
app.patch("/users", controllers.changeinfo); // 유저 정보 변경
app.post("/users/check", controllers.checkinfo); // 중복 조회

//음식점 정보 조회, 사진업로드, 사진 업로드, 사진 삭제
app.get("/shops/:shop_id", controllers.shopinfo); // 음식점 정보 조회
app.post("/shops-pics", controllers.shoppic.post); //
app.delete("/shops-pics", controllers.shoppic.delete);
app.get("/shops-tags", controllers.shoptag.get);
app.post("/shops-tags", controllers.shoptag.post);
app.delete("/shops-tags", controllers.shoptag.delete);
app.patch("/shops-tags", controllers.shoptag.patch);

//아티클 조회, 업로드, 삭제, 수정
app.post("/articles", controllers.createarticle);
app.delete("/articles", controllers.delarticle);
app.patch("/articles", controllers.patcharticle);
app.get("/articles/:article_id", controllers.article);

//리뷰 조회, 업로드, 삭제, 수정, 리뷰사진 업로드, 리뷰사진 삭제
app.post("/reviews", storage.array("img"), controllers.createreview);
app.delete("/reviews", controllers.delreview);
app.patch("/reviews", controllers.patchreview);
app.get("/reviews/:shopid", controllers.review);
app.post("/reviews-pics", controllers.reviewpic.post);
app.delete("/reviews-pics", controllers.reviewpic.delete);

//tag 조회, 업로드, 삭제
app.post("/tags", controllers.tag.post);
app.delete("/tags", controllers.tag.delete);
app.patch("/tags", controllers.tag.patch);

//프론트에서 데이터 받기
app.post("/data", controllers.data);
app.post("/crawling", controllers.crawling);

// 주제별 식당 추천
app.get("/topicshop/:topic", controllers.topicshop);

// review 테이블 정보 여러개 가져오기
app.post("/shopmanyreviews", controllers.shopmanyreviews);

// 즐겨찾기 추가/제거
app.post("/bookmark", controllers.bookmark);

//

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  db.sequelize.sync();
  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`server runnning ${HTTPS_PORT}`));
} else {
  db.sequelize.sync();
  server = app.listen(HTTPS_PORT);
}

module.exports = server;
