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


  $scope.init = function(){
    $scope.initUi();
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

  //
  $scope.setHomeCity = function(hc){
    $scope.homeCity = hc;
  };

  $scope.init();

}