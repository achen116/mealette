var CategoryFilter = React.createClass({
  handleReturn: function(event){
    if(event.keyCode == 13){
      this.filterCategory();
     }
  },

  filterCategory: function(event){
    var input = this.refs.category.getDOMNode()
    var category = input.value
    input.value = ''

    var currentLocation = UserLocation.position

    UserLocation.set(currentLocation, category);
  },

  render: function(){
    return (
      <form className="ui form" onKeyDown={this.handleReturn}>
        <div className="ui icon search input">
          <input type="text" ref="category" placeholder="Category" />
          <i className="search link icon" onClick={this.filterCategory}></i>
        </div>
      </form>
    );
  }
});

module.exports = CategoryFilter;
