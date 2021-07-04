const express = require('express')
const router = express.Router()

// add project model for CRUD Operations
//const mongoose = require('mongoose');
const Project = require("../models/project");
//const Pro = mongoose.model('Pro')
router.get('/index', (req,res,next) => {
    // use project model to fetch all projects for display
    Project.find((err,projects) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            // load the index view
            // set the title
            // pass the query resultset as projects
            res.render('Projects/index', {
            title:'My Project',
            projects: projects})
            
        }
    })
})

// Get /projects/add
router.get('/add',(req,res,next)=>{
    res.render('Projects/add', {title:'ProjectDetails'})
})

// Post /projects/add
router.post('/add', (req,res,next) => {
    //use the project model to save the form data to MongoDB
    // Pro represent our model 
    // our model is mongoose schema
    Project.create({
        name:req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course
    },(err,newProject) => {
        //now we need to check if we get the error or we get the 
        // new document back
        if (err)
        {
            console.log(err)
        }
        else
        {
            // if successful redirect to the project index
            res.redirect('/Projects/index')
        }
    })
})

module.exports = router;