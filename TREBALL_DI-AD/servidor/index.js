const fs = require("fs")
const https = require("https")
const express = require("express");
const app = express();

https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(3000, function () {
    console.log('Authentication service started on port 3000');
});

const users = [{
    username: 'john',
    password: 'password123admin',
    role: 'admin'
}, {
    username: 'anna',
    password: 'password123member',
    role: 'member'
}
];

const registrar = [
    {
        dni: "",
        username: "",
        password: "",
        full_name: "",
        avatar: ""
    }
]


const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const accessTokenSecret = 'laParaulaSecretaDelServidor';
const refreshTokenSecret = 'laParaulaSecretaDeRenovacioDelServidor';


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const comprovar = users.find(u => {
        return u.username === username && u.password === password
    });

    if (comprovar) {
        res.send("El usuari ja esta registrat. Inicia Sessio.")

    } else {
        
    }
})



// colecció de tokens per a regenerar
const refreshTokens = [];
app.post('/login', (req, res) => {
    // llegim les dades de login que ens envia l'usuari
    const { username, password } = req.body;

    // compromvem que son correctes. DEuria ser a BBDD
    const user = users.find(u => {
        return u.username === username && u.
            password === password
    });

    if (user) {
        // Creem el token de l'usuari. Caduca en 20 minuts
        const accessToken = jwt.sign(
            { username: user.username, role: user.role }, // dades que inclou el token
            accessTokenSecret, // password per generar - lo
            { expiresIn: '1m' } // caducitat
        );

        // creem altre token per a regenerar. No caduca
        const refreshToken = jwt.sign(
            { username: user.username, role: user.role },
            refreshTokenSecret);

        refreshTokens.push(refreshToken);

        // enviem el token d'accés i el de refresc
        res.json({ accessToken, refreshToken });

    } else {
        res.send('Username o password incorrectes');
    }
});

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;

    if (authHeader) { // si hi ha toquen recuperem el jwt
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {

            if (err) {
                return res.sendStatus(403);
            }

            // afegim a la petició les dades que venien en el jwt user
            req.user = user;

            // s'executa la segïuent funció, un cop s'ha fet el middleware
            next();
        });

    } else { // no està. contestem directament al client amb un error
        res.sendStatus(401);
    }
};

app.get('/contactos', authenticateJWT, (req, res) => {
    const user = req.user;

    if (user.role === 'admin') {
        res.json({ "contactos": "Lista de Contactos" })

    } else {
        res.sendStatus(402);
    }
});

app.post('/token', (req, res) => {
    // token de refresc
    const { token } = req.body;

    // comprovem si me l'ha enviat l'usuari
    if (!token) {
        return res.sendStatus(401);
    }

    // aquest token de refresc és dels vàlids al meu servidor (està a l'array)
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    // el verifiquem, amb el password de refresc
    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        //generem un nou token
        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            accessTokenSecret,
            { expiresIn: '20m' });

        // li retornenm al client
        res.json({
            accessToken
        });
    });
});
