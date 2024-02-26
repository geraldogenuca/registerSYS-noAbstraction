const express = require('express')
, routes = express.Router()
, ProductsControllers = require('../controllers/products-controllers')

//

//
routes.post('/products', ProductsControllers.postProduct)
routes.get('/products', ProductsControllers.indexProducts)
//routes.post('/products', ProductsControllers.postProduct)
//routes.post('/products', ProductsControllers.postProduct)
//routes.post('/products', ProductsControllers.postProduct)
    

module.exports = routes