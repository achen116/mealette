(function(){
  // var ReactCarousel = require('./carousel/index.js');
  var MainCarousel = require('./carousel/MainCarousel.jsx');

  // ENABLE/DISABLE LOCATION COMPONENT ===============================================

  var EnableOrDenyLocation = React.createClass({
    getInitialState: function() {
      return {
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
        esto.setState({ restaurant_objects: response, user_location: true });
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
        showOrNoShow = <SearchBar />;
      }

      return (
        <div>
        {showOrNoShow}
        </div>
        );
    }
  }); // ends EnableOrDenyLocation


  // DISPLAY SEARCH BAR COMPONENT ====================================================
  var SearchBar = React.createClass({
    getInitialState: function() {
      return {
        restaurant_objects: [],
        user_location: false
      }
    }, // ends getInitialState

    codeAddress: function(e) {
      e.preventDefault();
      var address = React.findDOMNode(this.refs.address).value.trim();
      // When someone hits enter or clicks geocode, we call this function
      // This function sends the plain text to mealette-backend/geocode
      // Backend picks up the text, runs a geocode on it for coordinates
      // Backend then sends coordinates to /api for a new call
      // Backend returns the result like normal
      console.log(address);
      var esto = this;

      var request = $.ajax({
        url: "http://localhost:3000/api",
        // url: "https://mealette-backend.herokuapp.com/geocode",
        method: "get",
        dataType: "json",
        data: {address: address}
      });

      request.done(function(response){
        console.log(response)
        esto.setState({ restaurant_objects: response, user_location: true });
      });

      request.fail(function(error) {
        console.error(error);
      });

    }, // ends codeAddress

    render: function() {
      var showOrNoShow;
      var enableLocation = this.state.user_location;
      if (enableLocation) {
        showOrNoShow = <MainCarousel cardData={this.state.restaurant_objects} />;
      }

      return (
        <div>
        <form onSubmit={this.codeAddress}>
          <input id="address" type="textbox" placeholder="Enter your location" ref="address" />
          <input id="search-button" type="submit" value="Geocode" />
        </form>
        <div>{showOrNoShow}</div>
        </div>
        );
    }
  }); // ends SearchBar

  // RENDER REACT COMPONENTS =========================================================
  React.render(
    React.createElement(EnableOrDenyLocation,null),
    document.getElementById('restaurants')
    );
})();
