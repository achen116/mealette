var MoreRestaurantsFilter = React.createClass({
  repopulateRestaurants: function(event) {
    event.preventDefault();

    if (FilterOptions.repopulate === 0) {
      var repopulate = FilterOptions.repopulate + 1;
    } else {
      var repopulate = FilterOptions.repopulate - 1;
    }

    var currentLocation = FilterOptions.position;
    var currentCategory = FilterOptions.category;

    FilterOptions.set(currentLocation, currentCategory, repopulate);
  },

  render: function() {
    return (
      <a className='repopulate' onClick={this.repopulateRestaurants}>
        More Restaurants
      </a>
    );
  }
});

module.exports = MoreRestaurantsFilter;
