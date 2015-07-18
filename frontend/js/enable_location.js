var EnableLocation = React.createClass({
  componentDidMount: function() {
    // var x = document.getElementById("demo");
    // debugger
    this.getLocation();
  },

  getLocation: function() {
    var x = document.getElementById("demo");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
  },

  showPosition: function(position) {
    var x = document.getElementById("demo");
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
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latlon = new google.maps.LatLng(lat, lon)
        mapholder = document.getElementById('container')
        mapholder.style.height = '250px';
        mapholder.style.width = '500px';

        var myOptions = {
        center:latlon,zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:true,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
        }

        var map = new google.maps.Map(document.getElementById("container"), myOptions);
        var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
      });

      request.fail(function(errors) {
        console.error(errors);
      });

      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  },

  showError: function(error) {
    var x = document.getElementById("demo");
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
      }
  },

  render: function() {
    return (
      <div>
        <div>Enable Location Working!</div>
        <div>{this.props.message}</div>
      </div>
    );
  }
});

React.render(<EnableLocation message="Yo yo hey" />, document.getElementById('container'));