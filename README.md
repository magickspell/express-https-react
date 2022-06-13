# express-https-react
<p>easy https server with node.js</p>
<br><br>
<p> generate CRT: sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt</p><br>
<p>run server: npm run-script nodemon - start app (port 3433 by default)</p>
<br>
<p>
  selfsigned crt shuold be add to trusted root crt and google chrome should be started with "--ignore-certificate-errors" or trusted with antivirus or you shoul disable chrome "secure srever check" flag
</p>
<br>
