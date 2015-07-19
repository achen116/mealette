var Carousel = require('react-3d-carousel');
var Ease = require('ease-functions');
var cards = require('./cards');

var MainCarousel = React.createClass({
    getInitialState: function () {
        return {
            cards: cards.slice(0, 5),
            width: 400,
            layout: 'prism',
            ease: 'bounceOut',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {cards: cards.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        var easeList = Object.keys(Ease).map(function (d) {
            return (<option key={d} value={d}>{d}</option>)
        });
        return (
            <div>
                <Carousel width={this.state.width}
                          cards={this.state.cards}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>
            </div>
        );
    }
});

module.exports = MainCarousel;
