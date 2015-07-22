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
        <div className="ui icon input">
          <input type="text" ref="category" placeholder="Category" />
          <i className="search link icon" onClick={this.filterCategory}></i>
        </div>
      </form>
    );
  }
});

module.exports = CategoryFilter;
