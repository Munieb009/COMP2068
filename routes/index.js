var express = require('express');
var router = express.Router();
// User model & passport for auth
const User = require('../models/user')
const passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EXPRESSTRACKER' });
});

/* Get register */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Please create an account' });
});

/* POST /register */
router.post('/register', (req, res, next) => {
  // invoke User model which extends passport-local-mongoose to create a new user in the db
  // password gets passed as separate param for hashing
  User.register(new User( {
    // above register is a built in function
    // and this username is coming from our view
    username: req.body.username
    //password here is passed seprately because it can be hashed
    // thats the reason its seprate from username or phone number etc
  }), req.body.password, (err, newUser) => {
    if (err) {
      // in case of error reload the register page
      return res.redirect('/register')
    }
    else {
      // login the user in automatically & go to projects list
      req.login(newUser, (err) => {
        res.redirect('/Projects/index')
      })
    }
  })
})

/* Get login */
router.get('/login', function(req, res, next) {
  // check for login error messages in the session object and display them if any
  let messages = req.session.messages || [];
  req.session.messages = []; // clear out any session messages
  res.render('login', { title: 'Please enter your Credentials',
  messages: messages // pass any error messages to the view for display
})
});

/* POST /login */ // use passport to authenticate the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/Projects/index',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login' // this gets stored in session var
}))

/* GET /logout */ // sign user out
router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router;
