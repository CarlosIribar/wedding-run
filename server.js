const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  console.log('login');
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on http://localhost:8080');

});
