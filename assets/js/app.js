var currentdate = new timezoneJS.Date(),
	date = currentdate.getDate(),
	month = currentdate.getMonth(),
	year = currentdate.getYear(),
	homeoffset = currentdate.getTimezoneOffset();

	var tz = timezoneJS.timezone;
	tz.zoneFileBasePath = 'assets/tz';
	//tz.loadingScheme = tz.loadingSchemes.MANUAL_LOAD;
	//tz.loadZoneJSONData('assets/tz/allcities.json', true);
	tz.init({async: false});


function tzController($scope) {
	$scope.homeCity = {};

	// List of cities added by the user.
	$scope.myPlaces = [
      {city:'Kolkata', zone: 'Asia', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00", home: true},
    	{city:'Los_Angeles', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Honolulu', zone: 'Pacific', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tokyo', zone: 'Asia', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'New_York',  zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tijuana', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Los_Angeles', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Honolulu', zone: 'Pacific', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tokyo', zone: 'Asia', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'New_York',  zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tijuana', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"}
    ];


	$scope.init = function(){
    	$scope.initUi();
    	$scope.initTimeComponent();
  	};

	$scope.initUi = function(){
	    var dt;
	    angular.forEach($scope.myPlaces, function(myPlace) {
	      
	      var place = Utils.getPlace(myPlace.zone, myPlace.city);
	      dt = new timezoneJS.Date(place);
	      
	      myPlace.stime = Utils.getTimeString(dt.getHours(), dt.getMinutes());
	      var newt = Utils.addMinutesToCityTime(dt.getTime(), 60, place);
	      myPlace.etime = Utils.getTimeString(newt.hours, newt.minutes);

	      if(myPlace.home)
	        $scope.setHomeCity(myPlace);

	      console.log(myPlace.city + ": " + myPlace.stime + " - " + myPlace.etime + "[" + dt.getTimezoneOffset() + "]");
	    });
	};


	$scope.initTimeComponent = function(){
		$('#starttime').mobiscroll().time({
			id: "startTime",
	        theme: 'android-ics', display: 'inline', timeWheels: 'HHii', stepMinute: 5, mode: 'scroller', showLabel: false,
	        onChange: $scope.onTimeChanged
		});


		$('#stoptime').mobiscroll().time({
			id: "endTime",
	        theme: 'android-ics', display: 'inline', timeWheels: 'HHii', stepMinute: 5, mode: 'scroller', showLabel: false,
	        onChange: $scope.onTimeChanged
	    });
	}

	$scope.setHomeCity = function(hc){
		$scope.homeCity = hc;
  	};


	$scope.onTimeChanged = function(time, inst){
		var time = Utils.getTimeFromString(time);
		var hometime = new timezoneJS.Date(year, month, date, time.hours, time.minutes);
		var citytime;

		$scope.$apply(function() {
			
			if(inst.settings.id == "startTime"){
				angular.forEach($scope.myPlaces, function(myplace) {
					citytime = new timezoneJS.Date(hometime, Utils.getPlace(myplace.zone, myplace.city));
					myplace.stime = Utils.getTimeString(citytime.getHours(), citytime.getMinutes());      			
	    		});
    		}else{
				angular.forEach($scope.myPlaces, function(myplace) {
					citytime = new timezoneJS.Date(hometime, Utils.getPlace(myplace.zone, myplace.city));
					myplace.etime = Utils.getTimeString(citytime.getHours(), citytime.getMinutes());      			
	    		});
			}
	    });
		
			
	}



	$scope.init();
}