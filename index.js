const express = require('express');
const https = require('https');
const cors = require('cors')
const fs = require('fs');
const jwt = require('jsonwebtoken')
//const auth = require('./auth'); // auth
const path = require('path');
const bodyParser = require('body-parser'); //to parse body
// server settings, https, port etc
const PORT = 3443;
const key = fs.readFileSync(__dirname + '\\selfsigned.key');
const cert = fs.readFileSync(__dirname + '\\selfsigned.crt');
const options = {
  key: key,
  cert: cert
};
const whitelist = [
  'http://localhost:3000'
];
const corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
const app = express();
app.use(cors(corsOptions));
app.use(express.static('build'));
app.use(bodyParser.json())
//app.use(auth)

// react app path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// api path
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'api', 'test.json'))
})

//auth // u need body-parser
const login = 'admin';
const password = 'admin';
app.post('/login', function (req, res) {
  console.log(req.body)
  const auth = { login: req.body.login, password: req.body.password }
  if (auth.login === login && auth.password === password) {
    //res.set('success')
    res.status(200).send({
      refreshToken: 'G5-RVeu0TjIH-hsXp1TvEhn2figiocnedtFu7GV1Hbo',
      accessToken: 'rxk-X3rnAy9Yginy-Ieb_z3szPHAmzowqEj6bdo1eG0',
      isActivated: 'true',
      isAuthorized: 'true'
    })
  }
  else {
    //res.set('bad credentials')
    res.status(401).send('auth is invalid')
  }
})
app.get('/login', (req, res) => {
  res.status(404).send('login get')
})


const server = https.createServer(options, app)
server.listen(PORT, () => { console.log('server started') })

// npm run-script nodemon - start app
// https://localhost:3443/
// sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt