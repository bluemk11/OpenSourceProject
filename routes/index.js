var express = require('express'),
  todos = require('./todos'),
  User = require('../models/User');
var router = express.Router();
var get_request = require("request");
var badDustContition = 80;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/:lat/:lng', function(req, res, next) {
  var _lat = req.params.lat;
  var _lng = req.params.lng;

  var fetch_options = {
    url: 'http://apis.skplanetx.com/weather/current/hourly?lon='+_lng+'&stnid=&lat='+_lat+'&version=1',
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'ko_KR',
      'appKey': '75dac6b1-0d2a-3596-b277-d36d6b8df60f'
    }
  }

  function fetch_callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      console.log(body);
      console.log(info);
      console.log("=-======================");
      var post_request = require("request");
      console.log(info.weather.hourly[0]);
      res.render('index2', {
        location:info.weather.hourly[0].grid.city+' '+info.weather.hourly[0].grid.county+' '+info.weather.hourly[0].grid.village,
        lat: _lat,
        lng: _lng,
        tmax:info.weather.hourly[0].temperature.tmax+'*C',
        tmin:info.weather.hourly[0].temperature.tmin+'*C',
        tc:info.weather.hourly[0].temperature.tc+'*C',
        wspd:info.weather.hourly[0].wind.wspd+'(m/s)',
        sky:info.weather.hourly[0].sky.name,
        humidity:info.weather.hourly[0].humidity+'%',
        time:info.weather.hourly[0].timeRelease
      });
    }
  }

  function startDustObserving() {
    function triggerGetRequest() {
      get_request(fetch_options, fetch_callback);
    }
    triggerGetRequest();
  }
  startDustObserving();

});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.use('/todos', todos);

module.exports = router;
