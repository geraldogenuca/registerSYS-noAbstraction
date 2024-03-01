const express = require("express")
, routes = express.Router()
, multer = require('multer')
, path = require('path')

//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/');
    },
    filename: function(req, file, cb) {
        cb(
            null, 
            `${
                file.fieldname
            }-${
                new Date().toLocaleDateString().split("/")
            }_${
                file.originalname
            }`
        );
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


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