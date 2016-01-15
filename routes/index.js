var express = require('express');
var router = express.Router();

var knex = require('../db/knex')({
  function restaurants() {
    return knex('restaurants');
  }
  function employees() {
    return knex('employees');
  }
});

router.get('/', function(req, res, next) {
    res.redirect('/restaurants');
});

router.get('/restaurants', function(req, res, next) {
  restaurants().select().then(function(result) {
    res.render('pages/index', {restaurants: result});
  })
});

router.get('/restaurants/new', function(req, res, next) {
    res.render('pages/new');
});

router.post('/restaurants', function(req, res, next) {
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

router.get('/restaurants/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).del().then(function(result) {
    res.redirect('/restaurants');
  })
})

router.get('/admin', function(req, res, next) {
  restaurants().select().then(function(result1) {
    employees().select().then(function(result2) {
      res.render('pages/admin', {restaurants: result1, employees: result2})
    })
  })
})



module.exports = router;
