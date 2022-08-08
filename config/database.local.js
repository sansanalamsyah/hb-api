const mysql = require('mysql')
const fs = require('fs');

var connection = mysql.createPool(JSON.parse(fs.readFileSync('mysql-config.json')));

module.exports = connection