var express = require("express")
    , morgan = require("morgan")
    , path = require("path")
    , bodyParser = require("body-parser")

    , app = express();


app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

//app.use(morgan("dev", {}));
var cart = [];

app.post("/add", function (req, res, next) {
    var obj = req.body;
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));

    var max = 0;
    var ind = 0;

    if (cart["" + obj.custId] === undefined) {
        cart["" + obj.custId] = [];
    }
        
    var c = cart["" + obj.custId];

    // console.log("START OF ADD");
    // console.log("START OF ADD");
    // console.log("START OF ADD");
    // console.log("START OF ADD");
    // console.log(obj.custId);
    // console.table(cart);
    // console.log("START OF ADD");
    // console.log("START OF ADD");
    
    // console.table(c);

    
    // Find out the next Cart ID Number by traversing the cart array object
    for (ind = 0; ind < c.length; ind++) {
        console.log(`Index is ${ind}  c.length is ${c.length}  max is ${max}`);
        if (max < c[ind].cartid) {
            max = c[ind].cartid;
        }    
    }


    var cartid = max + 1;
    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };
    console.log(JSON.stringify(data));

    // Prior to pushing the data to the cart - first check if customer id and product id already on file
    
    var adIndex = 0;
    var updateExisting = false;
    for (adIndex = 0; adIndex < c.length; adIndex++) {
        console.log(`Product ID in Cart: ${c[adIndex].productID}  Product ID in Purchase: ${data.productID}`);
        if (c[adIndex].productID === data.productID) {
            
            // Product already in cart here - add to the quantity

            var newQty = +c[adIndex].quantity + +data.quantity;
            c[adIndex].quantity = newQty;
            updateExisting = true;
        }

    }

    // Add item to cart if not already there
    if (!updateExisting) {
        c.push(data);
    }
    
    res.status(201);
    res.send("");


});

// Delete function as per assignment requirement
app.delete("/cart/:custId/items/:id", function (req, res, next) {

    var custId = req.params.custId;
    var cartProdID = req.params.id;
    var cartItemID = cartProdID.slice(1,2);



    // Separate the cart items from the customer id
    var adKey = Object.keys(cart)[0];
    var adValue = cart[adKey];


    // Delete the item from the cart array
    var index = 0;
    for (index = 0; index < adValue.length; index++) {
        if (adValue[index].cartid == cartItemID) {
            adValue.splice(index, 1);
            console.log("deleted");

            console.log("IN adValue");
            console.log("IN adValue");
            console.log("IN adValue");
        }
    }




    var c = cart["" + req.params.custId];

    // var body = '';


    res.send(' ');


});


app.get("/cart/:custId/items", function (req, res, next) {


    var custId = req.params.custId;
    console.log("getCart" + custId);
    console.log("getCart" + custId);
    console.log("getCart" + custId);
    console.log("getCart" + custId);
    console.log("getCart" + custId);
    console.log("getCart" + custId);


    var adcart = JSON.stringify(cart["" + custId]);
    console.table(adcart);
    console.log("KDKDKDKDKDKDKDKDKDKDKDKDKDKDKKDK");
    console.log(JSON.stringify(cart["" + custId], null, 2));

    res.send(JSON.stringify(cart["" + custId]));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("Cart App now running in %s mode on port %d", app.get("env"), port);
});
