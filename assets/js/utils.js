var Utils = {
	
	addMinutesToCityTime: function(date, minutes, city) {
    	var newt = new timezoneJS.Date(date + minutes * 60000, city);
    	var nt = {};
    		nt.hours = newt.getHours();
    		nt.minutes = newt.getMinutes();
    	return nt;
	},

	getTimeString: function(hours, minutes){
		var time = null;




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

		hours = hours + "";
		minutes = minutes + "";

		if(hours.length < 2) hours = "0" + hours;
		if(minutes.length < 2) minutes = "0" + minutes;

		return hours + ":" + minutes + " " + time;

	},

	getTimeFromString: function(tstring){
		tstring = tstring.replace(/[^\d]/g, "");
		var time = {};
			time.hours = tstring.substring(0, 2);
			time.minutes = tstring.substring(2, tstring.length);

			// var re = /\w+\s/g;
			// if((onlyLetters = /^[a-zA-Z]*$/.test(tstring)))

		return  time;
	},

	getPlace: function(zone, city){

		return zone + "/" + city;
	},

	prettyfyCityname: function(name){
		return name.replace("_", " ");
	}


};