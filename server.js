var express = require('express');
	app = express();
	mongoose = require('mongoose');
	Product = require('./api/models/product'),
	//User = require('./api/models/users'),
	bodyParser = require('body-parser');
	port = process.env.PORT || 3000;
	mongourl = process.env.MONGODB_URI;
	cors = require('cors');
	jwt = require('jsonwebtoken');

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
//var client = require('./routes/routeclient');
//var all = require('./routes/allroutes');
var product = require('./api/routes/productroute')
//var auth = require('./api/middleware/auth');
// view engine setup


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(auth);
product(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);

console.log('Quote RESTful API server started on: ' + port);