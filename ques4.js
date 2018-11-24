var fs = require('fs')
var csv = require('fast-csv')
require('./utils.js')();
var deliveriesStream = fs.createReadStream('deliveries.csv');
var runsPerBowler = {};
var season = '2016'
var over = 0;
var matchesIn2016 = getIdOfAnySeason(season);
csv
.fromStream(deliveriesStream, {headers : true})
.on("data", function(delivery){
  if (existInArray(delivery['match_id'],matchesIn2016)){
    var totalRuns = parseInt(delivery['total_runs']);
    var byeRuns = parseInt(delivery['bye_runs']);
    var legByeRuns = parseInt(delivery['legbye_runs']);
    
    if (runsPerBowler[delivery['bowler']] !== undefined) {
        runsPerBowler[delivery['bowler']] += (totalRuns - byeRuns - legByeRuns);
    }
    else {
        runsPerBowler[delivery['bowler']] = 0
    }
  }
})
.on("end", function(){
   console.log(runsPerBowler);
});

function existInArray(value,array){
   var count=array.length;
   for(var i=0;i<count;i++){
       if(array[i] === value)
           return true;
   }
   return false;
}

