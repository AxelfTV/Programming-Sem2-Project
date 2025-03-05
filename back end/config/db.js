const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user:"testUser",
    password:"test",
    database:"foxtrot"
});

module.exports = db;