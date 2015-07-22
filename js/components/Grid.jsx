(function(){

	var Menu = require('./Menu.jsx');
  var EnableOrDenyLocation = require('./EnableOrDenyLocation.jsx');

	var Grid = React.createClass({
	render: function(){
		return(
			<div className="">
				<Menu />
			  <EnableOrDenyLocation />
			</div>
		);
	}
});

React.render(
    React.createElement(Grid,null),
    document.getElementById('wrapper')
    );

})();
