const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordSchema = new Schema({
    word: String,
    level: Number,
    users: [ String ]
})

module.exports = mongoose.model('Word', wordSchema)