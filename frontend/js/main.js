$(document).on("ready", function() {
  var x = document.getElementById("demo");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    console.log("function running");
    // get to restaurants with params of lat and long from the user
    var request = $.ajax({
      url: "http://localhost:3000/api",
      method: "get",
      data: {lat: position.coords.latitude, lon: position.coords.longitude},
      dataType: "JSON"
    });
    request.done(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i ++) {
        $('body').append("<p style='font-weight:bold;'>" + response[i].hash.name + " <span style='font-weight:normal;font-style:italic;color: red'>" + response[i].hash.rating + "</span></p>");
      }
    });
    request.fail(function(errors) {
      console.error(errors);
    });
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }
  getLocation();
});