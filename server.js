require('dotenv').config()

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { User, Blog, Comment } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const xhb = require('express-handlebars')
const xhbs = xhb.create({})

const app = express()

app.engine('handlebars', xhbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ id })
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findOne({ where: { id }, include: [Blog] })
  .then(user => cb(null, user))
  .catch(err => cb(err, null))))

app.use(require('./routes'))

require('./db/config')
  .sync()
  .then(() => app.listen(process.env.PORT || 4000))
  .catch(err => console.log(err))
