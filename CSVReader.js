
var fs = require('fs')

console.log('Executed before file reading');
//---------------------------------------------------------------READ-matches.csv_FILE-------------------//
var match=fs.readFileSync('matches.csv', 'utf8');
var arr=match.split('\n');

//------------------------READ-deliveries.csv_FILE----------------//
var delivery=fs.readFileSync('deliveries.csv', 'utf8');
var arrDel=delivery.split('\n');

//---------------------------------------------------------------matches.csv_ROWS-------------------------//
var matches=[];
for(var i=0;i<arr.length;i++){
    matches[i]=arr[i].split(',');
}
function matchesRows(){
    return matches;
}

//----------------deliveries.csv_Rows-----------------------------------------//
var deliveries=[];
for(var i=0;i<arrDel.length;i++){
    deliveries[i]=arrDel[i].split(',');
}
function deliveriesRows(){
    return deliveries;
}
//----------------calling-getYears--TO_GET_ALL_SEASONS/YEARS
var years = getYears();

function getYears()
{
    var year = [];
    for(var i=matches.length-2;i>0;i--){
        var count = 0;
        for(var j=i-1;j>=1;j--){
            if(matches[i][1]==matches[j][1]){
                count++;
                break;
            }
        }
        if(count==0)
            year.push(matches[i][1])
    }
    return year;   
}

//----------------------------------------get-key_Value_Of_Season_And_MatchId-------------------------------------//
var matchIdSeason = getKeyValue();
//----------------getKeyValue-function-----------------------------------------//
function getKeyValue(){
    var ob = {};
    for(var i=1;i<matches.length;i++){
        ob[matches[i][0]]=matches[i][1];
    }
    return ob;
}

//----------------calling-getTeams--TO_GET_TEAMS_IN_A_PARTICULAR_YEAR----------//
var year='2016';
var teams = getTeams(year);

//----------------getTeams-function--------------------//
function getTeams(temsArg){
    var ar1 = [];
    for(var i=matches.length-1;i>0;i--){
        if(matches[i][1]==temsArg)
            ar1.push(matches[i][5]);
    }
    var team = [];

    for(var i=ar1.length-1;i>0;i--){
        var count = 0;
        for(var j=i-1;j>0;j--){
            if(ar1[i]==ar1[j]){
                count++;
                break;
            }
        }
        if(count==0)
            team.push(ar1[i])
    }
    return team;
}

//----------------calling-getBowlers-TO_GET_BOWLERS_OF_A_PARTICULAR_YEAR-----//
var bowlers = getBowlers();


//----------------RUNS_PER_BOWLER:_2015--------------------------------------//
var bowlerObj = {};

for(var i=0;i<bowlers.length;i++){
    var runs = 0;
    var del = 0;
    for(var j=1;j<deliveries.length;j++){
        if(bowlers[i]==deliveries[j][8] && matchIdSeason[deliveries[j][0]]=='2015'){
            del++;
            runs=runs+parseInt(deliveries[j][9])+parseInt(deliveries[j][10])+parseInt(deliveries[j][13])
                +parseInt(deliveries[j][15]);
        }
    }
    var overs = del/6;

    bowlerObj[bowlers[i]]=(runs/overs);
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
    var ar1 = [];
    for(var i=1;i<deliveries.length;i++){
        if(matchIdSeason[deliveries[i][0]]=='2015'){
            ar1.push(deliveries[i][8]);
        }
    }
    
    var bowler = [];
    for(var i=0;i<ar1.length;i++){
        var count = 0;
        for(var j=i+1;j<ar1.length;j++){
            if(ar1[i]==ar1[j]){
                count++;
                break;
            }
        }
        if(count==0)
            bowler.push(ar1[i]);
    }
    return bowler;
}

//-------------------------calling-getAllTeams-funuction------------------//
var allTeams = getAllTeams();

//-----[PER_TEAM_ALL_OVER_THE_YEARS]------------------[DISPLAY]-----------//
console.log('Matches Won By All The Teams Per Year: ');
console.log('----------------------------------------');
var x=0;
for(var i=0;i<allTeams.length;i++){
    var count=0;
    for(var j=1;j<matches.length;j++){
        if(allTeams[i]==matches[j][10]){
            count++;
        }
    }
}

//-------------------------gettingAllTeams-function-----------------------//
function getAllTeams()
{
    var ar11 = [];
    for(var i=matches.length-1;i>0;i--){
            ar11.push(matches[i][5]);
    }
    var team1 = [];

    for(var i=ar11.length-1;i>0;i--){
        var count = 0;
        for(var j=i-1;j>0;j--){
            if(ar11[i]==ar11[j]){
                count++;
                break;
            }
        }
        if(count==0)
            team1.push(ar11[i])
    }
    return team1;
}
//-------------------------------EXPORT_MODULES----------------------------------//
module.exports =  {
    getYears : getYears,
    matchesRows : matchesRows,
    getTeams : getTeams,
    deliveriesRows : deliveriesRows,
    getKeyValue : getKeyValue,
    getAllTeams : getAllTeams,
    sortValues : sortValues
}