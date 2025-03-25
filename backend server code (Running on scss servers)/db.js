const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'mariadb_2425-cs7025-group4',      
    user: '2425-cs7025-group4',
    password: 'An62L7r9QVaRxFb8',
    database: '2425-cs7025-group4_db',
    connectionLimit: 5
  });

module.exports = pool;