const express = require('express');
const app = express();
const http = require('http');
// const debug = require('debug')()
const helmet = require('helmet');
const clc = require("cli-color");
const mongoose = require('mongoose');
const server = http.Server(app);
const bodyParser = require("body-parser");
const env = require('./readenv');
const Ddos = require('ddos');
const ddos = new Ddos({ burst: parseInt(env.ddos_burst), limit: parseInt(env.ddos_limit) });
const port = env.port || 3000;



if (env.node_env !== "production") {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(require('express-request-response-logger')());
}

app.use(ddos.express)
app.use(require('sanitize').middleware);
app.use(helmet())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname + '/dist/new-app'))
app.use(express.static(__dirname + '/assets/icons'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/placeholder'));



// connect db
mongoose.connect(env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function () {
  console.log(clc.bgGreen("the database is connected!"))
}).on('error', function () {
  console.log(clc.bgRed.blue("DB connection error!"));
});

// routes:
const buy = require('./routes/buy');
const getSettings = require('./routes/getSettings');
const auth = require('./routes/auth');
const signUp = require('./routes/signUp');
const getProducts = require('./routes/getProducts');
const getSales = require('./routes/getSales');
const saveNewProduct = require('./routes/saveNewProduct');
const editProduct = require('./routes/editProduct');
const editSettings = require('./routes/editSettings');
const actions = require('./routes/actions');
const searchUser = require('./routes/searchUser');
const deleteProduct = require('./routes/deleteProduct');
const removeUser = require('./routes/removeUsers');
const buildCart = require('./routes/buildCart');
const getcountries = require('./routes/getCountries');


app.use(buildCart);
app.use(buy);
app.use(getSettings);
app.use(auth);
app.use(signUp);
app.use(getProducts);
app.use(getSales);
app.use(saveNewProduct);
app.use(editProduct);
app.use(editSettings);
app.use(actions);
app.use(searchUser);
app.use(deleteProduct);
app.use(removeUser);
app.use(getcountries);

// start server
server.listen(port, () => {
  console.log('started on port: ' + clc.cyan.bold(port));
});