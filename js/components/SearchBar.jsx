var SearchBar = React.createClass({

  changeLocation: function(event){
    event.preventDefault();
    var input = this.refs.address.getDOMNode()
    var address = input.value
    input.value = ''
    UserLocation.set({address: address});
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.changeLocation}>
          <input type="textbox" placeholder="Enter your location" ref="address" />
          <input type="submit" value="Geocode" />
        </form>
      </div>
      );
  }
});

module.exports = SearchBar;
