var ShuffleButton = React.createClass({
  shuffleRestaurants: function(event) {
    event.preventDefault();
    console.log('hellooooo');

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
      <button className="ui button" onClick={this.shuffleRestaurants}>See More!</button>
    );
  }
});

module.exports = ShuffleButton;
