var ChangeLocationLink = require('./ChangeLocationLink')
var CategoryFilter = require('./CategoryFilter')
var ShuffleButton = require('./ShuffleButton')

var Menu = React.createClass({
	render: function(){
		return(
			<div>

				<div className="ui inverted menu">
				  <div className="header item">Mealette</div>
				  <div className="right menu">
				    <div className="header item">
					    <ChangeLocationLink>Change Location</ChangeLocationLink>
				      <a className="filters" href="#"><i className="ellipsis vertical icon"></i></a>
				    </div>
				  </div>
				</div>
	    	<CategoryFilter />
	    	<ShuffleButton />

		    <div className="ui sidebar inverted right vertical menu">
		      <p className="item">
		        Categories
		        <a className="item">
		          Bars
		        </a>
		        <a className="item">
		          Coffee & Tea
		        </a>
		        <a className="item">
		          Breakfast & Brunch
		        </a>
		      </p>
		      <p className="item">
		        Rating

		        <a className="item rat">
		          <i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i>
		        </a>

		        <a className="item rat">
		          <i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i>
		        </a>

		        <a className="item rat">
		          <i className="empty star icon"></i><i className="empty star icon"></i><i className="empty star icon"></i>
		        </a>

		        <a className="item rat">
		          <i className="empty star icon"></i><i className="empty star icon"></i>
		        </a>

		        <a className="item rat">
		          <i className="empty star icon"></i>
		        </a>

		      </p>
		    </div>
	    </div>
		)
	}

});

module.exports = Menu;
