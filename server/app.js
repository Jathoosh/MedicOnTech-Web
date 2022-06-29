const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const apiRouter = require('./routes/api.js')



const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'demo secret', saveUninitialized: true, resave: true }))
app.use(express.static(path.join(__dirname, '../client')))


app.use('/api/', apiRouter)

module.exports = app
