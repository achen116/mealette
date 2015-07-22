var CategoryFilter = React.createClass({

  filterCategory: function(event){
    event.preventDefault();
    console.log('in filter category');

    var component = this;
    var input = this.refs.category.getDOMNode()
    var category = input.value
    input.value = ''

    var currentLocation = UserLocation.position

    UserLocation.set(currentLocation, category);
  },

  render: function(){
    return (
      <form className="ui form" onSubmit={this.filterCategory}>
        <div className="inline field">
          <input type="text" ref="category" placeholder="Change category" />
          <button className="ui button" type="submit">Search</button>
        </div>
      </form>
    );
  }
});

module.exports = CategoryFilter;
