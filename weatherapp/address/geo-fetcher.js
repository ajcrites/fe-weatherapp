/**
 * Events and functionality for retrieval of address information and rendering
 */

// Attempt ajax request on keyup after 1.5 seconds. After another keyup,
// clear the current timeout so we only generate one request every 1.5
// seconds even after multiple keys are typed.
var curAddressThrottle = 0;

// Retrieve address information as input field is typed in
$("#address").on("keyup", function (e) {

    // When user types in a new address input, hide all previous results
    $(".no-address-results, .address-instruction").slideUp();
    $("#addresses").slideUp(function () {
        $(this).empty();
    });

    // If we already set out to retrieve results, clear this timeout
    clearTimeout(curAddressThrottle);

    // Return key was typed; try to fetch results immediately
    if (13 == e.which) {
        retrieveAddresses();
    }
    else {
        curAddressThrottle = setTimeout(retrieveAddresses, 1500);
    }
});

/**
 * Retrieve specified address results from the Google geocoding API
 */
function retrieveAddresses() {
    // Address the user has typed in
    var address = $("#address").val();

    // Do nothing if no address is specified
    if (!address.trim()) {
        return;
    }

    $.get("//maps.googleapis.com/maps/api/geocode/json?sensor=false&address="
        + encodeURIComponent(address)).done(function (addresses) {

            // Display appropriate messages based on results;
            if (!addresses.results.length) {
                $(".no-address-results").slideDown();
                $(".address-instruction, #addresses").slideUp();
            }
            else {
                $(".address-instruction").slideDown();
            }

            addresses.results.forEach(renderAddressResult);
            $("#addresses").slideDown();
    });
}

// Create and append a template of address results
function renderAddressResult(address) {
    var addressTpl = $(
        "<li class=individual-address>"
            + "<div class=formatted-address>Formatted Address: "
            + address.formatted_address + "</div>"
            + "<div class=geo>Geo location: "
            + address.geometry.location.lat + "/"
            + address.geometry.location.lng + "</div>"
        );

    // Record geometry and other data that we will use for weather display
    addressTpl.data(address.geometry.location);
    addressTpl.data("formatted-address", address.formatted_address);

    $("#addresses").append(addressTpl);
}
