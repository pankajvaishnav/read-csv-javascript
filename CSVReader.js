
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
for(var i=0;i<arr.length;i++)
{
    matches[i]=arr[i].split(',');
}

//----------------deliveries.csv_Rows-----------------------------------------//
var deliveries=[];
for(var i=0;i<arrDel.length;i++)
{
    deliveries[i]=arrDel[i].split(',');
}

//----------------calling-getYears--TO_GET_ALL_SEASONS/YEARS
var years = getYears();
years.shift();
//----------------SORT-YEARS--------------------------------------------------//
for(var i=0;i<years.length;i++)
{
    years[i]=parseInt(years[i]);
    for(var j=0;j<years.length;j++)
    {
        if(years[i]<years[j])
        {
            var temp = years[i];
            years[i] = years[j];
            years[j] = temp;
        }
    }
}

//----------------MATCHES_PLAYED_PER_YEAR---------------[DISPLAY]---------------//
console.log('Matches Played Per Year: ');
console.log('----------------------------');
var x=0;
for(var i=0;i<years.length-1;i++)
{
    var n=0;
    for(var j=1;j<matches.length;j++)
    {
        if(years[i]==matches[j][1])
            n++;
    }
    console.log((++x)+'. '+'Matches Played in '+years[i]+' : '+n);
}

//console.log(matches[0])
//----------------getYears-function--------------------//
function getYears()
{
    var year = [];
    for(var i=matches.length-1;i>0;i--)
    {
        var count = 0;
        for(var j=i-1;j>1;j--)
        {
            if(matches[i][1]==matches[j][1])
            {
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

//----------------------------------------EXTRA_RUNS_CONCEDED_PER_TEAM:_2016--------------------------------------//
console.log('\n\n');

//----------------calling-getTeams--TO_GET_TEAMS_IN_A_PARTICULAR_YEAR----------//
var year='2016';
var teams = getTeams(year);
//console.log(teams);

//----------------getKeyValue-function-----------------------------------------//
function getKeyValue()
{
    var ob = {};
    for(var i=1;i<matches.length;i++)
    {
        ob[matches[i][0]]=matches[i][1];
    }
    return ob;
}

//--EXTRA_RUNS_CONCEDED_PER_TEAM:_2016-----------------------[DISPLAY]----------//
console.log('Extra Runs Conceded Per Team in Year: 2016');
console.log('-------------------------------------------');
var x=0;
for(var i=0;i<teams.length;i++)
{
    var extras = 0;
    for(var j=1;j<deliveries.length;j++)
    {
        if(deliveries[j][3]==teams[i] && matchIdSeason[deliveries[j][0]]=='2016')
        {
            extras+=parseInt(deliveries[j][16]);
        }
    }
    console.log((++x)+'. '+teams[i]+' : '+extras);
}

//----------------getTeams-function--------------------//
function getTeams(temsArg)
{
    var ar1 = [];
    for(var i=matches.length-1;i>0;i--)
    {
        if(matches[i][1]==temsArg)
            ar1.push(matches[i][5]);
    }
    var team = [];

    for(var i=ar1.length-1;i>0;i--)
    {
        var count = 0;
        for(var j=i-1;j>0;j--)
        {
            if(ar1[i]==ar1[j])
            {
                count++;
                break;
            }
        }
        if(count==0)
            team.push(ar1[i])
    }
    return team;
}

//-------------------------------------------TOP_ECONOMICAL_BOWLERS:_2015----------------------------------------//
console.log('\n\n');

//----------------calling-getBowlers-TO_GET_BOWLERS_OF_A_PARTICULAR_YEAR-----//
var bowlers = getBowlers();
//console.log(bowlers.length);

//----------------RUNS_PER_BOWLER:_2015--------------------------------------//
var bowlerObj = {};
//var nestObj = {};
for(var i=0;i<bowlers.length;i++)
{
    var runs = 0;
    var del = 0;
    for(var j=1;j<deliveries.length;j++)
    {
        if(bowlers[i]==deliveries[j][8] && matchIdSeason[deliveries[j][0]]=='2015')
        {
            del++;
            runs=runs+parseInt(deliveries[j][9])+parseInt(deliveries[j][10])+parseInt(deliveries[j][13])
                +parseInt(deliveries[j][15]);
        }
    }
    var overs = del/6;

    bowlerObj[bowlers[i]]=(runs/overs);
}
//console.log(bowlerObj);

//----------------SORT_OBJECT_BY_VALUE---------------------------------------//
var sortBwlr = [];
for (var bwlr in bowlerObj) {
    sortBwlr.push([bwlr, bowlerObj[bwlr]]);
}

sortBwlr.sort(function(a, b) {
    return a[1] - b[1];
});

//-----[TOP-10_ECONOMICAL BOWLERS:_2015]------------------[DISPLAY]----------//
//console.log('\n\n');
console.log('Top Economy Bowlers: 2015');
console.log('--------------------------------------');
var x=0;
for(var i=0;i<10;i++)
{
    //console.log(sortBwlr[i]);
    var str = sortBwlr[i].toString();
    var temp = str.split(',');
    console.log((++x)+'. '+temp[0]+' : '+temp[1]);
}
//----------------getBowlers-function----------------------------------------//
function getBowlers()
{
    var ar1 = [];
    for(var i=1;i<deliveries.length;i++)
    {
        if(matchIdSeason[deliveries[i][0]]=='2015')
        {
            ar1.push(deliveries[i][8]);
        }
    }
    //console.log(ar1.length);
    var bowler = [];
    for(var i=0;i<ar1.length;i++)
    {
        var count = 0;
        for(var j=i+1;j<ar1.length;j++)
        {
            if(ar1[i]==ar1[j])
            {
                count++;
                break;
            }
        }
        if(count==0)
            bowler.push(ar1[i]);
    }
    return bowler;
}

//---------------------------------------------MATCHES_WON_OF_ALL_TEAMS_PER_YEAR---------------------------------//
console.log('\n\n');

//-------------------------calling-getAllTeams-funuction------------------//
var allTeams = getAllTeams();
//console.log(allTeams.length);

//-----[PER_TEAM_ALL_OVER_THE_YEARS]------------------[DISPLAY]-----------//
console.log('Matches Won By All The Teams Per Year: ');
console.log('----------------------------------------');
var x=0;
for(var i=0;i<allTeams.length;i++)
{
    var count=0;
    for(var j=1;j<matches.length;j++)
    {
        if(allTeams[i]==matches[j][10])
        {
            count++;
        }
    }
    console.log((++x)+'. '+allTeams[i]+' : '+count);
}

//-------------------------gettingAllTeams-function-----------------------//
function getAllTeams()
{
    var ar11 = [];
    for(var i=matches.length-1;i>0;i--)
    {
        //if(matches[i][1]==='2016')
            ar11.push(matches[i][5]);
    }
    var team1 = [];

    for(var i=ar11.length-1;i>0;i--)
    {
        var count = 0;
        for(var j=i-1;j>0;j--)
        {
            if(ar11[i]==ar11[j])
            {
                count++;
                break;
            }
        }
        if(count==0)
            team1.push(ar11[i])
    }
    return team1;
}

//------------------------calling-winnigTeams-function---------------//
for(var year=0;year<years.length-1;year++)
{
    console.log('-------------------Matches_Won_By_Per_Team: '+years[year]+'----------------------');
    var ar1 = [];
    for(var i=matches.length-1;i>0;i--)
    {
        if(matches[i][1]==years[year])
            ar1.push(matches[i][5]);
    }
    //console.log(ar1.length);
    var teamsYear = [];
    for(var i=ar1.length-1;i>0;i--)
    {
        var count = 0;
        for(var j=i-1;j>0;j--)
        {
            if(ar1[i]==ar1[j])
            {
                count++;
                break;
            }
        }
        if(count==0)
            teamsYear.push(ar1[i])
    }
    //console.log(teamsYear.length);
    for(var team=0; team<teamsYear.length; team++)
    {
        //console.log(teamsYear[team]);
        var victories = 0;
        for(var match=1; match<matches.length; match++)
        {
            if(years[year] == matches[match][1] && teams[team] == matches[match][10])
            {
                victories++;
            }
        }
        console.log(teamsYear[team]+' : '+victories);
    }
}