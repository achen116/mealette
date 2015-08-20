var ChangeLocationLink = require('./ChangeLocationLink')
var CategoryFilter = require('./CategoryFilter')
var MoreRestaurantsFilter = require('./MoreRestaurantsFilter')

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
				<div className="ui red inverted menu">
				  <div className="header item">Mealette</div>
				  <div className="right menu">
				  	<div className="header item city">
				  		{this.props.city}
				  	</div>
				  	<div onClick={this.showDropdown} className="ui dropdown" tabIndex="0">
				  	  <div className="item header">
				  	  	<i className="sidebar icon"></i>
				  	  </div>

				  	  <div className="ui menu menu-dropdown">
				  	    <div className="item">
				  	      <MoreRestaurantsFilter />
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
