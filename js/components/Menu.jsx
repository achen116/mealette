var Menu = React.createClass({
	render: function(){
		return(
			//Menu Code
			<div className="ui inverted menu">
			  <div className="header item">Mealette</div>
			  <div className="right menu">
			    <div className="header item">
			      <a className="filters" href="#"><i className="ellipsis vertical icon"></i></a>
			    </div>

			  //Vertical SideBar
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
			    //End Vertical SideBar


			    <div className="pusher">
			      //Site content
			    </div>

			  </div>
			</div>
		);
	}
});
module.exports = Menu;