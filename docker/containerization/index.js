const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello From The Docker World!');
});
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});