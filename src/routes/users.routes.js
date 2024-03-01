const express = require('express')
, routes = express.Router()

//
, UsersControllers = require('../controllers/users-controllers')



//
routes.post('/users', UsersControllers.createUser)
routes.post('/users/login', UsersControllers.loginUsers)


module.exports = routes