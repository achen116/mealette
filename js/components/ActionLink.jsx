var objectAssign = require('object-assign');

module.exports = React.createClass({

  propTypes:{
    onClick: React.PropTypes.func.isRequired
  },

  onClick: function(event){
    event.preventDefault();
    if (this.props.onClick) this.props.onClick(event);
  },

  render: function(){
    var props = objectAssign({}, this.props)
    if ('string' != typeof props.href) props.href = "";
    props.onClick = this.onClick;
    return React.createElement('a', props)
  }

});
