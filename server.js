const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Wazzappppp');
});
