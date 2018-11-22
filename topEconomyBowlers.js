
var reader = require('./CSVReader.js')

var sortBwlr = reader.sortValues();
//-----[TOP-10_ECONOMICAL BOWLERS:_2015]------------------[DISPLAY]----------//
console.log('Top Economy Bowlers: 2015');
console.log('--------------------------------------');
var x=0;
for(var i=0;i<10;i++){    
    var str = sortBwlr[i].toString();
    var temp = str.split(',');
    console.log((++x)+'. '+temp[0]+' : '+temp[1]);
}