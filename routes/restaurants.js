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

// post new restaurant and validate
router.post('/new', function(req, res) {
  var errors = [];
  var newRestaurant = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    image: req.body.image,
    bio: req.body.bio
  };
  if(!req.body.name.trim()) {
    errors.push("Restaurant name can't be blank")
  }
  if(!req.body.city.trim()) {
    errors.push("City can't be blank")
  }
  if(!req.body.image.trim()) {
    errors.push("Image can't be blank")
  }
  if(!req.body.bio.trim()) {
    errors.push("Bio can't be blank")
  } if (errors.length) {
    res.render('pages/new', {errors: errors})
  } else {
  restaurants().insert(newRestaurant).then(function(result) {
    res.send('/');
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

// show add new employee page
router.get('/:id/employees/new', function(req, res) {
  restaurants().where('id', req.params.id).first().then(function(result) {
    res.render('pages/new-employee', {restaurants: result});
  })
});

// post new employee
router.post('/:id/employees', function(req, res) {
var newEmployee = {
  first_name: req.body.first_name,
  last_name: req.body.last_namde,
  position: req.body.position,
  restaurants_id: req.params.id
}
employees().insert(newEmployee).then(function(result) {
  res.redirect('/restaurants/'+req.params.id);
  })
})

// show edit employee page
router.get('/:id/employees/:empid/edit', function(req, res, next) {
  employees().where('restaurants_id', req.params.id).first().then(function(result){
    res.render('pages/edit-employee', {employees: result});
  })
});

// post edited employee
router.post('/:id/employees/:empid', function(req, res){
 var items = {
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   position: req.body.position,
   restaurants_id: req.params.id
 }
 employees().where('id', req.params.empid).update(items).then(function(result){
     res.redirect('/restaurants/'+req.params.id);
   })
})

// delete employee
router.get('/:id/employees/:empid/delete', function(req, res, next) {
  employees().where('id', req.params.empid).del().then(function(result){
    res.redirect('/restaurants/'+req.params.id);
  })
});

// show full employee page
//router.get('/:id/employees', function(req, res, next) {
  //employees().where('restaurants_id', req.params.id).first().then(function(result){
    //res.render('pages/employees', {employees: result});
  //})
//});

module.exports = router;
