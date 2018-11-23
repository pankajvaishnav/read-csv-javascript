var fs = require('fs')
var csv = require('fast-csv')
var matchesStream = fs.createReadStream("matches.csv");

var matchesPerSeason = {};

console.time("ques1")

csv
 .fromStream(matchesStream, {headers : true})
 .on("data", function(match){
     //console.log('I am one line of data', data);
     //console.log(match)
     if (matchesPerSeason[match['season']] !== undefined){
         matchesPerSeason[match['season']] += 1
     }
     else {
         matchesPerSeason[match['season']] = 1
     }
 })
 .on("end", function(){
     console.log(matchesPerSeason);
     console.timeEnd("ques1")
 });

 console.log("Line 22: " + matchesPerSeason)
