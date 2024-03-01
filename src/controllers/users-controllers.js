const mysql = require('../config/mysql')
, bcrypt = require('bcrypt')
, jwt = require('jsonwebtoken')

module.exports = {
    async createUser(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 8)
            , { name, email } = req.body
            , query = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
            , result = await mysql.execute(query, [ name, email, password ])

            , response = {
                msg:  'User created successfully',
                createdUser: {
                    idUser: result.insertId,
                    name: req.body.name,
                    email: req.body.email,
                    request: {
                        type: 'POST',
                        description: 'Inserted user!',
                        url: process.env.API_URL + 'users/' + result.insertId
                    }
                }
            }
            res.status(201).json(response);            
        } catch (error) {
            res.status(500).json({ error: error })
        }
    },
    async loginUsers(req, res) {
        try {
            const query = `SELECT * FROM users WHERE email = ?`
            , result = await mysql.execute(query, [req.body.email])

            if (result.length < 1) {
                res.status(401).send({ msg: 'Authentic failed!' })
            }

            if(await bcrypt.compare(req.body.password, result[0].password)) {
                const token = jwt.sign(
                    {idUser: result[0].idUsers, email: result[0].email},
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )

                return res.status(200).send({
                    message: 'Authenticate successfully!',
                    idUsers: result[0].idUsers,
                    token: token
                }) 
                }           
            res.status(401).send({ msg: 'Authentic failed!' })
    
        } catch (error) {
            return res.status(500).send({ msg: 'Authentic failed!' });
        }
    }
}