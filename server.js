//Required modules
var express = require('express');
	app = express();
	mongoose = require('mongoose');
	bodyParser = require('body-parser');
	port = process.env.PORT || 3000;
	mongourl = process.env.MONGODB_URI;
	cors = require('cors');
	jwt = require('jsonwebtoken');
	//Front End packages
	createError = require('http-errors');
  	path = require('path');
  	cookieParser = require('cookie-parser');
  	logger = require('morgan');
  	session = require('express-session');
	bodyParser = require('body-parser');
	//Models
	Product = require('./api/models/product');
	ECX = require('./api/models/ecx');
	Solution = require('./api/models/solution');


//Connect to Mongo
async function dbconnection(){
	mongoose.connect(mongourl, {useNewUrlParser: true,useUnifiedTopology: true }).then( 
			() => {
				console.log('Database connection established')
		},
		error => {
			console.log(error.reason),
			dbconnection()
		});
}

dbconnection().catch(error => console.log(error))
//Routes
var indexRouter = require('./routes/index');
var product = require('./api/routes/productroute');
var ecx = require('./api/routes/ecxroute');
var solution = require('./api/routes/solutionroute');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Front End static Routes
app.use('/tablesort', express.static(__dirname + '/node_modules/tablesort/src')); // redirect bootstrap JS
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/moment/')); // redirect JS jQuery
app.use('/public', express.static(__dirname + '/public')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));


indexRouter(app);
product(app);
ecx(app);
solution(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('App started on: ' + port);