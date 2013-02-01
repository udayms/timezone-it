function timeit(date, month, year, homeoffset) {

	var shrs=parseInt($("#shours").val());
	var smins=parseInt($("#sminutes").val());

	var ehrs=parseInt($("#ehours").val());
	var emins=parseInt($("#eminutes").val());

	if(shrs>23 || smins>59 ||shrs<0 || smins<0 || ehrs>23 || emins>59 || ehrs<0 || emins<0 ||shrs>ehrs || smins> emins) {
		console.log("Incorrect Time!");
		return false;
	}

	var homecitystime=new timezoneJS.Date(year, month, date, shrs, smins);
	var homecityetime=new timezoneJS.Date(year, month, date, ehrs, emins);
	var currentcitystime;
	var currentcityetime;
	
	$( ".cities li" ).each(function( index ) {
		currentcitystime = new timezoneJS.Date( homecitystime, $(this).text());
		currentcityetime = new timezoneJS.Date( homecityetime, $(this).text());
		console.log($(this).text()+" " +currentcitystime.getHours()+ ":" + currentcitystime.getMinutes() + " to "+ currentcityetime.getHours()+ ":" + currentcityetime.getMinutes());
	});
	console.log("----- Home offset: "+ homeoffset/60 +" hours-------");
}




$(document).ready(function(){
	var currentdate=new timezoneJS.Date();
	var date=currentdate.getDay();
	var month=currentdate.getMonth();
	var year=currentdate.getYear();
	var homeoffset=currentdate.getTimezoneOffset();
	$("#shours").attr("value", currentdate.getHours());
	$("#sminutes").attr("value", currentdate.getMinutes());
	$("#ehours").attr("value", parseInt($('#shours').attr("value"))+2);
	$("#eminutes").attr("value", $('#sminutes').attr("value"));
	$(".added-timezone-blocks").css("height", $(window).height() - 300);



var myScroll;
function loaded() {
	myScroll = new iScroll('added-timezone-blocks', { scrollbarClass: 'myScrollbar' });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded, false);




	timeit(date, month, year, homeoffset);

	$('input').keyup(function(){

		timeit();
	});

	// Added for time-picker widget
	$('#starttime').mobiscroll().time({
        theme: 'android-ics',
        display: 'inline',
        timeWheels: 'HHii',
        stepMinute: 5,
        mode: 'scroller'
    });
    $('#stoptime').mobiscroll().time({
        theme: 'android-ics',
        display: 'inline',
        timeWheels: 'HHii',
        stepMinute: 5,
        mode: 'scroller'
    });

    $("#add-city").leanModal({overlay : 0.9,closeButton: ".modal_close" });
    $("#cities-to-add").height($("#overlay").height()-100);

   /* $('#cities-to-add li').each(function() {
    	$(this).prepend('<input type="checkbox" name"city" value="'+$(this).text()+'"/>&nbsp;')
    	$(this).append('<div class="list-gmt-offset pull-right">'+'GMT + 5:30'+'</div>')
    });*/
});