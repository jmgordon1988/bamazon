var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});


function purchaseItem() {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'item_id',
                message: 'Please enter the ID of the item you would like to purchase.',
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to purchase?',
            }
        ]).then(function (input) {
            var item = input.item_id;
            var quantity = input.quantity;
            var select = 'SELECT * FROM products WHERE ?';

            connection.query(select, { item_id: item }, function (err, results) {
                if (err) throw err;
                if (results.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    displayDB();

                } else {
                    var productData = results[0];
                    if (quantity <= productData.stock_quantity) {
                        console.log('Congratulations, we have what you want! Placing order!');
                        var update = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                        connection.query(update, function (err, results) {
                            if (err) throw err;

                            console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                            console.log('Thank you for choosing Bamazon!');
                            console.log("\n---------------\n");

                            connection.end();
                        })
                    }
                    else {
                        console.log('Sorry, we do not have enough stock to fulfill your order.');
                        console.log('Please modify your order.');
                        console.log("\n---------------\n");

                        displayDB();
                    }
                }
            })
        })
}

function displayDB() {
    select = 'SELECT * FROM products';
    connection.query(select, function (err, results) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('---------------\n');

        var buyArray = [];
        for (var i = 0; i < results.length; i++) {
            buyArray.push(results[i].item_id + ") " + results[i].product_name + " - " + results[i].stock_quantity + " remaining");
        }
        console.log(buyArray);

        console.log("---------------\n");
        purchaseItem();
    })
}

function start() {
    displayDB();
}
start();