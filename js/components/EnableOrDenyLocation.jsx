var MainCarousel = require('../carousel/MainCarousel.jsx');
var SearchBar = require('./SearchBar.jsx');
var UserLocation = require('../UserLocation.js');

var EnableOrDenyLocation = React.createClass({

  getInitialState: function() {
    return {
      restaurant_objects: null,
      user_location: null,
      category: null,
      repopulate: null,
      error: null,
    };
  },

  componentDidMount: function() {
    UserLocation.on('change', this.setGeoposition)
    UserLocation.request()
  },

  componentWillUnmount: function(){
    UserLocation.off('change', this.setGeoposition)
  },

  setGeoposition: function(user_location, category, repopulate){
    this.setState({
      restaurant_objects: null,
      user_location: user_location,
      category: category,
      repopulate: repopulate,
    });
    this.loadRestaurants(user_location, category, repopulate);
  },

  unableToGetGeoposition: function(positionError){
    this.setState({user_location: false})
  },

  loadRestaurants: function(user_location, category, repopulate) {
    if (!user_location) return;

    var component = this;
    var data = {};

    if (user_location.address){
      data.address = user_location.address;
      data.category = category;
      data.repopulate = repopulate;
      debugger
    }
    if (user_location.coords){
      data.lat = user_location.coords.latitude;
      data.lon = user_location.coords.longitude;
      data.category = category;
      data.repopulate = repopulate;
      debugger
    }

    var request = $.ajax({
      url: "http://localhost:3000/api",
      // url: "https://mealette-backend.herokuapp.com/api",
      method: "get",
      data: data,
      dataType: "JSON"
    });

    request.done(function(response) {
      console.log(response);
      component.setState({restaurant_objects: response});
      $(".image img").each(function() {
         this.src = this.src.replace(/ms\.jpg$/,'ls.jpg');
        });
    });

    request.fail(function(errors) {
      component.setState({restaurant_objects: null, error: errors});
    });

  },

  render: function() {
    var content;

    if (this.state.errors){
      content = <div>{this.state.errors}</div>
    } else if (this.state.user_location) {
      if (this.state.restaurant_objects) {
        content = <MainCarousel cardData={this.state.restaurant_objects} />;
      } else{
        content = <div>loading restaurants</div>;
      }
    } else {
      content = <SearchBar />;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});


module.exports = EnableOrDenyLocation;
