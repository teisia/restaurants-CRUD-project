module.exports = {
  loginChecker: function(req, res, next) {
    console.log(req.cookies);
    if (req.cookies.user === 'teisia' && req.cookies.password === 'password123'){
      next();
    } else if (req.cookies.user === 'donald' && req.cookies.password === 'iamdonald'){
      next();
    } else if (req.cookies.user === 'beyonce' && req.cookies.password === 'queenbey'){
      next();
    } else if (req.cookies.user === 'martha' && req.cookies.password === 'marthamydear'){
      next();
    } else {
      res.render('pages/admin');
    }
  }
}
