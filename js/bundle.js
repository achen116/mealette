/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function () {

	  __webpack_require__(9);
	  // require('DisplayRestaurants');
	  // require('DisplaySearchBar');

	  // DISPLAY RESTAURANTS COMPONENT ===================================================
	  var DisplayRestaurants = React.createClass({
	    displayName: 'DisplayRestaurants',

	    render: function render() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Restaurants: '
	        ),
	        React.createElement(
	          'p',
	          null,
	          this.props.name
	        )
	      );
	    }
	  });

	  // DISPLAY SEARCH BAR COMPONENT ====================================================
	  var DisplaySearchBar = React.createClass({
	    displayName: 'DisplaySearchBar',

	    getInitialState: function getInitialState() {
	      return {
	        restaurants: [],
	        user_location: false
	      };
	    }, // ends getInitialState

	    componentDidMount: function componentDidMount() {
	      var searchButton = document.getElementById('search-button');
	      google.maps.event.addDomListener(searchButton, 'click', this.initialize);
	    }, // ends componentDidMount

	    initialize: function initialize() {
	      geocoder = new google.maps.Geocoder();
	      var latlng = new google.maps.LatLng(37.7833, -122.4167);
	      var mapOptions = {
	        zoom: 14,
	        center: latlng
	      };

	      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	    }, // ends initialize

	    codeAddress: function codeAddress() {
	      var address = document.getElementById('address').value;
	      var esto = this;

	      geocoder.geocode({ 'address': address }, function (results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	          map.setCenter(results[0].geometry.location);
	          var marker = new google.maps.Marker({
	            map: map,
	            position: results[0].geometry.location
	          });

	          var lat = results[0].geometry.location.A;
	          var lon = results[0].geometry.location.F;

	          var request = $.ajax({
	            url: 'https://mealette-backend.herokuapp.com/api',
	            method: 'get',
	            dataType: 'json',
	            data: { lat: lat, lon: lon }
	          });

	          request.done(function (response) {
	            $('#map-canvas').show();

	            var newRestaurantState = [];
	            for (var i = 0; i < response.length; i++) {
	              newRestaurantState.push({ name: response[i].hash.name, rating: response[i].hash.rating });
	            }

	            esto.setState({ restaurants: newRestaurantState, user_location: true });
	          });

	          request.fail(function (error) {
	            console.error(error);
	          });
	        } else {
	          return alert('Geocode was not successful for the following reason: ' + status);
	        }
	      });
	    }, // ends codeAddress

	    render: function render() {
	      var restaurants = this.state.restaurants.map(function (restaurant) {
	        return React.createElement(
	          'li',
	          null,
	          restaurant.name,
	          ' - ',
	          restaurant.rating
	        );
	      });

	      var showOrNoShow;
	      var enableLocation = this.state.user_location;
	      if (enableLocation) {
	        showOrNoShow = React.createElement(DisplayRestaurants, { name: restaurants });
	      }

	      return React.createElement(
	        'div',
	        null,
	        React.createElement('input', { id: 'address', type: 'textbox', placeholder: 'Enter your location' }),
	        React.createElement('input', { id: 'search-button', type: 'button', value: 'Geocode', onClick: this.codeAddress }),
	        React.createElement(
	          'div',
	          null,
	          showOrNoShow
	        )
	      );
	    }
	  }); // ends DisplaySearchBar

	  // RENDER REACT COMPONENTS =========================================================
	  React.render(React.createElement(EnableOrDenyLocation, null), document.getElementById('restaurants'));
	})();

/***/ },

/***/ 9:
/***/ function(module, exports) {

	// ENABLE/DISABLE LOCATION COMPONENT ===============================================
	"use strict";

	alert("We made it!");

	var EnableOrDenyLocation = React.createClass({
	  displayName: "EnableOrDenyLocation",

	  getInitialState: function getInitialState() {
	    return {
	      restaurants: [],
	      user_location: false
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.getLocation();
	  },

	  getLocation: function getLocation() {
	    var x = document.getElementById("enable-location-request");
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
	    } else {
	      x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	  }, // ends getLocation

	  showPosition: function showPosition(position) {
	    var x = document.getElementById("enable-location-request");

	    var esto = this;
	    var request = $.ajax({
	      url: "https://mealette-backend.herokuapp.com/api",
	      method: "get",
	      data: { lat: position.coords.latitude, lon: position.coords.longitude },
	      dataType: "JSON"
	    });

	    request.done(function (response) {
	      var newRestaurantState = [];
	      for (var i = 0; i < response.length; i++) {
	        newRestaurantState.push({ name: response[i].hash.name, rating: response[i].hash.rating });
	      }

	      esto.setState({ restaurants: newRestaurantState, user_location: true });

	      lat = position.coords.latitude;
	      lon = position.coords.longitude;
	      latlon = new google.maps.LatLng(lat, lon);
	      mapholder = document.getElementById("google-map");
	      mapholder.style.height = "250px";
	      mapholder.style.width = "500px";

	      var myOptions = {
	        center: latlon, zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        mapTypeControl: true,
	        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
	      };

	      var map = new google.maps.Map(document.getElementById("google-map"), myOptions);
	      var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });
	    });

	    request.fail(function (errors) {
	      console.error(errors);
	    });

	    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
	  }, // ends show position

	  showError: function showError(error) {
	    var x = document.getElementById("enable-location-request");
	    switch (error.code) {
	      case error.PERMISSION_DENIED:
	        x.innerHTML = "Please provide your address.";
	        break;
	      case error.POSITION_UNAVAILABLE:
	        x.innerHTML = "Location information is unavailable.";
	        break;
	      case error.TIMEOUT:
	        x.innerHTML = "The request to get location timed out.";
	        break;
	      case error.UNKNOWN_ERROR:
	        x.innerHTML = "An unknown error occurred.";
	        break;
	    }
	  }, // ends showError

	  render: function render() {
	    var restaurants = this.state.restaurants.map(function (restaurant) {
	      return React.createElement(
	        "li",
	        null,
	        restaurant.name,
	        " - ",
	        restaurant.rating
	      );
	    });

	    var showOrNoShow;
	    var enableLocation = this.state.user_location;

	    if (enableLocation) {
	      showOrNoShow = React.createElement(DisplayRestaurants, { name: restaurants });
	    } else {
	      showOrNoShow = React.createElement(DisplaySearchBar, null);
	    }

	    return React.createElement(
	      "div",
	      null,
	      showOrNoShow
	    );
	  }
	}); // ends EnableOrDenyLocation

/***/ }

/******/ });