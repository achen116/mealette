var ShowRestaurants = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Restaurants: </h2>
        <p>{this.props.name}</p>
      </div>
    )
  }
})

// var ShowError = React.createClass({
//   render: function() {
//     return (
//       <div className="ui search">
//         <div className="ui icon input">
//           <input className="prompt" type="text" placeholder="Enter Location" />
//           <i className="search icon"></i>
//         </div>
//         <div className="results"></div>
//       </div>
//     )
//   }
// })

var ShowError = React.createClass({
  componentDidMount: function() {
    google.maps.event.addDomListener(window, 'load', this.initialize);
  },

  initialize: function() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(37.7833, -122.4167);
    var mapOptions = {
      zoom: 14,
      center: latlng
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  },

  codeAddress: function() {
    var address = document.getElementById('address').value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

        var lat = results[0].geometry.location.A
        var lon = results[0].geometry.location.F

        var request = $.ajax({
          url: "http://localhost:3000/api",
          method: "get",
          dataType: "json",
          data: {lat: lat, lon: lon}
        })

        request.done(function(response){
          console.log(response)
        })
        request.fail(function(error) {
          console.error(error)
        })

      } else {
        return alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

  render: function() {
    return (
      <div>
        <p>Hi Manual Search</p>

        <input id="address" type="textbox" placeholder="Enter your location" />
        <input id="searchButton" type="button" value="Geocode" onClick={this.codeAddress} />
      </div>
    );
  }

})//ends ManualSearch

var EnableLocation = React.createClass({
  getInitialState: function() {
    return {
      restaurants: [],
      user_location: false
    }
  },

  componentDidMount: function() {
    this.getLocation();
  },

  getLocation: function() {
    var x = document.getElementById("demo");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
  },//ends getLocation

  showPosition: function(position) {
    var x = document.getElementById("demo");
      var esto = this;
      var request = $.ajax({
        url: "http://localhost:3000/api",
        method: "get",
        data: {lat: position.coords.latitude, lon: position.coords.longitude},
        dataType: "JSON"
      });

      request.done(function(response) {
        var newRestaurantState = []
        for (var i = 0; i < response.length; i++) {
          newRestaurantState.push( {name: response[i].hash.name, rating: response[i].hash.rating} );
        }
        esto.setState({ restaurants: newRestaurantState, user_location: true });

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
        };

        var map = new google.maps.Map(document.getElementById("container"), myOptions);
        var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
      });

      request.fail(function(errors) {
        console.error(errors);
      });

      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  },//ends show position

  showError: function(error) {
    var x = document.getElementById("demo");
      switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "Please provide your address."
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get location timed out."
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
      }
  },//ends showError

  render: function() {
    var restaurants = this.state.restaurants.map(function(restaurant) {
      return (
        <li>{restaurant.name} - {restaurant.rating}</li>
      );
    });

    var showOrNoShow;
    var enableLocation = this.state.user_location;
    if (enableLocation) {
      showOrNoShow = <ShowRestaurants name={restaurants}/>;
    } else {
      showOrNoShow = <ShowError />;
    }

    return (
      <div>
        {showOrNoShow}
      </div>
    );
  } //ends render
});// ends EnableLocation

React.render(<EnableLocation />, document.getElementById('restaurants'));
