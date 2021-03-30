const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/add', function (req, res) {
  console.log(req.body);
  res.send('전송완료');
});

//
//
//

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Wazzappppp');
});
