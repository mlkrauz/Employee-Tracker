const mysql = require('mysql2')

const database = mysql.createConnection(
    {
        host: 'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
)

module.exports = database