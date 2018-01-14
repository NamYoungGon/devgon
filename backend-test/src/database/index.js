const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { url, options } = require('./../config').database

mongoose.connect(url, options)
mongoose.Promise = global.Promise
autoIncrement.initialize(mongoose.connection)

mongoose.connection.on('open', () => {
    console.log('connected database')
})

mongoose.connection.on('disconnected', () => {
    console.log('disconnected database')
})