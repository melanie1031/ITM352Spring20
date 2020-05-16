// Name: Melanie Yang 
// Description: server processing for online shop

//Creating a server via express//
var data = require('./public/product_data.js'); //get the data from product_data.js
var products = data.products;

// So it'll load querystring// 
const queryString = require('query-string'); // so it'll load querystring// 
var filename = 'user_data.json'; // new//
var fs = require('fs'); //Load file system//
var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");
var cookieParser = require('cookie-parser'); //don't forget to install//
app.use(cookieParser());
var session = require('express-session'); //don't forget to install//
app.use(session({
  secret: "ITM352 rocks!"}));  // way to keep it private 
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.size + 'characters');

    data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(data);
} else { 
    console.log(filename + 'does not exist!');
}

// Go to invoice if quantity values are good, if not redirect back to order page//
//new//
// means any path //
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});
// Gennerates each page where there is a product
app.get("*/:ptype[.]html", function (request, response, next) {
  if (typeof products[request.params.ptype] == 'undefined')
  {
    next();
    return;
  }
  // Referenced from professor Port // 
  str = '{}'; 
  if( typeof request.session[request.params.ptype] != 'undefined') {
    str = JSON.stringify(request.session[request.params.ptype]);
  }
  //Used template to load pages from the server, from professor 
   var pagestring = fs.readFileSync('./displayproducts.tl', 'utf-8');
   pagestring = `<script> var cart = ${str}; </script>` + pagestring; 
   pagestring = `<script> var product_type = '${request.params.ptype}'; </script>` + pagestring;
   response.send(pagestring);
});


app.use(myParser.urlencoded({ extended: true })); //get data in the body//
//to process the response from what is typed in the form//

// login stuff starts here , reference from lab15// 
app.post("/process_login", function (req, res) {
    var LogError = [];
    console.log(req.query);
    the_username = req.body.username.toLowerCase();
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Asking object if it has matching username, if it doesnt itll be undefined.
        if (users_reg_data[the_username].password == req.body.password) {
            the_username = request.body.username;
            //If username given is not undefined (checks if it ecists)
            if (typeof users_reg_data[the_username] != 'undefined') {
              //then get the password from the json data, and check if it is the same as password entered
              if (users_reg_data[username.password] == request.body.password) { // following taken from lab 15//
                msg = '';
                if (typeof request.session.last_login != 'undefined') { 
                  var msg = `You last logged in on ${request.session.last_login}`;
                  var now = new Date(); //Supposed to shoe last login time, referenced from lab 15
                } else {
                  now = 'first login'; 
                }
                request.session.last_login = now;
                response 
                .cookie('username', the_username, )
                .send(`${the_username} last logged in ${now}`);
              } else {
                response.redirect('./login.html');
              }
            }
            //Redirect to cart if they logged in correctly
            console.log(users_reg_data[req.query.username].name); 
            req.query.name = users_reg_data[req.query.username].name
            res.redirect('/cart.html?' + queryString.stringify(req.query));
            return;
           
        } else {
            LogError.push = ('Invalid Password');
  
      console.log(LogError);
      req.query.username= the_username;
      req.query.name= users_reg_data[the_username].name;
      req.query.LogError=LogError.join(';');
        }
    } else {
        LogError.push = ('Invalid Username');
        console.log(LogError);
        req.query.username= the_username;
        req.query.LogError=LogError.join(';');
    }
    res.redirect('./login.html?' );
});
// Following Sharon hehe , to load the cart age and then put all the data from the session// 
app.get("/cart.html", function (req, res) {
  cartfile = fs.readFileSync('./public/cart.html', 'utf-8');
  cartfile += `<script> var cart =  ${JSON.stringify(request.session)}</script>`;
  response.send(cartfile);
});

//Registration starts here//
app.post("/process_register", function (req, res) {
    qstr = req.body
    console.log(qstr);
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)) {
    }
    else {
      errors.push('Use Letters Only for Full Name')
    }
    // validating name
    if (req.body.name == "") {
      errors.push('Invalid Full Name');
    }
    // length of full name is less than 30
    if ((req.body.fullname.length > 30)) {
      errors.push('Full Name Too Long')
    }
    // length of full name is between 0 and 25 
  if ((req.body.fullname.length > 25 && req.body.fullname.length <0)) {
    errors.push('Full Name Too Long')
  }

    var reguser = req.body.username.toLowerCase(); 
    if (typeof users_reg_data[reguser] != 'undefined') { 
      errors.push('Username taken')
    }

    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
      errors.push('Letters And Numbers Only for Username')
    }
  
    //password is min 8 characters long 
    if ((req.body.password.length < 8 && req.body.username.length > 20)) {
      errors.push('Password Too Short')
    }
    // check to see if passwords match
    if (req.body.password !== req.body.repeat_password) { 
      errors.push('Password Not a Match')
    }

    if (errors.length == 0) {
       console.log('none');
       req.query.username = reguser;
       req.query.name = req.body.name;
       res.redirect('/cart.html?' + queryString.stringify(req.query)) // after done, direct to cart//
    }
    if (errors.length > 0) {
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;

        req.query.errors = errors.join(';');
        res.redirect('register.html?');
    }
});


// You're still on the products page
app.post("/process_cart", function (request, response) {
    let POST = request.body; // data would be packaged in the body//
    let product_type = POST["product_type"];
  console.log(POST);
    if (typeof POST['submitcart'] != 'undefined') {
        var hasvalidquantities=true; // creating a varibale assuming that it'll be true// 
        var hasquantities=false // creating a variable hasquantities and assuming it will be false
        for (i = 0; i < products[product_type].length; i++) {
            
                        qty=POST[`quantity${i}`]; // set variable 'qty' to the value in quantity
                        hasquantities=hasquantities || qty>0; // If it has a value bigger than 0 then it is good//
                        hasvalidquantities=hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid//     
        } 
        // if all quantities are valid, generate the invoice// 
        const stringified = queryString.stringify(POST); // converts the data in the POST to a JSON string and sets it to the variable 'stringified'
        if (hasvalidquantities && hasquantities) { // if it is both a quantity over 0 and is valid 
          // add the selectiond to the session// 
          request.session[product_type] = POST; 
          console.log(request.session);
            response.redirect("./cart.html?"+stringified); // should redirect you to the next page with the data inside it//
        }  
        else {response.send('Enter a valid quantity!')} // To let them know if wasn't a valid quantity
    
    }
}); 




function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume that quantity data is valid 
    if (q == "") { q = 0; } //handle black inputs as if they are 0 
    if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
    if (q < 0) errors.push('Negative value!'); //check if value is a positive number
    if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
    return returnErrors ? errors : (errors.length == 0);
}
app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listen on port 8080`))
