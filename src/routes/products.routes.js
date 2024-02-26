const express = require('express')
, routes = express.Router()
, ProductsControllers = require('../controllers/products-controllers')

//

//
routes.post('/products', ProductsControllers.postProduct)
routes.get('/products', ProductsControllers.indexProducts)
routes.get('/products/:id', ProductsControllers.oneProduct)
routes.patch('/products/:id', ProductsControllers.updatedProduct)
routes.delete('/products', ProductsControllers.deletedProduct)
    

module.exports = routes