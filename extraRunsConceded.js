
var reader = require('./CSVReader.js')

var teams = reader.getTeams('2016');
var deliveries = reader.deliveriesRows();
var matchIdSeason = reader.getKeyValue();
//--EXTRA_RUNS_CONCEDED_PER_TEAM:_2016-----------------------[DISPLAY]----------//
console.log('Extra Runs Conceded Per Team in Year: 2016');
console.log('-------------------------------------------');
var x=0;
for(var i=0;i<teams.length;i++){
    var extras = 0;
    for(var j=1;j<deliveries.length;j++){
        if(deliveries[j][3]==teams[i] && matchIdSeason[deliveries[j][0]]=='2016'){
            extras+=parseInt(deliveries[j][16]);
        }
    }
    console.log((++x)+'. '+teams[i]+' : '+extras);
}