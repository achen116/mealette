var ChangeLocationLink = require('./ChangeLocationLink')
var CategoryFilter = require('./CategoryFilter')


var Menu = React.createClass({

	showDropdown: function(){
	  $('.dropdown')
	    .dropdown({
	      action: 'hide'
	    })
	  ;
	},

	render: function(){
		return(
			<div>
				<div className="ui inverted menu">
				  <div className="header item">Mealette</div>
				  <div className="right menu">

				  	<div className="ui dropdown">
				  	  <div onClick={this.showDropdown} className="header item">Menu <i onClick={this.showDropdown} className="dropdown icon"></i></div>

				  	  <div className="ui inverted menu">
				  	    <div className="item">
				  	      <ChangeLocationLink>Change Location</ChangeLocationLink>
				  	    </div>
				  	    <div className="item">
				  	      <CategoryFilter/>
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
