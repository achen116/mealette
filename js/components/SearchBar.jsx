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
      <form className="ui form" onSubmit={this.changeLocation}>
        <div className="inline field">
          <input type="text" ref="address" placeholder="Enter your location" />
          <button className="ui button" type="submit">Search</button>
        </div>
      </form>
      );
  }
});

module.exports = SearchBar;
