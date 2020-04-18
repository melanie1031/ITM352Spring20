var express = require('express'); // before this we must've used nps install
var app = express();
app.all('*', function (request, response, next) { //* means any path 
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(express.static('./public'));
app.listen(8090, () => console.log(`listening on port 8090`));
