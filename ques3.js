var fs = require('fs')
var csv = require('fast-csv')
var utils = require('./utils')
var deliveriesStream = fs.createReadStream("deliveries.csv");

var extraRunsPerTeam = {};
var season = '2016'
var matchesIn2016 = async function getMatchIDs(){
   var result = await utils.matchIdsPerSeason(season)
   return result;
}

var match2016 = matchesIn2016('2016');
//------------------------------------------------------------------------
function inArray(element, array){
   var count=array.length;
   for(var i=0;i<count;i++){
       if(array[i]===element){return true;}
   }
   return false;
}
//------------------------------------------------------------------------
csv
.fromStream(deliveriesStream, {headers : true})
.on("data", function(delivery){
    console.log(matchesIn2016())
   if (inArray(delivery['match_id'], match2016)){
       if (extraRunsPerTeam[delivery['bowling_team']] !== undefined) {
           extraRunsPerTeam[delivery['bowling_team']] += parseInt(delivery['extra_runs'])
       }
       else {
           extraRunsPerTeam[delivery['bowling_team']] = parseInt(delivery['extra_runs'])
       }
   }
})
.on("end", function(){
    console.log(extraRunsPerTeam);
});