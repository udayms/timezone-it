function timeit() {

	var hrs=parseInt($("#hours").val());
	var mins=parseInt($("#minutes").val());

	if(hrs>24 || mins>60 ||hrs<0 || mins<0) {
		console.log("Incorrect Time!");
		return false;
	}

	var homecity=new timezoneJS.Date(2013,00,22, hrs,mins);
	var currentcity;
	
	$( ".cities li" ).each(function( index ) {
		currentcity = new timezoneJS.Date( homecity, $(this).text());
		console.log($(this).text()+" " +currentcity.getHours()+ ":" + currentcity.getMinutes());
	});
	console.log("-----");
}




$(document).ready(function(){
	var currentdate=new timezoneJS.Date();
	$("#hours").attr("value", currentdate.getHours());
	$("#minutes").attr("value", currentdate.getMinutes());
	timeit();

	$('input').keyup(function(){
		
		timeit();
	})

});