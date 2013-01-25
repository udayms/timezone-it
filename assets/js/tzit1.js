function tzController($scope) {
	$scope.startTime = 00;
	$scope.endTime = 00;
	$scope.hometime = "0 : 0";

	$scope.cities = [
    	{name:'Asia/Kolkata',home: true, stime: "0:00", etime: "0:00"},
    	{name:'America/Los_Angeles', stime: "0:00", etime: "0:00"},
    	{name:'Pacific/Honolulu', stime: "0:00", etime: "0:00"},
    	{name:'Asia/Tokyo', stime: "0:00", etime: "0:00"},
    	{name:'America/New_York',  stime: "0:00", etime: "0:00"},
    	{name:'America/Tijuana', stime: "0:00", etime: "0:00"}
    ];

	$scope.initUI = function(){
    	angular.forEach($scope.cities, function(mycity) {
      		dt = new timezoneJS.Date(mycity.name);
      		mycity.stime = dt.getHours() + ":" + dt.getMinutes();
      		mycity.etime = $scope.addMinutes(dt.getTime(), 60, mycity.name);

      		if(mycity.home){
      			$("#slider-range").slider({
					range: true, min: 0, max: 2879, values: [dt.getHours() * 60, dt.getHours() * 60 + 120], step:30, slide: $scope.slideTime, change: $scope.checkMax
				});
      		}

      		console.log(mycity.name + ": " + mycity.stime + " - " + mycity.etime + "[" + dt.getTimezoneOffset() + "]");
    	});
	};

	$scope.toDate = function (dStr, format) {
		var now = new timezoneJS.Date();
		if (format == "h:m") {
	 		now.setHours(dStr.substr(0,dStr.indexOf(":")));
	 		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
	 		now.setSeconds(0);
	 		return now;
		}else{
			return "Invalid Format";
		}
	};

	//need to fix this logic. right now, its BS.
	$scope.addMinutes = function(date, minutes, city) {
    	var newt = new timezoneJS.Date(date + minutes * 60000, city);
    	return newt.getHours() + ":" + newt.getMinutes();
	}


	$scope.slideTime = function(event, ui){
		var sTime = $("#slider-range").slider("values", 0),
			eTime = $("#slider-range").slider("values", 1);
		
		var sm = parseInt(sTime % 60, 10),
      				sh = parseInt(sTime / 60 % 24, 10),
      				em = parseInt(eTime % 60, 10),
      				eh = parseInt(eTime / 60 % 24, 10);
		
		var hst = new timezoneJS.Date(2013,00,22, sh,sm), 
			het = new timezoneJS.Date(2013,00,22, eh,em);
		
		$scope.$apply(function() {
			angular.forEach($scope.cities, function(mycity) {
      			dt = new timezoneJS.Date(hst, mycity.name);
      			mycity.stime = $scope.getTime(dt.getHours(), dt.getMinutes());

      			dt = new timezoneJS.Date(het, mycity.name);
      			mycity.etime = $scope.getTime(dt.getHours(), dt.getMinutes());
      			
    		});
	    });
	};

	$scope.getTime = function(hours, minutes) {
		var time = null, minutes = minutes + "";

		if (hours < 12) {
			time = "AM";
		}else {
			time = "PM";
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
	};

	$scope.checkMax = function() {
		var size = $("#slider-range").slider("values", 1) - $("#slider-range").slider("values", 0);
		if( size >= 1435) {
			$("#slider-range div")
				.addClass("ui-state-error")
				.removeClass("ui-widget-header");
			$("#scheduleSubmit")
				.attr("disabled","disabled")
				.addClass("ui-state-disabled")
				.removeClass("ui-state-default");
			console.log("Cannot be more than 24 hours");
		}
		else {	
			$("#slider-range div")
				.addClass("ui-widget-header")
				.removeClass("ui-state-error");
			$("#scheduleSubmit")
				.removeAttr("disabled")
				.addClass("ui-state-default")
				.removeClass("ui-state-disabled");
		}
	};



	$scope.init = function(){
		$scope.initUI();

		
	};

	

	

	

	
	
	$scope.init();

}



var Tzit = {
	init: function(){
		document.addEventListener("deviceready", this.deviceReady, false);
		document.addEventListener("backButton", this.exitApplication, false);

		//temperory fix to remove 
		//dependancy on device
		this.deviceReady();
	},

	deviceReady: function(){

	},

	exitApplication: function(){
		window.history.back = navigator.app.origHistoryBack;
		navigator.app.exitApp();
	},

	initTimezoneJs: function(){
		timezoneJS.timezone.zoneFileBasePath = 'assets/tz';
		timezoneJS.timezone.defaultZoneFile = ['asia', 'backward', 'northamerica', 'southamerica'];
		timezoneJS.timezone.init({async: false});	
	}
};

$(function(){
	Tzit.initTimezoneJs();
	Tzit.init();	
});