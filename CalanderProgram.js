var arguments=process.argv.slice(2);

var getIndexOfDay=function(year) {
	var first=+year.slice(0,2);
	var second=+year.slice(2);
	var rem=first%4;
	var ans=(2*(4-rem))+second+Math.floor(second/4);
	return ans%7;
}
var daysIndex=function(index){
	var Days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	return Days[index];
}
var specialDates=['4/4','6/6','8/8','10/10','12/12'];
var timeSpan=function(date1,date2){
	var span=new Date(date1)-new Date(date2);
	return span/(1000*60*60*24);
}
var getNearestDaysfromSpecialDay=function(month,date,year){
	var diff=specialDates.map(function(spdate){
	return	timeSpan(month+'/'+date+'/'+year,spdate+'/'+year);});			
	var smallest= diff.reduce(function(x,y){return Math.abs(x)<Math.abs(y)?x:y;});
	return smallest;
}

var round=function(value,day_index){
	while(value--)
		(day_index==6)?day_index=0:day_index++;	
	return day_index;
}

var roundback=function(value,day_index){
	while(value--)
		(day_index==0)?day_index=6:day_index--;	
	return day_index;
}

var main=function(arg){
if(arg.length<3){
	console.error('Usage:dd mm yyyy');return;
}	
var date=arg[0];
var month=arg[1];
var year=arg[2];
var index=getIndexOfDay(year);
var value=getNearestDaysfromSpecialDay(month,date,year);
if(Math.abs(value)==value)
	var ans=round(value,index);	
else
	var ans=roundback(Math.abs(value),index);				
return daysIndex(ans);
}

console.log(main(arguments));
