const express = require("express")
, routes = express.Router()

// Controllers imports


//
routes.get('/', (req, res) => {res.json('test route products')})


module.exports = routes