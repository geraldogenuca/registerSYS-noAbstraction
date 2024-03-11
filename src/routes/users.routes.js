const express = require('express')
, routes = express.Router()

// Controllers imports.
, UsersControllers = require('../controllers/users-controllers')

// Users routes.
routes 
    .post('/users', UsersControllers.createUser)
    .post('/users/login', UsersControllers.loginUsers)


module.exports = routes