var fs = require ('fs');
var user_info_file = './user_data.json'

 if (fs.existsSync(user_info_file)) {
     var file_stats = fs.statSync(user_info_file);
    var data = fs.readFileSync(user_info_file, 'utf-8');
    data = JSON.parse(data); // turns the string into an object//

    //console.log(typeofdata); // shows us what kind of data it is// 
 console.log(data["kazman"]["password"], data.kazman.email); // when we want both password and email//
console.log(`${user_info_file} has ${file_stats.size} characters`);
} else {
    console.log("hey! " + user_info_file + "doesn't exist!"); // output this if the file doesn't exist// 
}


 

 

 