var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

function neighborhoods() {
  return knex('neighborhoods');
};

// show neighborhoods page
router.get('/', function(req, res, next) {
  var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=1430+Larimer+St,+Denver,+CO';
  var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
    request(google_api+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var lat_long = jase.results[0].geometry.location;
          res.render('pages/neighborhoods', {lat_long: lat_long});
    }
  })
});

// show individual neighborhood page
router.get('/:id', function(req, res, next) {
  neighborhoods().where('id', req.params.id).first().then(function(result) {
    var address = result.epicenter;
    address.replace(/ /g,'+');
    var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'';
    var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
    request(google_api+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var neighborhoodName = jase.results[0].address_components[2].long_name;
        var lat_long = jase.results[0].geometry.location;
          res.render('pages/neighborhood-indv', {lat_long: lat_long, neigborhoods: result});
      }
    })
  })
})

module.exports = router;
