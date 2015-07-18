$(document).on("ready", function() {

  var x = document.getElementById("demo");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  } // ends getLocation function

  function showPosition(position) {

    var request = $.ajax({
      url: "http://localhost:3000/api",
      method: "get",
      data: {lat: position.coords.latitude, lon: position.coords.longitude},
      dataType: "JSON"
    });

    request.done(function(response) {
      for (var i = 0; i < response.length; i ++) {
        $('body').append("<p style='font-weight:bold;'>" + response[i].hash.name + " <span style='font-weight:normal;font-style:italic;color: red'>" + response[i].hash.rating + "</span></p>");
      }
    });

    request.fail(function(errors) {
      console.error(errors);
    });

    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  } // ends showPosition function

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    } // ends switch
  } // ends showError function

  getLocation();

});
