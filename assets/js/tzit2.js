function tzController($scope) {
	$scope.startTime = 00;
	$scope.endTime = 00;
	$scope.hometime = "0 : 0";

	$scope.cities = [
    	{name:'Asia/Kolkata', home: true},
    	{name:'America/Los_Angeles'},
    	{name:'Pacific/Honolulu'},
    	{name:'Asia/Tokyo'},
    	{name:'America/New_York'},
    	{name:'America/Tijuana'}
    ];
    var dc;
	$scope.initUI = function(){
    	angular.forEach($scope.cities, function(mycity) {
      		if(mycity.home){
      			dc= new timezoneJS.Date(2013,00,22, 11,22);
      		}
      		

    	});

    	angular.forEach($scope.cities, function(mycity) {
      		
      		var dt = new timezoneJS.Date(dc, mycity.name);
      		mycity.stime.setHours(dt.getHours());
      		mycity.stime.setMinutes(dt.getMinutes());
      		console.log(mycity.name + ": " + mycity.stime.getHours() + " - " + "[" + dt.getTimezoneOffset() + "]");
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

		/*var	minutes0 = parseInt(sTime % 60, 10),
			hours0 = parseInt(sTime / 60 % 24, 10),
			minutes1 = parseInt(eTime % 60, 10),
			hours1 = parseInt(eTime / 60 % 24, 10);

			$scope.startTime = $scope.getTime(hours0, minutes0);
			$scope.endTime = $scope.getTime(hours1, minutes1);
			$scope.hometime = $scope.startTime + ' - ' + $scope.endTime;
			
		*/
		
		
		$scope.$apply(function() {
			angular.forEach($scope.cities, function(mycity) {
      			var sm = parseInt(sTime % 60, 10),
      				sh = parseInt(sTime / 60 % 24, 10),
      				em = parseInt(eTime % 60, 10),
      				eh = parseInt(eTime / 60 % 24, 10);
      			

      			dt = new timezoneJS.Date(mycity.name);

      			mycity.stime = $scope.getTime(sh, sm);
      			mycity.etime = $scope.getTime(eh, em);
      			
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