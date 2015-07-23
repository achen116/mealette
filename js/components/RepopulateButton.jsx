var RepopulateButton = React.createClass({
  repopulateRestaurants: function(event) {
    event.preventDefault();

    if (UserLocation.repopulate === 0) {
      var repopulate = UserLocation.repopulate + 1;
    } else {
      var repopulate = UserLocation.repopulate - 1;
    }

    var currentLocation = UserLocation.position;
    var currentCategory = UserLocation.category;

    UserLocation.set(currentLocation, currentCategory, repopulate);
  },

  render: function() {
    return (
      <a className='repopulate' onClick={this.repopulateRestaurants}>
        More Restaurants
      </a>
    );
  }
});

module.exports = RepopulateButton;
