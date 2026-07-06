// config/db.js
// MySQL connection pool — shared across all models

const mysql = require('mysql2')

const pool = mysql.createPool({
  host:            process.env.DB_HOST     || 'localhost',
  port:            Number(process.env.DB_PORT) || 3306,
  user:            process.env.DB_USER     || 'root',
  password:        process.env.DB_PASSWORD || '',
  database:        process.env.DB_NAME     || 'laureat_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:      0,
  timezone:        'Z',
  charset:         'utf8mb4'
})

// Verify connectivity on startup
pool.getConnection((err, conn) => {
  if (err) {
    console.error('❌  MySQL connection error:', err.message)
  } else {
    console.log('✅  MySQL connected to', process.env.DB_NAME || 'laureat_db')
    conn.release()
  }
})

module.exports = pool.promise()