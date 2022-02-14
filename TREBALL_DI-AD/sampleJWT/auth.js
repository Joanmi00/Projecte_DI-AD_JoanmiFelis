const express = require("express");
const app = express();

app.listen(3000, () => {
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


const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const accessTokenSecret = 'laParaulaSecretaDelServidor';

app.post('/login', (req, res) => {
    // Llegim username and password des del cos
    const { username, password } = req.body;

    // Filtrem de l'array d'usuaris, i comprovem si existeix o no
    const user = users.find(u => {
        return u.username === username && u.password === password
    });

    if (user) {
        // Generarem el token
        const accessToken = jwt.sign(
            {
                username: user.username, role:
                    user.role
            },
            accessTokenSecret);

        // carreguem el la resposta el jwt que hem generat
        res.json({ accessToken });
    } else {
        res.send('Username or password incorrect');
    }
});

const authenticateJWT = (req, res, next) => {
    // arrepleguem el JWT d'autorització
    const authHeader = req.headers.authorization;
    if (authHeader) { // si hi ha toquen
        // recuperem el jwt
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
        401(unauthorized)
        res.sendStatus(401);
    }
};

app.get('/contactos', (req, res) => {
    res.json({ "contactos": "Lista de Contactos" })
})


