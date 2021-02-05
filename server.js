const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json();



app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

app.get('/highscore', function(req, res) {
    const file = path.join(__dirname, 'build', '/scripts/highscore.json');
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    });

});

app.post('/highscore', jsonParser, function(req, res) {

    const newScore = req.body;

    const file = path.join(__dirname, 'build', '/scripts/highscore.json');
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        let highscore = JSON.parse(data);
        highscore.push(newScore);
        const newFile = JSON.stringify(highscore);
        fs.writeFile(file, newFile, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(newFile);
    });

    

});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on ' + process.env.PORT);
});


