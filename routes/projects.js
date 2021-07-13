const express = require('express')
const router = express.Router()

// add project model for CRUD Operations
//const mongoose = require('mongoose');
const Project = require("../models/project");
const Course = require("../models/course");
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
    // use Course model to fetch list of courses for dropdown
    Course.find((err,courses) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.render('Projects/add', 
            {title:'ProjectDetails',
            courses: courses
        })
        }
    }).sort({courseCode:1})
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

// Get /project/delete/abc123
// we are going to write a new get handler
// this id is not a literal its a placeholder value
// and it represent mongodb project id
router.get('/delete/:_id', (req,res,next)=> {
    // use the Project model to delete the selected document
    // just like our model has built in find method, create method
    // we have remove method
    Project.remove({_id:req.params._id} , err => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.redirect('/Projects/index');

        }
    })
    // so we reading this parameter from url
});

// Get /project/edit/abc231
router.get('/edit/:_id', (req,res,next) =>{
    Project.findById(req.params._id, (err,project) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            // get the courses for drop down
            Course.find((err,courses)=>{
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.render('Projects/edit', {
                    title:'Project Details',
                    project: project,
                    courses: courses
                    })

                }
            })
            
        }
    })
})
module.exports = router;