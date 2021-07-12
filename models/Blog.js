const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/config')

class Blog extends Model { }

Blog.init({
  title: DataTypes.STRING,
  text: DataTypes.TEXT
},
{ sequelize, modelName: 'blogs', timeStamps: true })

module.exports = Blog
