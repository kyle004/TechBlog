const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const passport = require('passport')
const sequelize = require('../db/config')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/blog/:id', (req, res) => {
  res.render('blog', { blogid: req.params.id })
})

router.get('/update/:id', (req, res) => {
  res.render('update', { editid: req.params.id })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

router.get('/newpost', (req, res) => {
  res.render('newpost')
})

router.get('/*', (req, res) => {
  res.render('home')
})

module.exports = router
