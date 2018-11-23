
var reader = require('./CSVReader.js')

var years = reader.getYears();
var matches = reader.matchesRows();
//----------------MATCHES_PLAYED_PER_YEAR---------------[DISPLAY]---------------//
console.log('Matches Played Per Year: ');
console.log('----------------------------');
var matchesAllSeasons = {};
for(var i=0;i<years.length;i++){
    var n=0;
    for(var j=1;j<matches.length;j++){
        if(years[i]==matches[j][1])
            n++;
    }
    matchesAllSeasons[years[i]] = n;
}
console.log(matchesAllSeasons);
