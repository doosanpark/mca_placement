var express = require('express');
var app = express();
var user = require('../router/user');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
const port =process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));
/*
var myLogger = function(req, res, next){
    console.log(req.url);
    next();
};
app.use(myLogger);
*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/user', user);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})