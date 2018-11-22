var fs = require('fs');

var csv = require('fast-csv');
var a=[];
var i=0;
fs.createReadStream('matches.csv')
    .pipe(csv())
    .on('data',function(data){
        if(i<10)
        a[0]=console.log(data);
        i++;
        
    })
    .on('end',function(data){
        console.log('read finished');
        console.log(a);
    });