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


    //  var obj = JSON.parse(body);

    //       console.log('addToCart id '+id)
    var max = 0;
    var ind = 0;

    if (cart["" + obj.custId] === undefined) {
        cart["" + obj.custId] = [];
    }
        
    var c = cart["" + obj.custId];

    console.log("START OF ADD");
    console.log("START OF ADD");
    console.log("START OF ADD");
    console.log("START OF ADD");
    console.log(obj.custId);
    console.table(cart);
    console.log("START OF ADD");
    console.log("START OF ADD");
    
    console.table(c);

    
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
            console.log("*********** WARNING PRODUCT ALREADY IN CART");
            var newQty = +c[adIndex].quantity + +data.quantity;
            c[adIndex].quantity = newQty;
            updateExisting = true;
        }

    }
    if (!updateExisting) {
        c.push(data);
    }
    

    console.log("********* The Cart Array  *************")
    console.table(c);

    res.status(201);

    res.send("");


});

/* toDO */
app.delete("/cart/:custId/items/:id", function (req, res, next) {
// app.delete("/cart/:id", function (req, res, next) {
    
    console.log("**********************************");
    console.log(req.params);
    console.log("**********************************");
    console.log(req.body);
    console.log("**********************************");
    // console.log(req);
    console.log("**********************************");
    var custId = req.params.custId;
    console.log("getCart" + custId);


    console.log('custID ' + custId);


    console.log(JSON.stringify(cart["" + custId], null, 2));

    // var obj = req.body;

    // if (cart["" + obj.custId] === undefined) {
        // cart["" + obj.custId] = [];
    // }
    var c = cart["" + req.params.custId];

    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    console.log("AD DELETE AD AD AD !!!!!");
    // var body = '';
    console.log("Delete item from cart: for custId " + req.url + ' ' +
        req.params.id.toString());
    console.log("delete here ");

    console.table(c);





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
