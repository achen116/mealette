var objectAssign = require('object-assign');
var ActionLink = require('./ActionLink')

module.exports = React.createClass({

  changeLocation: function(){
    FilterOptions.remove();
  },

  render: function(){
    var props = objectAssign({}, this.props)
    props.onClick = this.changeLocation;
    return React.createElement(ActionLink, props, this.props.children)
  }

});
