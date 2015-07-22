(function(){

	var Menu = require('./Menu.jsx');
  var EnableOrDenyLocation = require('./EnableOrDenyLocation.jsx');
  var ShuffleButton = require('./ShuffleButton')

	var Grid = React.createClass({
	render: function(){
		return(
			<div className="">
  				<Menu />
  			  <EnableOrDenyLocation />
          <ShuffleButton />
			</div>
		);
	}
});

React.render(
    React.createElement(Grid,null),
    document.getElementById('wrapper')
    );

})();
