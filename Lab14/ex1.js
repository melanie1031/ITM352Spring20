var fs = require ('fs');
var user_info_file = './user_data.json'
 var data = fs.readFileSync(user_info_file, 'utf-8');
 console.log(data)

 data = JSON.parse(data); // turns the string into an object//

 //console.log(typeofdata); // shows us what kind of data it is// 
 console.log(data["kazman"]["password"], data.kazman.email); // when we want both password and email//