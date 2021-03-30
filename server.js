const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const AWS = require('aws-sdk');
const config = require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/add', (req, res, next) => {
  //AWS 연결을 위한 세팅
  console.log(req.body);
  AWS.config.update(config.aws_remote_config); // aws의config를 세팅하는 부분
  const docClient = new AWS.DynamoDB.DocumentClient(); // mysql의 connection 과 비슷한 부분

  docClient.scan({ TableName: config.aws_table_name }, function (err, data) {
    const { Items } = data;

    const params = {
      TableName: config.aws_table_name,
      Item: {
        _id: Items.length,
        title: req.body.title,
        content: req.body.content,
      },
    };

    //실제 데이터를 넣는 부분
    docClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.get('/api/post', (req, res, next) => {
  AWS.config.update(config.aws_remote_config); // 접속을 위한 config 파일 세팅
  const _id = req.query.id; // get 을 할때 파라메터로 id를 추가
  const docClient = new AWS.DynamoDB.DocumentClient(); // connection 생성
  const params = {
    TableName: config.aws_table_name, // 우리가 조회할 테이블 설정
    KeyConditionExpression: 'info = :i', // 조회할 key를 설정
    ExpressionAttributeValues: {
      // 해당 key에 들어갈 값
      ':i': _id,
    },
  };

  //조회 쿼리
  docClient.query(params, function (err, data) {
    console.log('시작입니다.');
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        message: 'Loaded fruits',
        fruits: Items,
      });
    }
  });
});

app.get('/api/posts', (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: config.aws_table_name,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      res.send({
        success: false,
        message: 'Error: Server error',
      });
    } else {
      res.send(data);
    }
  });
}); // end of app.get(/api/fruits)

//
//
//

app.get('/api', (req, res) => {
  res.send({ mainTitle: 'Hello React!' });
});

app.post('/api/user', function (req, res) {
  console.log(req.body);
  const content = req.body;
  res.send({ content });
});

//
//
//

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// 파일들 담긴 곳 명시
app.use(express.static(path.join(__dirname, 'client/build')));
// 페이지 열기
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
