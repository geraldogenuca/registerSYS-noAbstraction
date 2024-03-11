const mysql = require("../config/mysql")

module.exports = {
    async createProducts(req, res) {
        try {
            const query = 'INSERT INTO products (name, price, description, image) VALUES (?,?,?,?);'
            , result = await mysql.execute(query, [
                req.body.name, req.body.price, req.body.description, req.file.path
            ])
            , response = {
                msg: `Product id: ${result.insertId}, created successfully!`,
                createdProduct: {
                    idProduct: result.insertId,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.file.path,
                    request: {
                        type: 'POST',
                        description: 'Inserted product!',
                        url: process.env.API_URL + 'products/' + result.insertId
                    }
                }
            }
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async indexProduct(req, res) {
        try {
            const query = 'SELECT * FROM products;'
            , result = await mysql.execute(query, [req.query.idProduct])
            , response = {
                length: result.length,
                products: result.map(prod => {
                    return {
                        idProduct: prod.idProduct,
                        name: prod.name,
                        price: prod.price,
                        description: prod.description,
                        request: {
                            type: 'GET',
                            description: 'Return index all products!',
                            url:  process.env.API_URL + `products/` + prod.idProduct
                        }
                    }
                })
            }
            
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async oneProduct(req, res) {
        try {
            const query = 'SELECT * FROM products WHERE idProduct = ?;'
            , result = await mysql.execute(query, [req.params.idProduct])
    
            
            , response = {
                product: {
                    idProduct: result[0].idProduct,
                    name: result[0].name,
                    price: result[0].price,
                    description: result[0].description,
                    //image: result[0].image,
                    request: {
                        type: 'GET',
                        description: 'Return index all products!',
                        url:  process.env.API_URL + `products/` + result[0].idProduct
                    }
                }
            }

            res.status(200).json(response)
        } catch (error) {
            res.status(500).send({ error: error })
        }
    },
    async updatedProduct(req, res) {
        try {
            const query = ` UPDATE products
                           SET name         = ?,
                               price        = ?,
                               description  = ?,
                               image        = ?
                         WHERE idProduct    = ?;`
            await mysql.execute(query, [
                req.body.name, req.body.price,
                req.body.description, req.body.image, req.params.idProduct
            ]);
            
            const response = {
                message: 'Produto atualizado com sucesso',
                updatedProduct: {
                    productId: req.params.idProduct,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    //image: req.body.image,
                    request: {
                        type: 'GET',
                        description: 'Updated product specific!',
                        url: process.env.API_URL + 'products/' + req.params.idProduct
                    }
                }
            }

            res.status(202).send(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async deletedProduct(req, res) {
        try {
            const query = `DELETE FROM products WHERE idProduct = ?`
            await mysql.execute(query, [req.params.idProduct])

            const response = {
                message: `Product id: ${req.params.idProduct}, removed successfully!`,
                request: {
                    type: 'DELETE',
                    description: 'Removed product!',
                    url: process.env.API_URL + 'product' + req.params.idProduct
                }
            }
            res.status(202).send(response)
        } catch (error) {
            res.status(500).send({ error: error })
        }
    }
}