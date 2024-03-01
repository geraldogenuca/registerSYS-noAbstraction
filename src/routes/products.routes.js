const express = require("express")
, routes = express.Router()
, upload = require('../middlewares/imgMiddle')

// Controllers imports
, ProductsControllers = require('../controllers/products-controllers')

//
routes.get('/test', (req, res) => {res.json('test route products')})
routes.post('/products', upload.single('image'), ProductsControllers.createProducts)
routes.get('/products', ProductsControllers.indexProduct)
routes.get('/products/:idProduct', ProductsControllers.oneProduct)
routes.patch('/products/:idProduct', ProductsControllers.updatedProduct)
routes.delete('/products/:idProduct', ProductsControllers.deletedProduct)


module.exports = routes