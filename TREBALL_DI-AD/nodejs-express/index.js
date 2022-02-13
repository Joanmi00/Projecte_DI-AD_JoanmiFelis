const fs = require("fs");
const https = require("https")
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5555

https.createServer({
  key: fs.readFileSync('my_cert.key'),
  cert: fs.readFileSync('my_cert.crt')
}, app).listen(PORT, function(){
  console.log("Servidor HTTPS escoltant al port" + PORT + "...");
});

//var corsOptions = {
  //origin: "http://localhost:8081"
//};
//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get('/hola', function(req, res){
  console.log('Hola, em note molt segur.');
});

require("./app/routes/tutorial.routes.js")(app);