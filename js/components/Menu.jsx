var ChangeLocationLink = require('./ChangeLocationLink')
var CategoryFilter = require('./CategoryFilter')
var RepopulateButton = require('./RepopulateButton')

var Menu = React.createClass({

	showDropdown: function(){
	  $('.dropdown')
	    .dropdown({
	      transition: 'drop'
	    });
	},

	render: function(){
		return(
			<div>
				<div className="ui inverted menu">
				  <div className="header item">Mealette</div>
				  <div className="right menu">

				  	<div onClick={this.showDropdown} className="ui floating dropdown">
				  	  <div className="item">
				  	  	Menu
				  	  	<i className="dropdown icon"></i>
				  	  </div>

				  	  <div className="ui menu menu-dropdown">
				  	    <div className="item">
				  	      <RepopulateButton />
				  	    </div>
				  	    <div className="item">
				  	      <ChangeLocationLink>Change Location</ChangeLocationLink>
				  	    </div>
				  	    <div className="">
				  	      <CategoryFilter />
				  	    </div>
				  	  </div>
				  	</div>

				  </div>
				</div>
	    </div>
		)
	}

});

module.exports = Menu;
