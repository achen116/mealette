var  = require('../node_modules/react-3d-carousel/js/depot.js');

var SpinButton = React.createClass({

  componentDidMount: function() {
    this.spinButton();
  },

  spinButton: function() {
    debugger

  },


  render: function(){
    return(
      <button className="ui button spin">Spin!</button>
    );
  }
});
module.exports = SpinButton;
