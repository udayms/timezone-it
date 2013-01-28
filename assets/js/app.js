var currentdate = new timezoneJS.Date(),
	date = currentdate.getDate(),
	month = currentdate.getMonth(),
	year = currentdate.getYear(),
	homeoffset = currentdate.getTimezoneOffset();

var tz = timezoneJS.timezone;
	tz.zoneFileBasePath = 'assets/tz';
	tz.init({async: false});

var MYPLACES_FILE_PATH = "/Android/data/AnywhereAnytime/";
var TIMESELCTOR_MOBISCROLL = "mobi";
var TIMESELCTOR_SLIDER = "slider";

function tzController($scope) {
	$scope.homeCity = {};

	// List of cities added by the user.
	$scope.myPlaces = [
      {city:'Kolkata', zone: 'Asia', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00", home: true},
    	{city:'Los_Angeles', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Honolulu', zone: 'Pacific', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tokyo', zone: 'Asia', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'New_York',  zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"},
    	{city:'Tijuana', zone: 'America', stime: "0:00", etime: "0:00", slot: "0:00 - 0:00"}
    ];


	var init = function(){
    	initUi();
    	initTimeComponent(TIMESELCTOR_MOBISCROLL);
  	};

	var initUi = function(){
	    var dt;
	    angular.forEach($scope.myPlaces, function(myPlace) {
	      
	      var place = Utils.getPlace(myPlace.zone, myPlace.city);
	      dt = new timezoneJS.Date(place);
	      
	      myPlace.stime = Utils.getTimeString(dt.getHours(), dt.getMinutes());
	      var newt = Utils.addMinutesToCityTime(dt.getTime(), 60, place);
	      myPlace.etime = Utils.getTimeString(newt.hours, newt.minutes);

	      if(myPlace.home)
	        setHomeCity(myPlace);

	      console.log(myPlace.city + ": " + myPlace.stime + " - " + myPlace.etime + "[" + dt.getTimezoneOffset() + "]");
	    });
	};


	var initTimeComponent = function(component){

		if(component == TIMESELCTOR_MOBISCROLL){
			initMobiScroll($scope.homeCity.stime, $scope.homeCity.etime);
		}else if(component == TIMESELCTOR_SLIDER){
			initTimeRangeSlider();
		}
		
	};

	var initMobiScroll = function(stime, etime){
			$('#starttime').mobiscroll().time({
				id: "startTime",
		        theme: 'android-ics', display: 'inline', timeFormat: 'HH:ii', timeWheels: 'HHii', stepMinute: 5, mode: 'scroller', showLabel: false,
		        onChange: onTimeChanged
			});


			$('#stoptime').mobiscroll().time({
				id: "endTime",
		        theme: 'android-ics', display: 'inline', timeFormat: 'HH:ii', timeWheels: 'HHii', stepMinute: 5, mode: 'scroller', showLabel: false,
		        onChange: onTimeChanged
		    });

	};

	var initTimeRangeSlider = function(){
		$('.time-selector').html('<input id="timeRanger" type="slider" name="price" value="-0.5;0.5" />');

		$('#timeRanger').slider({
			from: 480,
			to: 1020,
			step: 15,
			skin: "blue",
			dimension: '',
			scale: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
			limits: false,
			calculate: function( value ){
				var hours = Math.floor( value / 60 );
				var mins = ( value - hours*60 );
				return (hours < 10 ? "0"+hours : hours) + ":" + ( mins == 0 ? "00" : mins );
			},
			onstatechange: function( value ){
				console.dir( this );
			}
		});
	};

	var setHomeCity = function(hc){
		$scope.homeCity = hc;
  	};


	var onTimeChanged = function(time, inst){
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
		
	};


	var loadMyPlaces = function(){

	};

	var saveMyPlaces = function(){

	};



	init();
}