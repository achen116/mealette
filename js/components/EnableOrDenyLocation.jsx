var MainCarousel = require('../carousel/MainCarousel.jsx');
var ChangeLocationFilter = require('./ChangeLocationFilter.jsx');
var FilterOptions = require('../FilterOptions.js');
var Menu = require('./Menu.jsx');

var EnableOrDenyLocation = React.createClass({

  getInitialState: function() {
    return {
      restaurant_objects: null,
      restaurant_location: null,
      user_location: null,
      category: null,
      repopulate: null,
      error: null,
      pageLoad: true,
    };
  },

  componentDidMount: function() {
    FilterOptions.on('change', this.setGeoposition)
    FilterOptions.requestLocation()
  },

  componentWillUnmount: function(){
    FilterOptions.off('change', this.setGeoposition)
  },

  setGeoposition: function(user_location, category, repopulate){
    this.setState({
      restaurant_objects: null,
      user_location: user_location,
      category: category,
      repopulate: repopulate,
      pageLoad: false,
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
    }
    if (user_location.coords){
      data.lat = user_location.coords.latitude;
      data.lon = user_location.coords.longitude;
      data.category = category;
      data.repopulate = repopulate;
    }

    var request = $.ajax({
      url: "https://mealette-backend.herokuapp.com/api",
      method: "get",
      data: data,
      dataType: "JSON"
    });

    request.done(function(response) {
      component.setState({restaurant_objects: response, restaurant_location: response[0].hash.location.city});
      $(".image img").each(function() {
        if (this.src === "") {
          this.src = "https://mealette-backend.herokuapp.com/placeholder-image.png"
        } else {
         this.src = this.src.replace(/ms\.jpg$/,'ls.jpg');
        }
      });
    });

    request.fail(function(errors) {
      component.setState({restaurant_objects: null, error: errors});
    });

  },

  render: function() {
    var content;

    if (this.state.errors){
      content = <div>Error: {this.state.errors}</div>
    } 
    else if (this.state.pageLoad) {
      content =
        <div className="ui active dimmer">
          <div className="ui large text loader">
            <h1 className="home-header">Mealette</h1>
          </div>
        </div>
    }
    else if (this.state.user_location) {
      if (this.state.restaurant_objects) {
        content = <MainCarousel cardData={this.state.restaurant_objects} />;
      } 
      else {
        content =
        <div className="ui active dimmer">
          <div className="ui large text loader">
            <h3>Cooking Up Something Good</h3>
          </div>
        </div>
      }
    } 
    else {
      content = <ChangeLocationFilter />;
    }

    return (
      <div>
        <Menu city={this.state.restaurant_location} />
        {content}
      </div>
    );
  }
});


module.exports = EnableOrDenyLocation;
