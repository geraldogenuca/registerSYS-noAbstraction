const express = require("express")
, routes = express.Router()

// Controllers imports
, ProductsControllers = require('../controllers/products-controllers')

//
routes.get('/test', (req, res) => {res.json('test route products')})
routes.post('/', ProductsControllers.createProducts)


module.exports = routes