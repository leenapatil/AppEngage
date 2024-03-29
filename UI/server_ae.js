//TODO Clustering https://nodejs.org/api/cluster.html
//node --optimize_for_size --max_old_space_size=460 --gc_interval=100 server.js
var express 		= require('express');
var app 			= express();
var cookieParser 	= require('cookie-parser');
var bodyParser  	= require('body-parser');
var config			= require('./config/config');
var logger 			= require('./config/log.js');
//API Routes Embeding
try{
var crashController = require('./server/controllers/crashController');
var dashboardController = require('./server/controllers/dashboardController');
var userDashboardController = require('./server/controllers/userDashboardController');
var userValidationController = require('./server/controllers/userValidationController');
var sessionController = require('./server/controllers/sessionController');
var locationController = require('./server/controllers/locationController');
var eventController = require('./server/controllers/eventsController');
var campaignController = require('./server/controllers/campaignController');
var cohortController = require('./server/controllers/cohortController');

var audienceController = require('./server/controllers/audienceController');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/appengage/getCrashCounters', crashController.crashCounters);
app.get('/appengage/getCrashDetails', crashController.crashDetail);
app.get('/appengage/getDashBoardCounters', dashboardController.dashboardCounters);
app.get('/appengage/getDashBoardRealTime',dashboardController.dashboardRealTime);
app.get('/appengage/getUserInsights',sessionController.getUserInsights);
app.get('/appengage/getSessionInsights',sessionController.getSessionInsights);
app.get('/appengage/getDeviceCounters',userDashboardController.getUserDashboardCounters);
app.get('/appengage/getUserValidated',userValidationController.validateUser);
app.get('/appengage/getUserNameValidated',userValidationController.validateUserName);
app.post('/appengage/registerUser',userValidationController.registerUser);
app.get('/appengage/getLocationCounters',locationController.getLocationCounters);
app.get('/appengage/getEventNames',eventController.getEventNames);
app.get('/appengage/getEventSummary',eventController.getEventSummary);
app.get('/appengage/getEventsComparison',eventController.getEventsComparison);
app.post('/appengage/createCampaign',campaignController.createCampaign);
app.put('/appengage/updateCampaign',campaignController.updateCampaign);
app.delete('/appengage/deleteCampaign',campaignController.deleteCampaign);
app.get('/appengage/fetchAllCampaigns',campaignController.fetchAllCampaigns);
app.get('/appengage/fetchCohorts',cohortController.fetchCohorts);

// fetch api for Audience part for create query
app.get('/appengage/audience/mnu',audienceController.fetchAllManufacturer);
app.get('/appengage/audience/mnu/platform/:platform',audienceController.fetchManufacturerFromPlatform);

app.get('/appengage/audience/platform',audienceController.fetchAllPlatform);

app.get('/appengage/audience/os/platform/:platform',audienceController.fetchOSFromPlatform);
app.get('/appengage/audience/os',audienceController.fetchAllOS);

app.get('/appengage/audience/dt/platform/:platform',audienceController.fetchDevicetypeFromPlatform);
app.get('/appengage/audience/dt',audienceController.fetchAllDevicetype);

app.get('/appengage/audience/model/platform/:platform',audienceController.fetchModelFromPlatform);
app.get('/appengage/audience/model',audienceController.fetchAllModel);

app.get('/appengage/audience/appversion/platform/:platform',audienceController.fetchAppversionFromPlatform);
app.get('/appengage/audience/appversion',audienceController.fetchAllAppversion);

}catch(ex){
  console.log(ex);
}
var server = app.listen(config.port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Application listening at http://%s:%s', host, port);
});
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname));
