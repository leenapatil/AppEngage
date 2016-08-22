var express 		= require('express');
var app 			= express();
var cookieParser 	= require('cookie-parser');
var bodyParser  	= require('body-parser');
var config			= require('./config/config');
var logger 			= require('./config/log.js');
//API Routes Embeding
var crashController = require('./server/controllers/crashController');
var dashboardController = require('./server/controllers/dashboardController');
try{
var userDashboardController = require('./server/controllers/userDashboardController');
var userValidationController = require('./server/controllers/userValidationController');
var sessionController = require('./server/controllers/sessionController');
}catch(ex){
	console.error(ex);
}

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/landing-page.html');
});

app.get('/appengage/getCrashCounters', crashController.crashCounters);
app.get('/appengage/getCrashDetails', crashController.crashDetail);
app.get('/appengage/getDashBoardCounters', dashboardController.dashboardCounters);
app.get('/appengage/getDashBoardRealTime',dashboardController.dashboardRealTime);
app.get('/appengage/getUserInsights',sessionController.getUserInsights);
app.get('/appengage/getSessionInsights',sessionController.getSessionInsights);
app.get('/appengage/getDeviceCounters',userDashboardController.getUserDashboardCounters);
app.get('/appengage/getUserValidated',userValidationController.validateUser);

var server = app.listen(config.port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Application listening at http://%s:%s', host, port);
});
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname));