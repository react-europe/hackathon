var express = require('express');
var rp = require('request-promise');
var _ = require('lodash');
var router = express.Router();

// NOTE: Shouldn't put the API key here but it's for my fake account anyway
var apiKey = '576826785cb5860472c47e6065704';
var angularJSMeetupName = 'angularjs-paris';
var reactJSMeetupName = 'ReactJS-Paris';

var addreactOrAngular = function(arr, reactOrAngular) {
  return _.map(arr, function(obj) {
    obj["reactOrAngular"] = reactOrAngular;
    return obj;
  });
};

var processCombinedResults = function(arr) {
  arr = _.map(arr, function(obj) {
    if (obj.photo) {
      obj.photoUrl = obj.photo.photo_link;
    }
    obj = _.pick(obj, 'name', 'joined', 'reactOrAngular', 'photoUrl');
    return obj;
  });
  arr = _.sortByOrder(arr, 'joined', 'desc');

  // Remove duplicates - keep only the latest
  var cache = {};
  arr = _.reject(arr, function(obj) {
    var exists = cache[obj.name];
    cache[obj.name] = true;
    return exists;
  });
  arr = _.shuffle(arr);
  return arr;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'React or Angular' });
});

router.get('/data', function(req, res, next) {
  var arr = [];
  rp('https://api.meetup.com/2/members?order=joined&page=100&desc=true&key=' + apiKey + '&group_urlname=' + angularJSMeetupName)
    .then(function(body) {
      arr = arr.concat(addreactOrAngular(JSON.parse(body).results, "angular"));
      return rp('https://api.meetup.com/2/members?order=joined&page=100&desc=true&key=' + apiKey + '&group_urlname=' + reactJSMeetupName)
    })
    .then(function(body) {
      arr = arr.concat(addreactOrAngular(JSON.parse(body).results, "react"));
      res.json(processCombinedResults(arr));
    });
});

module.exports = router;
