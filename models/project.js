//reference to mongoose
const mongoose = require('mongoose');
//define project schema
var projSchema = new mongoose.Schema({
        name:{
            type: String,
            required : true
        },
        dueDate:{
            type:Date
        },
        course:{
            type: String,
            required : true
        }
    })
// export the schema so its public and visible to controller
module.exports= mongoose.model('Project',projSchema);