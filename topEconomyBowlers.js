
var reader = require('./CSVReader.js')

var sortBwlr = reader.sortValues();
//-----[TOP-10_ECONOMICAL BOWLERS:_2015]------------------[DISPLAY]----------//
var topEcoBowlers = {};
for(var i=0;i<10;i++){    
    var str = sortBwlr[i].toString();
    var temp = str.split(',');
    topEcoBowlers[temp[0]]=temp[1];
}

console.log(topEcoBowlers)