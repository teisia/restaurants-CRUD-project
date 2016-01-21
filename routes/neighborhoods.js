var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

function neighborhoods() {
  return knex('neighborhoods');
};


function getMap(epicenter) {
  var lats;
  console.log("epicenter is: " + epicenter)
  var google_api = 'https://maps.googleapis.com/maps/api/geocode/json';
//  var epicenter = result[0].epicenter.split(' ').join('+');
  var address = '?address='+epicenter+'';
  var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
    request(google_api+address+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var lat_long = jase.results[0].geometry.location;
        lats = lat_long
    }
    return lats;
  })
  console.log("global lats: " + lats);
}

// show all neighborhoods page
router.get('/', function(req, res, next) {
  neighborhoods().select().then(function(result) {
  //  var array = [];
    var latArray = [];
    for (var i = 0; i < result.length; i++) {
      // array.push(result[i].epicenter);<!--
      console.log(getMap(result[i].epicenter))
      latArray.push(getMap(result[i].epicenter));
      }
    //  for (var i = 0; i < array.length; i++) {
  //      latArray.push(getMap('7889 allison way arvada co 80005'));
  //    }
      console.log("lat array is: " + latArray)
        res.render('pages/neighborhoods', {lat_long: {lat: 0, lng: 0}, neighborhoods: result});
  })
});

// show add new neighborhood page
router.get('/new', function(req, res, next) {
  res.render('pages/neighborhood-new');
});

// show individual neighborhood page
router.get('/:id', function(req, res, next) {
  neighborhoods().where('id', req.params.id).first().then(function(result) {
    var address = result.epicenter.split(' ').join('+');
    var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'';
    var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
    request(google_api+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var city = jase.results[0].address_components[3].long_name;
        var state = jase.results[0].address_components[5].long_name;
        var lat_long = jase.results[0].geometry.location;
          res.render('pages/neighborhood-indv', {lat_long: lat_long, neighborhoods: result});
      }
    })
  })
});

// show edit neighborhood page
router.get('/:id/edit', function(req, res, next) {
  neighborhoods().where('id', req.params.id).first().then(function(result) {
    res.render('pages/edit-neighborhood', {neighborhoods: result});
  })
})

// post edited neighborhood
router.post('/:id', function(req, res, next) {
  neighborhoods().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/neighborhoods');
  })
});

// delete neihborhood
router.get('/:id/delete', function(req, res, next) {
  neihborhoods().where('id', req.params.id).del().then(function(result) {
    res.redirect('/neighborhoods');
  })
});


module.exports = router;
