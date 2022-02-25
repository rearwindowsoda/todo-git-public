const mysql = require('mysql2/promise');
const { v4: uuid } = require('uuid'); //UUIDv4

const pool = mysql.createPool({
  host: 'YOUR HOST',
  user: 'YOUR DB USER',
  password: 'DB PASSWORD',
  database: 'DB NAME',
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
