var fs = require('fs')
var csv = require('fast-csv')
var season = '2016'

var matchIdsPerSeason = function(season){
   var matchesStream = fs.createReadStream("matches.csv");
   var matchIdsArray = [];
   csv
   .fromStream(matchesStream, {headers : true})
   .on("data", function(match){
       if (match['season'] === season){
           matchIdsArray.push(match['id'])
       }
   })
   .on("end", function(){
       //console.log(matchIdsArray);
   });
   return matchIdsArray;
}
matchIdsPerSeason(season);
module.exports ={
   matchIdsPerSeason: matchIdsPerSeason
}