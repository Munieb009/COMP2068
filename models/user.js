const mongoose = require('mongoose')
// add new reference to passport-local-mongoose
// special model to manage user authentication

const plm = require('passport-local-mongoose')

// create schema

var userSchema = new mongoose.Schema({
    username: String,
    passworod: String,
    oauthId: String,
    oauthProvider: String,
    created: Date
})
// We plug in our schema here in passport local mongoose
userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema)