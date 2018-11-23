var reader = require('./CSVReader.js')

var matches = reader.matchesRows();
var years = reader.getYears();
var victoriesPerYear = {};
for(var year=0;year<years.length-1;year++){
    //console.log('-------------------Matches_Won_By_Per_Team: '+years[year]+'----------------------');
    var ar1 = [];
    for(var i=matches.length-1;i>0;i--){
        if(matches[i][1]==years[year])
            ar1.push(matches[i][5]);
    }

    var teamsYear = [];
    for(var i=ar1.length-1;i>0;i--){
        var count = 0;
        for(var j=i-1;j>0;j--){
            if(ar1[i]==ar1[j]){
                count++;
                break;
            }
        }
        if(count==0)
            teamsYear.push(ar1[i])
    }
    var countWins = {};
    var x=0;
    for(var team=0; team<teamsYear.length; team++){
        var victories = 0;
        for(var match=1; match<matches.length; match++){
            if(years[year] == matches[match][1] && teamsYear[team] == matches[match][10]){
                victories++;
            }
        }
        countWins[teamsYear[team]] = victories;
    }
    victoriesPerYear[years[year]] = countWins;
}
console.log(victoriesPerYear);