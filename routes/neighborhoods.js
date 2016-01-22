var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');

function neighborhoods() {
  return knex('neighborhoods');
};

// show all neighborhoods page
router.get('/', function(req, res, next) {
  neighborhoods().select().then(function(result) {
    var latArray = [];
    var google_api = 'https://maps.googleapis.com/maps/api/geocode/json';
    for (var i = 0; i < result.length; i++) {
      latArray.push(result[i].epicenter);

    var address = '?address='+latArray[i]+'';

    var my_key = '&key='+'AIzaSyC_AEJoor25uoZy70X3iaMELWOJe14n8HE';
      request(google_api+address+my_key, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var jase = JSON.parse(body);
          var lat_long = jase.results[0].geometry.location;

              //console.log(latArray);
                res.render('pages/neighborhoods', {lat_long: latArray, neighborhoods: result});
        }
      })
    }
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
