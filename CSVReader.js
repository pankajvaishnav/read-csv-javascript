
var fs = require('fs')
console.log('Executed before file reading');
//------------------------READ-matches.csv_FILE-------------------//
var match = fs.readFileSync('matches.csv', 'utf8');
var matchRow = match.split('\n');
//------------------------READ-deliveries.csv_FILE----------------//
var delivery = fs.readFileSync('deliveries.csv', 'utf8');
var deliveriesRow = delivery.split('\n');
//------------------------matches.csv_ROWS------------------------//
var matches = [];
for(var match = 0;match<matchRow.length;match++){
    matches[match] = matchRow[match].split(',');
}
function matchesRows(){
    return matches;
}
//------------------------deliveries.csv_Rows----------------------//
var deliveries = [];
for(var delivery = 0; delivery < deliveriesRow.length; delivery++){
    deliveries[delivery] = deliveriesRow[delivery].split(',');
}
function deliveriesRows(){
    return deliveries;
}
//-----------------get-key_Value_Of_Season_And_MatchId------------------------
var matchIdSeason = getKeyValue();
//----------------getKeyValue-function----------------------------------------
function getKeyValue(){
    var ob = {};
    var id = 0;
    var season = 1;
    for(var match=1; match < matches.length; match++){
        ob[matches[match][id]] = matches[match][season];
    }
    return ob;
}
//----------------calling-getBowlers-TO_GET_BOWLERS_OF_A_PARTICULAR_YEAR-----//
var bowlers = getBowlers();
//----------------RUNS_PER_BOWLER:_2015--------------------------------------//
var bowlerObj = {};
for(var bowlerX = 0; bowlerX < bowlers.length; bowlerX++){
    var runs = 0;
    var del = 0;
    for(var bowlerY = 1; bowlerY < deliveries.length; bowlerY++){
        if(bowlers[bowlerX] == deliveries[bowlerY][8] && matchIdSeason[deliveries[bowlerY][0]] == '2015'){
            del++;
            runs = runs + parseInt(deliveries[bowlerY][9]) + parseInt(deliveries[bowlerY][10]) + parseInt(deliveries[bowlerY][13])
                + parseInt(deliveries[bowlerY][15]);
        }
    }
    var overs = del/6;
    bowlerObj[bowlers[bowlerX]]=(runs/overs);
}
//----------------SORT_OBJECT_BY_VALUE---------------------------------------//
var sortBwlr = [];
for (var bwlr in bowlerObj) {
    sortBwlr.push([bwlr, bowlerObj[bwlr]]);
}
sortBwlr.sort(function(a, b) {
    return a[1] - b[1];
});
function sortValues(){
    return sortBwlr;
}
//----------------getBowlers-function----------------------------------------//
function getBowlers(){
    var allBowlers = [];
    var id = 0;
    for(var bowler = 1; bowler < deliveries.length; bowler++){
        if(matchIdSeason[deliveries[bowler][id]] == '2015'){
            allBowlers.push(deliveries[bowler][8]);
        }
    }
    var bowler = [];
    for(var bowlerX = 0; bowlerX < allBowlers.length; bowlerX++){
        var count = 0;
        for(var bowlerY = bowlerX+1; bowlerY < allBowlers.length; bowlerY++){
            if(allBowlers[bowlerX] == allBowlers[bowlerY]){
                count++;
                break;
            }
        }
        if(count==0)
            bowler.push(allBowlers[bowlerX]);
    }
    return bowler;
}
//-------------------------------EXPORT_MODULES----------------------------------//
module.exports =  {  
    sortValues : sortValues
}