const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const adminRoute = require('./routes/admins')
const developerRoute = require('./routes/developers')
const projectsRoutes = require('./routes/project')
const postRoute = require('./routes/posts')
const passport = require('passport')
const session = require('express-session')

const port = 3001
app.set('trust proxy', '127.0.0.1')

mongoose.connect('mongodb://localhost/__UPDATED_SCONSTRUCTION_DB__')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./config/error-handler'))

app.use(session({
  name: 'Updated-Construction-App',
  secret: 'alakjalsfjklas',
  secure: false
}))
app.use(passport.initialize())
app.use(passport.session())
require('./passport/Strategies')(passport)
require('./passport/Routes')(app, passport)
app.use(require('./config/error-handler'))
app.use('/api/porjects', projectsRoutes)
app.use('/api/posts', postRoute)
app.use('/api/developers', developerRoute)
app.use('/api/admins', adminRoute)

const server = app.listen(port, () => console.log(`Running on port: ${port}`))

module.exports = server
