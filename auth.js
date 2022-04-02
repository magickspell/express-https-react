function auth() {
    //auth // u need body-parser
    const login = 'admin';
    const password = 'admin';
    app.post('/login', function (req, res) {
        console.log(req.body)
        const auth = { login: req.body.login, password: req.body.password }
        if (auth.login === login && auth.password === password) {
            //res.set('success')
            res.status(200).send('autk ok')
        }
        else {
            //res.set('bad credentials')
            res.status(401).send('auth is invalid')
        }
    })
    app.get('/login', (req, res) => {
        res.status(404).send('login get')
    })
}

module.exports = auth