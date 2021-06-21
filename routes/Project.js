const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    res.render('Projects/index', 
    {title:'My Project',
    parText:'My First Para Text'})
})

module.exports = router