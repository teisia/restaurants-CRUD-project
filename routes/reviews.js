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

// show add new review page
router.get('/:id/reviews/new', function(req, res, next) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/new-review', {restaurants: result});
  })
});

//post new review
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
});

// show edit review page
router.get('/:id/reviews/:reviewid/edit', function(req, res, next) {
  reviews().where('restaurants_id', req.params.id).first().then(function(result){
    res.render('pages/edit-review', {reviews: result});
  })
});

// post edited review
router.post('/:id/reviews/:revid', function(req, res){
 var items = {
   name: req.body.name,
   date: req.body.date,
   rating: req.body.rating,
   review: req.body.review,
   restaurants_id: req.params.id
 }
 reviews().where('id', req.params.revid).update(items).then(function(result){
     res.redirect('/restaurants/'+req.params.id);
   })
})

// delete review
router.get('/:id/reviews/:reviewid/delete', function(req, res, next) {
  reviews().where('id', req.params.reviewid).del().then(function(result){
    res.redirect('/restaurants/'+req.params.id);
  })
});

module.exports = router;