var RepopulateButton = React.createClass({
  repopulateRestaurants: function(event) {
    event.preventDefault();
    console.log('hellooooo');

    if (UserLocation.repopulate === 0) {
      var repopulate = UserLocation.repopulate + 1;
      $('i.plus').removeClass('plus').addClass('minus');
    } else {
      var repopulate = UserLocation.repopulate - 1;
      $('i.minus').removeClass('minus').addClass('plus');
    }

    var currentLocation = UserLocation.position;
    var currentCategory = UserLocation.category;

    UserLocation.set(currentLocation, currentCategory, repopulate);
  },

  render: function() {
    return (
      <a className='repopulate' onClick={this.repopulateRestaurants}><i className="plus icon"></i></a>
    );
  }
});

module.exports = RepopulateButton;
