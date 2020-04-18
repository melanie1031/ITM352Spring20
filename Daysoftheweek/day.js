function DOW (d, m, y){

	var dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var date = d;
	var month = m;
	var year = y;

	var step1 = y % 100;
	//console.log(step1); 99

	var step2 = Math.floor(step1/4);
	//console.log(step2); 24

	var step3 = step2 + step1;
	//console.log(step3); //123

	var step4 = 0;
  var step5 = 0;
  
  
	if (month == "January"){
	 	step5 += (date + step3);
	} else {
  	step4 += determine(month);
  }
  //console.log( step5);
  
  var step6 = step3 + step4;
  //console.log(step6); //126
  
  var step7 = step6 + date;
  //console.log(step7);
  
  var step8 = 0;
  
  if(step5 == 0){
  	step8 = step7;
  } else {
  	step8 = step5;
  }
  
  var whatYear = Math.floor(year / 100);
 	//console.log(whatYear); //19
  
  var finalTotal = 0;
  
  if(whatYear == 20) {
  	if(leapYear(whatYear) == false) { 
    //console.log(leapYear(whatYear)); //true
      finalTotal = step8 - 1;
    } else {
    	if (month == "January" || month == "Febuary") {
      	finalTotal = step8 - 2;
      } else {
      	finalTotal = step8 - 1;
      }
    }
  } else {
  	if(leapYear(whatYear) == false) {
    	finalTotal = step8;
    } else {
    	if (month == "January" || month == "Febuary") {
    		finalTotal = step8 - 1;
   	 	} else {
      	finalTotal = step8;
      }
    }
  }
  
  if (finalTotal > 7) {
  	finalTotal= finalTotal % 7;
    return dow[finalTotal];
   
  }
  return dow[finalTotal];
}

console.log(DOW(24, "December", 2000));

function leapYear(year) {
	return (year % 100 ===0) ? (year % 400 === 0) : (year % 4 === 0);
}



function determine(month){

	var mon = ['January', 'Febuary', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
  
  var mod = [3,3,6,1,4,6,2,5,0,3,5,1];
  
  var index = mon.indexOf(month);
  return mod[index - 1]}