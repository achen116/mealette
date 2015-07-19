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
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var ShowRestaurants = React.createClass({
	  displayName: "ShowRestaurants",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Restaurants: "
	      ),
	      React.createElement(
	        "p",
	        null,
	        this.props.name
	      )
	    );
	  }
	});

	var ShowError = React.createClass({
	  displayName: "ShowError",

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "ui search" },
	      React.createElement(
	        "div",
	        { className: "ui icon input" },
	        React.createElement("input", { className: "prompt", type: "text", placeholder: "Enter Location" }),
	        React.createElement("i", { className: "search icon" })
	      ),
	      React.createElement("div", { className: "results" })
	    );
	  }
	});

	var EnableLocation = React.createClass({
	  displayName: "EnableLocation",

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
	    var x = document.getElementById("demo");
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
	    } else {
	      x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	  }, //ends getLocation

	  showPosition: function showPosition(position) {
	    var x = document.getElementById("demo");
	    var esto = this;
	    var request = $.ajax({
	      url: "https://mealette-backend.herokuapp.com/api",
	      method: "get",
	      data: { lat: position.coords.latitude, lon: position.coords.longitude },
	      dataType: "JSON"
	    });

	    request.done(function (response) {
	      console.log(response);
	      var newRestaurantState = [];
	      for (var i = 0; i < response.length; i++) {
	        newRestaurantState.push({ name: response[i].hash.name, rating: response[i].hash.rating });
	      }
	      esto.setState({ restaurants: newRestaurantState, user_location: true });

	      lat = position.coords.latitude;
	      lon = position.coords.longitude;
	      latlon = new google.maps.LatLng(lat, lon);
	      mapholder = document.getElementById("container");
	      mapholder.style.height = "250px";
	      mapholder.style.width = "500px";

	      var myOptions = {
	        center: latlon, zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        mapTypeControl: true,
	        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
	      };

	      var map = new google.maps.Map(document.getElementById("container"), myOptions);
	      var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });
	    });

	    request.fail(function (errors) {
	      console.error(errors);
	    });

	    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
	  }, //ends show position

	  showError: function showError(error) {
	    var x = document.getElementById("demo");
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
	  }, //ends showError

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
	      showOrNoShow = React.createElement(ShowRestaurants, { name: restaurants });
	    } else {
	      showOrNoShow = React.createElement(ShowError, null);
	    }

	    return React.createElement(
	      "div",
	      null,
	      showOrNoShow
	    );
	  } //ends render
	}); // ends EnableLocation

	React.render(React.createElement(EnableLocation, null), document.getElementById("restaurants"));

/***/ }
/******/ ]);
