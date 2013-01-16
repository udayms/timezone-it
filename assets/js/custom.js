$(document).ready(function(){
	var dt = new timezoneJS.Date(2007, 9, 31, 12, 30, $(".cities li:nth-child(1)").text());
	$(".cities li:nth-child(1)").append(" "+dt.getHours()+ ":" + dt.getMinutes())
	console.log(dt);
	var minutesold=dt.getMinutes();
	var dg = new timezoneJS.Date($(".cities li:nth-child(2)").text());
	console.log(dg.getTimezoneOffset());
	dg.setMinutes(dg.getTimezoneOffset()+minutesold);
	$(".cities li:nth-child(2)").append(" "+dg.getHours()+ ":" + dg.getMinutes())

})