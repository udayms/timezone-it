var city = [{"name": "Karachi", "offset": "-05:00"},{"name": "Akumal", "offset": "-06:00"},{"name": "Aberdeen", "offset": "+00:00"},{"name": "Abidjan", "offset": "+00:00"}, {"name": "Kolkata", "offset": "-05:30", "home": "true"}];

function timeit() {
	for(i=0; i<city.length; i++) {
		if(city[i].home)
		{
			localOffsetMinutes= city[i].offset.substring(0,1)=="+" ? (parseInt(city[i].offset.substring(1,3)) *60 +  parseInt(city[i].offset.substring(4,6))) : -(parseInt(city[i].offset.substring(1,3)) *60 +  parseInt(city[i].offset.substring(4,6)));
		}
	}

	var localsTimeHours=parseInt($("#shours").val());
	var localsTimeMinutes=parseInt($("#sminutes").val());
	var localeTimeHours=parseInt($("#ehours").val());
	var localeTimeMinutes=parseInt($("#eminutes").val());

	for(i=0; i<city.length; i++) {
		currentOffsetHours = parseInt(city[i].offset.substring(1,3)); 
		currentOffsetMinutes= parseInt(city[i].offset.substring(4,6));
		currentOffsetTotalMinutes= city[i].offset.substring(0,1)=="+" ? (parseInt(city[i].offset.substring(1,3)) *60 +  parseInt(city[i].offset.substring(4,6))) : -(parseInt(city[i].offset.substring(1,3)) *60 +  parseInt(city[i].offset.substring(4,6)));
		scurr = new Date();
		ecurr = new Date();
		scurr.setHours(localsTimeHours);
		scurr.setMinutes(localsTimeMinutes+localOffsetMinutes-currentOffsetTotalMinutes);
		ecurr.setHours(localeTimeHours);
		ecurr.setMinutes(localeTimeMinutes+localOffsetMinutes-currentOffsetTotalMinutes);
		console.log(scurr.getHours()+":"+scurr.getMinutes()+ " - "+ecurr.getHours()+":"+ecurr.getMinutes())
	}	

}

$(document).ready(function(){
	for(i=0;i<city.length;i++){
		$(".cities").append('<li gmtoff="'+city[i].offset+'">'+city[i].name+'</li>');
	}

	d = new Date();
	localTimeHours = d.getHours();
	localTimeMinutes = d.getMinutes();
	localOffsetMinutes = d.getTimezoneOffset();

	$("#shours").attr("value", localTimeHours);
	$("#sminutes").attr("value", localTimeMinutes);
	$("#ehours").attr("value", parseInt(localTimeHours)+2);
	$("#eminutes").attr("value", $('#sminutes').attr("value"));

	timeit();

	$('input').keyup(function(){

		timeit();
	});

})