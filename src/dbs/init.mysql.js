const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Thanhliem2612.",
  database: "WoodenFurnitureStore",
});

connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.error("Error querying database:", err);
      return;
    }
    console.log("Query results:", results);
  });
module.exports = connection;
