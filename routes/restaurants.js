var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function restaurants() {
  return knex('restaurants');
};

function employees() {
  return knex('employees');
};

function reviews() {
  return knex('reviews');
};

router.get('/', function(req, res) {
  restaurants().select().then(function(result) {
    res.render('pages/index', {restaurants: result});
  })
});

router.get('/new', function(req, res) {
    res.render('pages/new');
});

router.post('/', function(req, res) {
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
    res.redirect('/');
  })
});

router.get('/:id', function(req, res) {
  var the_id = req.params.id;
  restaurants().where('id', the_id).first().then(function(result) {
    reviews().where({restaurants_id: the_id}).then(function(result2) {
      res.render('pages/show', {restaurants: result, reviews: result2});
    })
  })
});

router.get('/:id/edit', function(req, res) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/edit', {restaurants: result});
  })
});

router.post('/:id', function(req, res) {
  restaurants().where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/');
  })
});

router.get('/:id/delete', function(req, res, next) {
  restaurants().where('id', req.params.id).del().then(function(result) {
    res.redirect('/');
  })
})

//Review routes
router.get('/:id/reviews/new', function(req, res, next) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/new-review', {restaurants: result});
  })
})

// delete
router.post('/:id/reviews/delete', function(req, res, next) {
  //
})

//Add new review
router.post('/:id/reviews', function(req, res, next) {
  var newReview = {
    name: req.body.name,
    date: req.body.date,
    rating: req.body.rating,
    review: req.body.review,
    restaurants_id: req.params.id
  }
  reviews().insert(newReview).then(function(result) {
    res.redirect('/restaurants/'+req.params.id);
  })
})

module.exports = router;
