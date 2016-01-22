var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var validate = require('../lib/validations');

function neighborhoods() {
  return knex('neighborhoods');
};

// show all neighborhoods page
router.get('/', function(req, res, next) {
neighborhoods().select().then(function(result) {
  res.render('pages/neighborhoods', {neighborhoods: result});
  })
});

// show add new neighborhood page
router.get('/new', function(req, res, next) {
  res.render('pages/neighborhood-new');
});

// post new neighborhood
router.post('/',function(req, res, next) {
  var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+req.body.epicenter;
  var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
  request(google_api+my_key, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jase = JSON.parse(body);
      var neighborhoodListing = {
        name: req.body.name,
        epicenter: req.body.epicenter,
        latitude: jase.results[0].geometry.location.lat,
        longitude: jase.results[0].geometry.location.lng,
      }
  neighborhoods().insert(neighborhoodListing).then(function(result) {
      res.redirect('/neighborhoods');
      })
    }
  })
})

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
          res.render('pages/neighborhood-indv', {neighborhoods: result});
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
  neighborhoods().where('id', req.params.id).del().then(function(result) {
    res.redirect('/neighborhoods');
  })
});


module.exports = router;
