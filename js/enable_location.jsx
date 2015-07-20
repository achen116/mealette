(function(){
  // var ReactCarousel = require('./carousel/index.js');
  var MainCarousel = require('./carousel/MainCarousel.jsx');

  // ENABLE/DISABLE LOCATION COMPONENT ===============================================

  var EnableOrDenyLocation = React.createClass({
    getInitialState: function() {
      return {
        restaurants: [],
        restaurant_objects: [],
        user_location: false
      }
    },

    componentDidMount: function() {
      this.getLocation();
    },

    getLocation: function() {
      var x = document.getElementById("enable-location-request");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }, // ends getLocation

    showPosition: function(position) {
      var x = document.getElementById("enable-location-request");

      var esto = this;
      var request = $.ajax({
        url: "https://mealette-backend.herokuapp.com/api",
        method: "get",
        data: {lat: position.coords.latitude, lon: position.coords.longitude},
        dataType: "JSON"
      });

      request.done(function(response) {
        var newRestaurantState = []
        for (var i = 0; i < response.length; i++) {
          newRestaurantState.push( {name: response[i].hash.name, rating: response[i].hash.rating} );
        }

        esto.setState({ restaurants: newRestaurantState, restaurant_objects: response, user_location: true });

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        latlon = new google.maps.LatLng(lat, lon)
        mapholder = document.getElementById('google-map')
        mapholder.style.height = '250px';
        mapholder.style.width = '500px';

        var myOptions = {
        center:latlon,zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:true,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
        };

        var map = new google.maps.Map(document.getElementById("google-map"), myOptions);
        var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
      });

      request.fail(function(errors) {
        console.error(errors);
      });

      x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
    }, // ends show position

    showError: function(error) {
      var x = document.getElementById("enable-location-request");
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
    }, // ends showError

    render: function() {

      var showOrNoShow;
      var enableLocation = this.state.user_location;

      if (enableLocation) {
        showOrNoShow = <MainCarousel cardData={this.state.restaurant_objects} />;
      } else {
        showOrNoShow = <DisplaySearchBar />;
      }

      return (
        <div>
          {showOrNoShow}
        </div>
      );
    }
  }); // ends EnableOrDenyLocation

  // DISPLAY RESTAURANTS COMPONENT ===================================================
  var DisplayRestaurants = React.createClass({
    render: function() {
      return (
        <div>
        <h2>Restaurants: </h2>
        <p>{this.props.name}</p>
        </div>
        );
    }
  });


  // DISPLAY SEARCH BAR COMPONENT ====================================================
  var DisplaySearchBar = React.createClass({
    getInitialState: function() {
      return {
        restaurants: [],
        user_location: false
      }
    }, // ends getInitialState

    componentDidMount: function() {
      var searchButton = document.getElementById('search-button')
      google.maps.event.addDomListener(searchButton, 'click', this.initialize);
    }, // ends componentDidMount

    initialize: function() {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(37.7833, -122.4167);
      var mapOptions = {
        zoom: 14,
        center: latlng
      }

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }, // ends initialize

    codeAddress: function() {
      var address = document.getElementById('address').value;
      var esto = this;

      geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });

          var lat = results[0].geometry.location.A
          var lon = results[0].geometry.location.F

          var request = $.ajax({
            url: "https://mealette-backend.herokuapp.com/api",
            method: "get",
            dataType: "json",
            data: {lat: lat, lon: lon}
          })

          request.done(function(response){
            $('#map-canvas').show();

            var newRestaurantState = []
            for (var i = 0; i < response.length; i++) {
              newRestaurantState.push({name: response[i].hash.name, rating: response[i].hash.rating});
            }

            esto.setState({restaurants: newRestaurantState, user_location: true});
          })

          request.fail(function(error) {
            console.error(error);
          })
        }
        else {
          return alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }, // ends codeAddress

    render: function() {
      var restaurants = this.state.restaurants.map(function(restaurant) {
        return (
          <li>{restaurant.name} - {restaurant.rating}</li>
          );
      })

      var showOrNoShow;
      var enableLocation = this.state.user_location;
      if (enableLocation) {
        showOrNoShow = <DisplayRestaurants name={restaurants}/>;
      }

      return (
        <div>
        <input id="address" type="textbox" placeholder="Enter your location" />
        <input id="search-button" type="button" value="Geocode" onClick={this.codeAddress} />
        <div>{showOrNoShow}</div>
        </div>
        );
    }
  }); // ends DisplaySearchBar

  // RENDER REACT COMPONENTS =========================================================
  React.render(
    React.createElement(EnableOrDenyLocation,null),
    document.getElementById('restaurants')
    );
})();
