var express = require('express'); // before this we must've used nps install
var app = express();
var myParser = require("body-parser");
app.all('*', function (request, response, next) { //* means any path 
    console.log(request.method + ' to ' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true }));
app.post("/order_page.html", function (request, response) {
   let POST = request.body;
   response.send(POST); 
});

app.use(express.static('./public'));
app.listen(8088, () => console.log(`listening on port 8080`));
