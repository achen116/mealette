(function(){

	var Menu = require('./Menu.jsx');
  var EnableOrDenyLocation = require('./EnableOrDenyLocation.jsx');
  var RepopulateButton = require('./RepopulateButton')

	var Grid = React.createClass({
	render: function(){
		return(
			<div className="">
  				<Menu />
  			  <EnableOrDenyLocation />
          <RepopulateButton />
			</div>
		);
	}
});

React.render(
    React.createElement(Grid,null),
    document.getElementById('wrapper')
    );

})();
