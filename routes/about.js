var express = require('express');
var router = express.Router();

router.get('/',(req,res,next) => {
    res.render('about',{title:'About the page',
    user: req.user})
});

module.exports = router;