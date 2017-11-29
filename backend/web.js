const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const config = require('./config')
const database_loader = require('./db/loader')
const route_loader = require('./routes/loader')

const app = express()
app.set('port', process.env.PORT || config.port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

route_loader.init(app, express.Router())

app.listen(app.get('port'), () => {
    console.log('Run server')

    database_loader.init(app, config)
})