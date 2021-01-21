const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
 const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on ' + process.env.PORT);
});


