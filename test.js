var badDustContition = 80;
var get_request = require("request");

var fetch_options = {
  url: 'http://apis.skplanetx.com/weather/current/hourly?lon=127.060539&stnid=&lat=37.650433&version=1',
  headers: {
    'Accept': 'application/json',
    'Accept-Language': 'ko_KR',
    'appKey': '75dac6b1-0d2a-3596-b277-d36d6b8df60f'
  }
}

function fetch_callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
    console.log(body);
    var post_request = require("request");
  }
}

function startDustObserving() {
    function triggerGetRequest() {
    get_request(fetch_options, fetch_callback);
  }
  console.log("이거 졸라 호출됨");
  triggerGetRequest();
}
