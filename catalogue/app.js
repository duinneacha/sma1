var http = require('http'),
    fs = require('fs'),
    url = require('url');
var p = require('path');
var qs = require('querystring');
var mysql = require('mysql');
var port = process.env.PORT || 3002;
var root = __dirname;
var headers = [
    "Product Name", "Price", "Picture", "Buy Button"
];


var db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'shop'
});
var cart = [];
var theuser=null;
var theuserid =null;
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);
    console.log(url1);
    console.log("request method is: ", request.method);
    console.log("path is: ", path);
    if (request.method == 'POST') {
        console.log("In POST");
        
        switch (path) {


            /* TODO */
            case "/newProduct":
                console.log("AD AD AD POST /newProduct ************************");
                console.log("AD AD AD POST /newProduct ************************");
                console.log("AD AD AD POST /newProduct ************************");
                console.log("AD AD AD POST /newProduct ************************");
                console.log("AD AD AD POST /newProduct ************************");
                console.log("AD AD AD POST /newProduct ************************");

                var body = '';
                // console.log("The request is: ", request);
                request.on('data', function (data) {
                    // console.log("data", data);
                    console.log("The data is: ", data);
                    body += data;
                    console.log("body", body);
                });

                request.on('end', function () {
                    var obj = JSON.parse(body);
                    console.log("JSON.stringify(obj, null, 2)");
                    console.log(JSON.stringify(obj, null, 2));
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log("AD QUERY");
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    console.log(obj.name);
                    var query = "SELECT * from Products where name ='"+obj.name+"'";
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });
            
                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            console.log("AD IN QUERY YYYYYYYYYYYYYYYYYYYY");
                            console.log("AD IN QUERY YYYYYYYYYYYYYYYYYYYY");
                            
                            if (err) {
                                console.log("IN ERROR");
                                response.end("error");
                                throw err;
                            }
                            if (rows!=null && rows.length>0) {
                                console.log("Product already in database");
                                response.end('{"error": "2"}');
                            }
                            else {
                                console.log("BEFORE SECOND QUERY");
                                query = "INSERT INTO Products (name, price, quantity, image)"+
                                        "VALUES(?, ?, ?, ?)";
                                db.query(
                                    query,
                                    [obj.name, obj.price, obj.quantity, obj.image],
                                    function(err, result) {
                                        console.log("IN FUNCTION OF SECOND QUERY");
                                        console.log("IN FUNCTION OF SECOND QUERY");
                                        
                                        if (err) {
                                            console.log("ERROR");
                                            console.log("ERROR");
                                            console.log("ERROR");
                                            console.log("ERROR");
                                            console.log("ERROR");
                                            
                                            console.log(err);
                                            // 2 response is an sql error
                                            response.end('{"error": "3"}');
                                            throw err;
                                        }
                                        console.log("AFTER ERRIR IN SECOND QUERY");
                                        console.log("AFTER ERRIR IN SECOND QUERY");
                                        
                                        theproductid = result.insertId;
                                        var obj = {
                                            id: theproductid
                                        }
                                        response.end(JSON.stringify(obj));

                                    }
                                );
                            }

                        }
                    );

                });
        


                break;
        } //switch
    }
    else {
        
        switch (path) {
            case "/newProduct" :
                console.log("In New Productttttttttttttttttttttt!!!!!!!!!!!!!!!!!!!!!");
                
                break;

            case "/getProducts"    :
                console.log("157 AD getProducts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                var query = "SELECT * FROM products ";


                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        console.log("Products sent");
                    }
                );

                break;
            case "/getProduct"    :
                console.log("getProduct!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                var body="";
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var product = JSON.parse(body);
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*'
                    });
                    console.log(JSON.stringify(product, null, 2));
                    var query = "SELECT * FROM products where productID="+
                        product.id;


                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) throw err;
                            console.log(JSON.stringify(rows, null, 2));
                            response.end(JSON.stringify(rows[0]));
                            console.log("Products sent");
                        }
                    );

                });



                break;




        }
    }



});

server.listen(port, () => console.log(`Catalogue Server running on ${port}`));
