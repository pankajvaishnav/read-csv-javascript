var fs = require('fs')
var match= fs.readFileSync('matches.csv', 'utf8');
var rowArrOfMatch = match.split('\n');
var matches = [];
for(var eachRow = 0; eachRow < rowArrOfMatch.length; eachRow++){
  matches[eachRow] = rowArrOfMatch[eachRow].split(',');
}
function getIdOfAnySeason(season){
var arrOfMatchId = [];
for(let eachRow = 1; eachRow<matches.length; eachRow++){
   if(matches[eachRow][1] === season){
       arrOfMatchId.push(matches[eachRow][0]);
   }
}
return arrOfMatchId
}
module.exports = function() {
   this.getIdOfAnySeason=function(ofSeason){
       return getIdOfAnySeason(ofSeason)

   }
}









/*var fs = require('fs')
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
}*/