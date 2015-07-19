// var geocoder;
// var map;
// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(-34.397, 150.644);
//   var mapOptions = {
//     zoom: 8,
//     center: latlng
//   }
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// function codeAddress() {
//   var address = document.getElementById('address').value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     debugger
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

// google.maps.event.addDomListener(window, 'load', initialize);

// $(document).on("ready", function() {

//   var x = document.getElementById("demo");

//   function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//   }

//   function showPosition(position) {

//     var request = $.ajax({
//       url: "http://localhost:3000/api",
//       method: "get",
//       data: {lat: position.coords.latitude, lon: position.coords.longitude},
//       dataType: "JSON"
//     });

//     request.done(function(response) {
//       console.log(response);
//       for (var i = 0; i < response.length; i ++) {
//         $('#demo').append("<div class='ui card'><img src='"+ response[i].hash.image_url +"'/><p>" + response[i].hash.name + "</p> " + response[i].hash.rating + "</div>");
//       }
//     });

//     request.fail(function(errors) {
//       console.error(errors);
//     });

//     x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude;
//   };

//   getLocation();

//   // Cube transitions
//   $('.shape').shape();
//   $('div[title="Flip Right"]').on('click', function(e){
//       $('.shape').shape('flip right');
//   });

//   $('.card').hover(function(e){
//     // $(this).addClass('active')
//     $(this).transition('pulse')
//   });

// });
