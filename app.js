/*
 * @(#)app.js
 */

/*
 * Author: Chengguang Yu
 * Created: 2017/06/06
 * Description: Defines the messenger app
 */

var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config/default');
var usersRoute = require('./routes/users');
var messengerRoute = require('./routes/messenger');

var rdir = __dirname;

var app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static(rdir + '/ui/app'));
app.use('/api/users', usersRoute);
app.use('/api/messenger', messengerRoute);

http.createServer(app).listen(config.port);

console.log('Server started at ' + config.port);
