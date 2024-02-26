const mysql = require('../config/mysql')

module.exports = {
    async postProduct(req, res, next) {
        try {
            const query = 'INSERT INTO Products (name, price, description, image) VALUES (?,?,?,?)'
            const result = await mysql.execute(query, [
                req.body.name, req.body.price, req.body.description, req.body.image,
            ])
    
            const response = {
                message: 'Product inserted successfully!',
                createdProduct: {
                    productId: result.insertId,
                    name: req.body.name,
                    price: req.body.price,
                    image: req.body.image,
                    request: {
                        type: 'POST',
                        description: 'Inserted products!',
                        url: process.env.URL_API + 'products/' + result.insertId
                    }
                }
            }
            return res.status(201).send(response)
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },
    async indexProducts(req, res, next) {
        try {
            const name = ''
            if(req.query.name) { name = req.query.name }
            const query = ' SELECT `idProducts`,name,price,description,image FROM products;'
            , result = await mysql.execute(query, [req.query.idProducts])

            , response = {
                length: result.length,
                products: result.map(prod => {
                    return {
                        productId: prod.idProducts,
                        name: prod.name,
                        price: prod.price,
                        description: prod.description,
                        image: prod.productImage,
                        request: {
                            type: 'GET',
                            description: 'Returns data for all products',
                            url: process.env.URL_API + 'products/' + prod.idProducts
                        }
                    }
                })
            }

            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }
}
