var ShuffleButton = React.createClass({
  shuffleRestaurants: function(event) {
    event.preventDefault();
    console.log('hellooooo');

    var repopulate = UserLocation.repopulate + 1;
    var currentLocation = UserLocation.position;
    var currentCategory = UserLocation.category;

    debugger
    UserLocation.set(currentLocation, currentCategory, repopulate);
  },

  render: function() {
    return (
      <button className="ui button" onClick={this.shuffleRestaurants}>Shuffle!</button>
    );
  }
});

module.exports = ShuffleButton;
