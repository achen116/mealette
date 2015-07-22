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
      <form onSubmit={this.filterCategory}>
        <input type="textbox" placeholder="What do you want to eat?" ref="category" />
        <input type="submit" value="search" />
      </form>
    );
  }
});

module.exports = CategoryFilter;
