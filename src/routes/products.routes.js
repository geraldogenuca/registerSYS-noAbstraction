const express = require("express")
, routes = express.Router()
// Image download control.
, upload = require('../middlewares/imgMiddle')
// Validate the token, check login.
, loginCheck = require('../middlewares/loginCheck')

// Controllers imports.
, ProductsControllers = require('../controllers/products-controllers')

// Product routes.
routes
    .get('/products/test', (req, res) => {res.json('test route products')})
    .post('/products', loginCheck.required, upload.single('image'), ProductsControllers.createProducts)
    .get('/products', ProductsControllers.indexProduct)
    .get('/products/:idProduct', ProductsControllers.oneProduct)
    .patch('/products/:idProduct', loginCheck.required,ProductsControllers.updatedProduct)
    .delete('/products/:idProduct', loginCheck.required, ProductsControllers.deletedProduct)


module.exports = routes