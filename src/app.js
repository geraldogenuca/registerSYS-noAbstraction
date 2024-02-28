// LIBS and ROUTES to app
const express = require('express')
, app = express()
, morgan = require('morgan')

, ProductsRoutes = require('./routes/products.routes')


// LIBS resource initialization
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(morgan('dev'))


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});


// get ROUTES to project
app.get('/', (req, res) => res.json ('index on!!!'))
app.use('/', ProductsRoutes)


// ERROS treatment
app.use((req, res, next) => {
    const error = new Error('Route not found!')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: { msg: error.message }
    })
})

// Server project
app.listen(
    process.env.SERVER_PORT || 4001, 
    console.log(`Server is running in port: ${process.env.SERVER_PORT}!`)
    )