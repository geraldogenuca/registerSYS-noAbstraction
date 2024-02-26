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
            
            const query = ' SELECT `idProducts`, name, price, description, image FROM products;'
            , result = await mysql.execute(query, [req.query.idProducts])

            , response = {
                length: result.length,
                products: result.map(prod => {
                    return { 
                        idProduct: prod.idProducts,
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
    },
    async oneProduct(req, res, next) {
        try {
            const query = 'SELECT * FROM products WHERE idProducts = ?;';
            const result = await mysql.execute(query, [req.body.idProducts]);
    
            if (result.length == 0) {
                return res.status(404).send({
                    message: `Product id: ${req.body.idProducts} not found!`
                })
            }
            const response = {
                product: {
                    productId: result[0].idProducts,
                    name: result[0].name,
                    price: result[0].price,
                    description: result[0].description,
                    //image: result[0].image,
                    request: {
                        type: 'GET',
                        description: 'Return product id specific!',
                        url: process.env.URL_API + 'product/' + result[0].idProducts
                    }
                }
            }
            return res.status(200).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },
    async updatedProduct(req, res, next) {
        try {
            const query = ` UPDATE products
                               SET name         = ?,
                                   price        = ?,
                                   description  = ?,
                                   image        = ?
                             WHERE idProducts    = ?`;
            await mysql.execute(query, [
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.image,
                req.body.idProducts
            ]);
            const response = {
                message: 'Product updated successfully!',
                upatedProduct: {
                    productId: req.body.idProducts,
                    name: req.body.name,
                    price: req.body.price,
                    price: req.body.description,
                    price: req.body.image,
                    request: {
                        type: 'PATCH',
                        description: 'Updated product specific!',
                        url: process.env.URL_API + 'products/' + req.body.idProducts
                    }
                }
            }
            return res.status(202).send(response);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },
    async deletedProduct(req, res, next) {
        try {
            const query = `DELETE FROM products WHERE idProducts = ?`;
            await mysql.execute(query, [req.body.idProducts]);
    
            const response = {
                message: `Product id: ${req.body.idProducts}, removes successfully!`,
                idProducts: req.body.idProducts,
                request: {
                    type: 'POST',
                    description: 'Removed product specific!',
                    url: process.env.URL_API + 'products/' + req.body.idProducts
                }
            }
            return res.status(202).send(response);
    
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    },
    async image(req, res, next) {
        
    }
}
