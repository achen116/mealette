var MainCarousel = require('../carousel/MainCarousel.jsx');

var CategoryFilter = React.createClass({

  getInitialState: function() {
    return {
      restaurant_objects: null,
      user_location: null,
      error: null,
    };
  },

  filterCategory: function(event){
    event.preventDefault();

    var component = this;
    var input = this.refs.category.getDOMNode()
    var category = input.value
    input.value = ''

    var data = {address: '679 38th Ave, San Francisco', category: category};
    var request = $.ajax({
      url: "http://localhost:3000/api",
      method: "get",
      data: data,
      dataType: "JSON"
    })

    request.done(function(response){
      console.log(response)
      component.setState({restaurant_objects: response});
    });

    request.fail(function(errors){
      component.setState({restaurant_objects: null, error: errors});
    });
  },
  render: function(){
    return (
      <form onSubmit={this.filterCategory}>
        <input type="textbox" placeholder="What do you want to eat?" ref="category" />
        <input type="submit" value="search" />
      </form>

      // <MainCarousel cardData={this.state.restaurant_objects} />
    );
  }
});

module.exports = CategoryFilter;
