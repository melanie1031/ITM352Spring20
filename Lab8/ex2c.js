var age = 20;
var number = 0;
while (number < age) {
    number++;
    if(number > age/2) {
        console.log("Don't ask how old I am.");
        process.exit();
    }
    console.log(`are you ${number} years old?`);
}
console.log(` You must be ${number} years old!`);
