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
app.get('/vitamins_api.php', (req,res) => {
  res.status(200).sendFile(path.join(__dirname, 'api', 'prodVitamins.json'))
})


//auth // u need body-parser
const login = 'admin';
const password = 'admin';
app.post('/login', (req, res) => {
  console.log(req.body)
  const auth = { login: req.body.login, password: req.body.password }
  if (auth.login === login && auth.password === password) {
    //res.set('success')
    res.status(200).send({
      username: req.body.login,
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

// questions
const totalQuest = 2;
const userAnswers = {
  username: 'admin',
  answers: []
}
app.post('/answers', (req, res) => {
  if(req.body.username) {
    res.status(200).send({
      answers: [{questionId: 1, iscomplete: true, answer: false, advice: 'откажитесь от сладкого'}]
    })
  }
  else {
    res.status(500).send('something went wrong on server')
  }
})
app.post('/question', (req, res) => {
  res.status(200).send({
    question: '1. Болит ли у Вас голова?',
    questionId: 1,
    totalQuest: totalQuest
  })
})
app.post('/questions', (req, res) => {
  if (req.body.questionId < 2) {
    res.status(200).send({
      question: '2. Высыпаетесь ли Вы?',
      questionId: 2,
      totalQuest: totalQuest
    })
  }
  else if (req.body.questionId >= totalQuest) {
    res.status(200).send(
      'Вы прошли тест'
    )
  }
  else {
    res.status(500).send('something went wrong on server')
  }
})

const server = https.createServer(options, app)
server.listen(PORT, () => { console.log('server started') })

// npm run-script nodemon - start app
// https://localhost:3443/
// sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
// check antivirus allow rules