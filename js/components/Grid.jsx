(function(){

	var Menu = require('./Menu.jsx');
  var EnableOrDenyLocation = require('./EnableOrDenyLocation.jsx');

	var Grid = React.createClass({
	render: function(){
		return(
			<div>
				<Menu />
				<div className="ui grid">

				  <div className="four wide column"></div>
				  <div id="cbox" className="cbox eight wide column">
					  <div id="enable-location-request"></div>
					  <EnableOrDenyLocation />
				  </div>
				  <div className="four wide column"></div>

				  <div className="sixteen wide column"></div>

				  <div className="five wide column"></div>
				  <div className="six wide column reviews">Reviews</div>
				  <div className="five wide column"></div>

				</div>
			</div>
		);
	}
});

React.render(
    React.createElement(Grid,null),
    document.getElementById('wrapper')
    );

})();
