var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var validate = require('../lib/validations');

function restaurants() {
  return knex('restaurants');
};

function employees() {
  return knex('employees');
};

function reviews() {
  return knex('reviews');
};

// show restaurants homepage
router.get('/', function(req, res) {
  restaurants().select().then(function(result) {
    res.render('pages/index', {restaurants: result});
  })
});

// show add new restaurants page
router.get('/new', function(req, res) {
    res.render('pages/new', {errors:[]});
});

// post new restaurant with validations
router.post('/new', function(req, res) {
  var newRestaurant = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    image: req.body.image,
    bio: req.body.bio
  };
  var errors=[];
  errors.push(validate.nameIsNotBlank(req.body.name));
  errors.push(validate.cityIsNotBlank(req.body.city));
  errors.push(validate.imageIsNotBlank(req.body.image));
  errors.push(validate.bioIsNotBlank(req.body.bio));
    errors = errors.filter(function(error) {
      return error.length;
    })
      if (errors.length) {
        res.render('pages/new', {errors: errors})
      } else {
      restaurants().insert(newRestaurant).then(function(result) {
        res.redirect('/');
    })
  }
});

// restaurant show page
router.get('/:id', function(req, res) {
  var the_id = req.params.id;
  restaurants().where('id', the_id).first().then(function(result) {
    reviews().where({restaurants_id: the_id}).then(function(result2) {
      employees().where({restaurants_id: the_id}).then(function(result3) {
      res.render('pages/show', {restaurants: result, reviews: result2, employees: result3});
      })
    })
  })
});

// edit restaurant page
router.get('/:id/edit', function(req, res) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/edit', {restaurants: result});
  })
});

// post edited restaurant
router.post('/:id', function(req, res) {
  restaurants().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/');
  })
});

// delete restaurant
router.get('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).del().then(function(result) {
    res.redirect('/');
  })
});

module.exports = router;
