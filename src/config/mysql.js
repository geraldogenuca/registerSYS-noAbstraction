const mysql = require('mysql2')

, pool = mysql.createPool({
    "connectionLimit": 1000,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS
})

/* const pool = mysql.createPool({
    "connectionLimit": 1000,
    "host": 'localhost',
    "port": 3306,
    "database": 'api_noAbstraction',
    "user": 'root',
    "password": 'root'
}) */


console.log('pool created')

//
process.on('release', () => console.log('pool => connection returned!'))
process.on('SIGINT', () => 
    pool.end(err =>{
        if(err) return console.log(err)
        console.log('pool => closed!')
        process.exit(0)
    })
)

//
exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results, fields) => {
            if(error) {
                return reject(error)
            } else {
                return resolve(results)
            }
        })
    })
}

exports.pool = pool