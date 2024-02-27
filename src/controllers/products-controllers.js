const express = require("express")
, mysql = require("../config/mysql")

module.exports = {
    async createProducts(req, res) {
        try {
            const query = 'INSERT INTO products (name, price, description, image) VALUES (?,?,?,?);'
            , result = await mysql.execute(query, [
                req.body.name, req.body.price, req.body.description, req.body.image
            ])
            , response = {
                msg: `Product id: ${result.insertId}, created successfully!`,
                createdProduct: {
                    idProduct: result.insertId,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.body.image,
                    request: {
                        type: "POST",
                        description: "Inserted product!",
                        url: process.env.URL_API + 'products/' + result.insertId
                    }
                }
            }
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}