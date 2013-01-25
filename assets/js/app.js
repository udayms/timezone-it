var currentdate = new timezoneJS.Date(),
	day = currentdate.getDay(),
	month = currentdate.getMonth(),
	year = currentdate.getYear(),
	homeoffset = currentdate.getTimezoneOffset();

	var tz = timezoneJS.timezone;
	tz.zoneFileBasePath = 'assets/tz';
	//tz.loadingScheme = tz.loadingSchemes.MANUAL_LOAD;
	//tz.loadZoneJSONData('assets/tz/allcities.json', true);
	tz.init({async: false});

$(document).ready(function(){
	
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

});