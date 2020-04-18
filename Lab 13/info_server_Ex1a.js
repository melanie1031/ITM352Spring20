var express = require('express'); // before this we must've used nps install
var app = express();
app.all('*', function (request, response, next) { //* means any path 
    response.send(request.method + ' to path ' + request.path);
});
app.listen(8090, () => console.log(`listening on port 8080`));
