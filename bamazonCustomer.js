var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayDB();
});

function displayDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res, null, 2));
    });
    runSearch();
}

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Display Database",
          "Purchase an Item",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Display Database":
          displayDB();
          break;
  
        case "Purchase an Item":
          purchaseItem();
          break;
  
        case "Exit":
          console.log("Goodbye!");
          connection.end();
          break;
        }
      });
  }

  function purchaseItem(){
    connection.query("SELECT * FROM products.product_name", function (err, res) {
    }
