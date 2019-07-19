// app.js

// [LOAD PACKAGES]
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;
var hostname = '192.168.1.4';

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// [RUN SERVER]
var server = app.listen(port, hostname, function(){
 console.log("Express server has started on port " + port)
});

// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// CONNECT TO MONGOOSE
mongoose.connect('mongodb://localhost/test',
{ useNewUrlParser: true }
).then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

 // [CONFIGURE ROUTER]
 // var router = require('./routes')(app, Member);
 app.use('/members', require('./routes/members'));

 // DEFINE model
 // var Member = require('./models/member');
