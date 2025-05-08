const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api', authRoutes)
app.use('/api/tasks', taskRoutes)

module.exports = app
