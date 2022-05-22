const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    firstName: {type: DataTypes.STRING,},
    lastName: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Music = sequelize.define('music', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING,},
    name: {type: DataTypes.STRING,},
    genre: {type: DataTypes.STRING,},
    musicFile: {type: DataTypes.STRING,},
})

module.exports = {
    User,
    Music
}





