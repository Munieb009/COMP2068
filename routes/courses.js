const express = require('express')
const router = express.Router()
const Course = require ('../models/course.js')
// passport for auth
const passport = require('passport')
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { // user is already authenticated
        return next() // do the next thing in the request i.e. continue with the calling function
    }

    res.redirect('/login') // anonymous user tried to access a private method => go to login
}
router.get('/add',isLoggedIn ,(req,res,next) => {
    res.render('courses/add',{title: 'Add a course',
    user: req.user})
})
router.post('/add' ,isLoggedIn,(req,res,next) => {
    Course.create({
        courseCode: req.body.courseCode
    },(err,newProject) => {
                if (err){   
                    console.log(err)
                }
                else
                {
                    res.redirect('/')
                }
})
})
module.exports = router;