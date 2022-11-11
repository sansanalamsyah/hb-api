const mysql = require('mysql-await')
const fs = require('fs');

var connection = mysql.createPool(JSON.parse(fs.readFileSync('.mysql-config.json')));

module.exports = connection