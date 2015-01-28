/**
 * Controller for retrieving and maintaining the list of addresses
 */
angular.module("ang-weatherapp").controller("AddressesController", function ($http, $timeout) {
    var addressCtrl = this;

    addressCtrl.address = "",
    addressCtrl.changingAddress = "",
    addressCtrl.currentAddressTimer = 0;
    // Weather information object updated upon weather retrieval
    addressCtrl.weatherInfo = {};

    // On keyup in the address box, attempt to retrieve address information
    // after 1.5 seconds
    addressCtrl.startCheck = function () {
        // Confirm that the address value actually changed on keyup
        // otherwise a key like Return or Caps lock might have been pressed,
        // but we don't want to trigger the check at that point
        if (addressCtrl.changingAddress == addressCtrl.address) {
            return;
        }
        addressCtrl.changingAddress = addressCtrl.address;

        // Clear out the last block of addresses so that the previous
        // results are not displayed
        addressCtrl.addresses = null;

        // Cancel previous attempt so they do not stack
        $timeout.cancel(addressCtrl.currentAddressTimer);

        // If address is not empty, initiate the next check
        if (addressCtrl.address.trim()) {
            addressCtrl.currentAddressTimer = $timeout(function () {
                addressCtrl.triggerCheck();
            }, 1500);
        }
    };

    addressCtrl.triggerCheck = function () {
        $http({
            method: "get",
            url: "//maps.googleapis.com/maps/api/geocode/json",
            params: {
                sensor: false,
                address: addressCtrl.address
            },
        }).then(function (success) {
            addressCtrl.addresses = success.data.results;
        });
    };

    addressCtrl.clearWeatherInfo = function () {
        addressCtrl.weatherInfo = {};
    };
});
