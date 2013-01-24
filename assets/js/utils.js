var Utils = {
	
	addMinutesToCityTime: function(date, minutes, city) {
    	var newt = new timezoneJS.Date(date + minutes * 60000, city);
    	var nt = {};
    		nt.hours = newt.getHours();
    		nt.minutes = newt.getMinutes();
    	return nt;
	},

	getTimeString: function(hours, minutes){
		var time = null, minutes = minutes + "";

		if (hours < 12) {
			time = "a";
		}else {
			time = "p";
		}

		if (hours == 0) {
			hours = 12;
		}

		if (hours > 12) {
			hours = hours - 12;
		}

		if (minutes.length == 1) {
			minutes = "0" + minutes;
		}

		return hours + ":" + minutes + " " + time;

	},

	getPlace: function(zone, city){

		return zone + "/" + city;
	}


};