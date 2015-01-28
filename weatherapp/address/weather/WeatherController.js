angular.module("ang-weatherapp").controller("WeatherController", function ($http) {
    var weatherCtrl = this;

    weatherCtrl.updateWeatherInfo = function (address, target) {
        $http.jsonp("https://api.forecast.io/forecast/98fafca6511d046f46c53ccb458fefd4/"
            + address.geometry.location.lat + "," + address.geometry.location.lng
            + "?callback=JSON_CALLBACK"
        ).then(function (success) {
            target.weather = success.data.currently.summary;
            target.address = address.formatted_address;
        });
    };
});
