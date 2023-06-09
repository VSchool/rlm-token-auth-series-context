const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true, 
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        tyle: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema)