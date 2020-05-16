var cookieParser = require('cookie-parser'); //don't forget to install//
app.use(cookieParser());

var session = require('express-session'); //don't forget to install//
app.use(session({
    secret: "ITM352 rocks!"}));  // way to keep it private, encrypt sessions IDs//

var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';

if (fs.existsSync(user_info_file)) {
    var file_stats = fs.statSync(user_info_file);

    var data = fs.readFileSync('./user_data.json', 'utf-8');
    var userdata = JSON.parse(data);
    username = 'newuser';
    userdata[username] = {};
    userdata[username].password = 'newpass';
    userdata[username].email = 'newuser@user.com';
    userdata[username].name = 'The New Guy'

    console.log(userdata["newuser"]["password"]);

    console.log(`${user_info_file} has ${file_stats.size} characters`);

} else {
    console.log("hey!" + user_info_file + "doesn't exist!")
}

app.use(myParser.urlencoded({ extended: true }));

// COOKIE!!!!!!, add a route to get a cookie that may have been set//
app.get('/set_cookie', function (request, response) {
console.log('In GET /set_cookie');
var my_name = 'Melanie';
response.cookie('your_name', 'my_name',{maxAge: 100*1000}).send('cookie set'); //Sets name = express,  expires in 5* 1000 is 5 sec//
});
app.get('/use_cookie', function (request, response) {
    console.log('In GET /use_cookie' , request.cookies); // requesting a info in the cookie//
    var the_name = request.cookies["your_name"]; 
    response.cookie('Welcome to the Use Cookie page' + the_name); // reaching for the cookie, specifically the your_name object//
    });

    //SESSION!!!!!//
    app.get('/use_session', function (request, response) {
        console.log('In GET /use_session' , request.session); // if the user doesn't have a session id, then it'll create one, while if they already have hten it will be give in a cookie//
        var the_sess_id = request.session.id; 
        request.session.destroy();
        response.cookie('Welcome, your session ID is ' + the_sess_id);
        
    });



app.get("/login", function (request, response) {
    console.log(request.cookies); // print out cookie//
    if(typeof request.cookies['username' != 'undefined']) {
        str = `Welcome ${request.cookies['username']}`; // if they have a cookie, display this, otherwise do the login if the don't//
    } else {

    quantity_str = request.query;
    // Give a simple login form, should also have some if statements, that unless this happens, then show the last time you logged in//
    str = `
<body>
>h1>Hello ${session.username}! You last logged in on ${session.last_login_time}</h1> 
<form action="/check_login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href = "./register">New User Register</a>
</body>
    `;
    response.send(str);
    }
});

app.post("/check_login", function (request, response) {
    if (typeof request.cookies.username != 'undefined') {
        response.send(`Welcome back ${request.cookies.username}!` + '<br>' + `You last logged in on ${request.session.last_login}`);
    }
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.query);
    var err_str = "";
    var login_username = request.body["username"];
    //Check if username exits in reg data. If so, check if password matches
    if (typeof userdata[login_username] != 'undefined') {
        var user_info = userdata[login_username];
        // Check if password stored for username matches what user typed in
        if (user_info["password"] != request.body["password"]) {
            err_str = `bad_password`;
        } else {
            session.username = login_username;

            var theDate = Date.now();
            session.last_login_time = theDate; // use sesion to keep products data between pages// 
            
            // when the log in is all good, send them a cookie//
            response.cookie('username', login_username).end(`${login_username} is logged in with data ${JSON.stringify(request.query)} on ${theDate}`);
            //{maxAge: 30*1000}).send; //Sets name = express,  expires in 30* 1000 is 30 sec//
            //response.end(`${login_username} is logged in with data ${JSON.stringify(request.query)} on ${theDate}`);
            return;
        }


        //NEED THIS FOR ASSIGNMENT 3 
app.post("login", function (request, response) {
    //Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    //Assigns username of body to a fucntion
    the_username = request.body.username;
    //If username given is not undefined (checks if it exists)
    if (typeof users_reg_data[the_username] != 'undefined') {
        //Then get the password from json data and check if it is the same as password entered
        if (users_reg_data[the_username].password == request.body.password) {
            msg = '';
            if (typeof request.session.last_login_time != 'undefined') {
                var msg = `You last logged in on ${request.session.last_login_time}`;
                var now = new Date();
            } else {
                now = 'first login';
            }
            request.session.last_login_time = now;
            response 
            .cookie('username', the_username, {maxAge:30 * 1000})
            .send(`${the_username} last logged in ${now}`);
        }
        else {
            response.redirect('./login');
        }
    }
});















    } else {
        err_str = `bad_username`;
    }
    response.redirect(`./login?username} = ${login_username} &error = ${err_str}`);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register_user" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);

});

app.post("/register_user", function (request, response) {
    // process a simple register form
console.log(request.body);
username = request.body.username;
errs = [];
//Check if username is taken
if(typeof userdata[username] != 'undefined') {
    errs.push ("username taken");
} else {
    userdata[username] = {};
}
// Is password same as repeat password 
if(request["body"] ["password"] != request ["body"] ["repeat_password"]) {
    errs.push ("passwords don't match");
} else {
    userdata[username].password = request["body"] ["password"];
}

userdata[username] = {};
userdata[username].password = request.body.password;
userdata[username].email = request.body.email

if (errs.length ==0) {
    fs.writeFileSync(user_info_file,JSON.stringify(userdata));
response.end(`New user ${username} registered!`);
} else {
    response.end(JSON.stringify(errs));
}
});

app.listen(8080, () => console.log(`listening on port 8080`))