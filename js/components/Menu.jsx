var ChangeLocationLink = require('./ChangeLocationLink')

var Menu = React.createClass({
	handleClick: function(){
		console.log();
	},
	render: function(){
		return(
			//Menu Code
			<div className="ui segment">
				<ChangeLocationLink>Change Location</ChangeLocationLink>
			</div>
		)
	}

});

module.exports = Menu;
