const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Aa123456',
    database: 'bill_book'
})

module.exports = db;