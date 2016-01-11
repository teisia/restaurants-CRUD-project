var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://localhost/eat'
});

function restaurants() {
  return knex('restaurants');
}

router.get('/restaurants', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/index', {restaurants: result});
  })
});

router.get('/restaurants/new', function(req, res, next) {
    res.render('pages/new');
});

router.post('/restaurants', function(req, res, next) {
  console.log(req.body.state);
  var newRestaurant = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    image: req.body.image,
    bio: req.body.bio
  }
  restaurants().insert(newRestaurant).then(function(result) {
    res.redirect('/restaurants');
  })
});

router.get('/restaurants/:id', function(req, res, next) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/show', {restaurants: result});
  })
});

router.get('/restaurants/:id/edit', function(req, res, next) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/edit', {restaurants: result});
  })
});

router.post('/restaurants/:id', function(req, res, next) {
  restaurants().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/restaurants');
  })
});

module.exports = router;
