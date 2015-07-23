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
      <div className="change-location">
          <form className="ui form change-location" onSubmit={this.changeLocation}>
            <div className="ui icon search input">
              <input type="text" ref="address" placeholder="Enter your location" /><i className="search link icon" onClick={this.changeLocation}></i>
            </div>
          </form>
      </div>
    );
  }
});

module.exports = SearchBar;
