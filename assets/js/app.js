var currentdate = new timezoneJS.Date(),
	date = currentdate.getDate(),
	month = currentdate.getMonth(),
	year = currentdate.getYear(),
	homeoffset = currentdate.getTimezoneOffset();

var tz = timezoneJS.timezone;
	tz.zoneFileBasePath = 'assets/tz';
	tz.init({async: false});

var fs = {};
var fe = {};
var tfile = {};
var fmode = "r";

var MYPLACES_FILE_NAME = "myplaces";
var MYPLACES_FILE_PATH = "/Android/data/timezoneit/";
var TIMESELCTOR_MOBISCROLL = "mobi";
var TIMESELCTOR_SLIDER = "slider";


function tzController($scope) {
	$scope.homeCity = {};

	// List of cities added by the user.
	$scope.myPlaces = [];


	var init = function(){
		document.addEventListener("deviceready", onDeviceReady, false);

    	initUi();
    	initTimeComponent(TIMESELCTOR_MOBISCROLL);
  	};

  	var onDeviceReady = function() {
		Log.info("Device Ready.");
		initFs();
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
		
		var myScroll = new iScroll('added-timezone-blocks', { scrollbarClass: 'myScrollbar' });
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

		$scope.safeApply(function() {
			
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


	var loadMyPlaces = function(fsys){
		if($scope.myPlaces && $scope.myPlaces.length < 1){
			Log.info("Loading MyPlaces...");
			getFileForReading(fsys, MYPLACES_FILE_NAME);
		}
	};

	var initFs = function(){
		Log.info("Requesting FileSystem access.");  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
	};

	var gotFileSystem = function(f){
		fs = f;
        Log.info("Got FileSystem access.");
       	loadMyPlaces(f);
    };
    
    var getFileForReading = function(fs, filename){
        Log.info("Looking for the file - " + filename + ".");   
        fs.root.getFile(filename, {create: true}, gotFileForReading, fail);
    };

    var gotFileForReading = function(fileEntry){
    	fe = fileEntry;
        fe.file(readFile, fail);
    };

    var readFile = function(file){
    	tfile = file;
        var reader = new FileReader();
        reader.onloadend = fileReadComplete;
        reader.readAsText(file);  
    };

    var fileReadComplete = function(event){
    	$scope.safeApply(function() {
    		$scope.myPlaces = angular.fromJson(event.target.result);
    	});
        Log.info(Utils.echo($scope.myPlaces));
    };

    var writeFile = function(d){
    	data = d;
    	fe.createWriter(writeDataToFile, fail);
    };
    
    var writeDataToFile = function(writer){
        writer.onwrite = function(evt) {
            Log.info("File Write successful - " + writer.length + " kb.");
            getFileForReading(fs, MYPLACES_FILE_NAME);
        };
        
        writer.seek((fmode == "r") ? 0 : writer.length)
                
        writer.write(data);
    };

    var fail = function(errorevent){
    	Log.error(errorevent);
    };
    
    $scope.foo = function() {
        writeFile(angular.toJson($scope.myPlaces));
    };
    
    $scope.safeApply = function(fn) {
    	var phase = this.$root.$$phase;
    	if(phase == '$apply' || phase == '$digest') {
    		if(fn && (typeof(fn) === 'function')) {
    			fn();
    		}
    	} else {
    		this.$apply(fn);
    	}
    };

	init();
}