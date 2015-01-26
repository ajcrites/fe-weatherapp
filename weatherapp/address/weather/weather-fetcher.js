/**
 * Include events for retrieval and rendering of weather information for given
 * addresses as well as animations and display of this information
 */

// Display weather information for clicked address
$("#addresses").on("click", ".individual-address", function () {
    var $this = $(this);

    // Retrieve from forecast.io
    $.ajax({
        dataType: "jsonp",
        url: "https://api.forecast.io/forecast/98fafca6511d046f46c53ccb458fefd4/"
             + $this.data("lat") + "," + $this.data("lng")
    }).done(function (weather) {
        $("#weather-data")
            // Add current weather text to weather summary
            .find(".current-weather")
            .text(weather.currently.summary)
            .end()
            // Include the selected address as part of the summary
            .find(".formatted-address")
            .text($this.data("formatted-address"))
            .end()
            .fadeIn();
    });
});

// Hide weather information when the shader is clicked
$(".weather-shader").on("click", function () {
    $(this).fadeOut();
});

// Prevent bubbling of click event to hide weather when the modal itself
// is clicked (contained by the shader)
$(".weather-modal").on("click", function (event) {
    event.stopPropagation();
});

// Hide the weather information / shader when Esc is clicked
$(document).on("keyup", function (e) {
    if (27 == e.which) {
        $("#weather-data").fadeOut();
    }
});
