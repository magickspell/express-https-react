const express = require('express');
const https = require('https');
const fs = require('fs');
var path = require('path');

// server settings, https, port etc
const PORT = 3443;
const key = fs.readFileSync(__dirname + '\\selfsigned.key');
const cert = fs.readFileSync(__dirname + '\\selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

const app = express();
app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const server = https.createServer(options, app)
server.listen(PORT, () => {console.log('server started')})

// npm run-script nodemon - start app
// https://localhost:3443/
// sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt