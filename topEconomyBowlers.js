
var reader = require('./CSVReader.js')

var sortBwlr = reader.sortValues();
//-----[TOP-10_ECONOMICAL BOWLERS:_2015]------------------[DISPLAY]----------//
var topEcoBowlers = {};
for(var bowler = 0; bowler < 10; bowler++){    
    var str = sortBwlr[bowler].toString();
    var temp = str.split(',');
    topEcoBowlers[temp[0]] = temp[1];
}

console.log(topEcoBowlers)