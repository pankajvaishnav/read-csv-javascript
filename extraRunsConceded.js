
var reader = require('./CSVReader.js')

var teams = reader.getTeams('2016');
var deliveries = reader.deliveriesRows();
var matchIdSeason = reader.getKeyValue();

var teamExtras = {};
//--EXTRA_RUNS_CONCEDED_PER_TEAM:_2016-----------------------[DISPLAY]----------//
console.log('Extra Runs Conceded Per Team in Year: 2016');
console.log('-------------------------------------------');
for(var team = 0; team < teams.length; team++){
    var extras = 0;
    for(var extra = 1; extra < deliveries.length; extra++){
        if(deliveries[extra][3] == teams[team] && matchIdSeason[deliveries[extra][0]] == '2016'){
            extras+=parseInt(deliveries[extra][16]);
        }
    }
    teamExtras[teams[team]] = extras;
}
console.log(teamExtras)