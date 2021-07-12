const pplocalsequelize = require('passport-local-sequelize')
const { DataTypes } = require('sequelize')
const sequelize = require('../db/config')

const User = pplocalsequelize.defineUser(sequelize, {
  name: DataTypes.STRING,
  email: DataTypes.STRING
})

module.exports = User
