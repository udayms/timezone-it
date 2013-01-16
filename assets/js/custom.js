$(document).ready(function(){
	var dt = new timezoneJS.Date(2007, 00, 27, 19, 40, $(".cities li:nth-child(1)").text()); //2007 Jan 1
	$(".cities li:nth-child(1)").append(" "+dt.getHours()+ ":" + dt.getMinutes())
	

	var dg = new timezoneJS.Date(dt, $(".cities li:nth-child(2)").text());
	$(".cities li:nth-child(2)").append(" "+dg.getHours()+ ":" + dg.getMinutes())

})