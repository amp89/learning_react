var players = [
    {
        name:'alex peterson',
        score:654,
        id:1,
    },


    {
        name:'bob bobberson',
        score:653524,
        id:2,
    },


    {
        name:'bob boberstein',
        score:65,
        id:3,
    },


];

function Header(props){
    return (
        <div className="header">
            <h1>
                {props.title}
            </h1>
        </div>
    )

};

Header.propTypes = {

    title:React.PropTypes.string.isRequired //No default value on this one, so make required.

};
/*
//stateless functional component
function Counter(props){
    return (
        <div className="counter">
            <button className="counter-action decrement">-</button>
            <button className="counter-score">{props.score}</button>
            <button className="counter-action increment">+</button>
        </div>
    )

};

Counter.propTypes = {
    score:React.PropTypes.number.isRequired //No default value on this one, so make required.
};
*/
//Class Based component
var Counter = React.createClass({

    render: function(){
        return (
            <div className="counter">
                <button onClick={this.decrementScore} className="counter-action decrement">-</button>
                <button className="counter-score">{this.state.score}</button>
                <button onClick={this.incrementScore} className="counter-action increment">+</button>
            </div>
        )
    },

    incrementScore: function(e){
        //console.log("incrementScore", e);
        this.setState({
            score: this.state.score + 1,
        });
    },

    decrementScore: function(e){
        this.setState({
            score: this.state.score - 1,
        });
    },

    getInitialState: function(){
        return {
            score:this.props.initialScore,
        };
    },

    propTypes: {
        //NOT NEEDED b/c state. score : React.PropTypes.number.isRequired,
        initialScore: React.PropTypes.number.isRequired,
    },


});


function Player(props){

    return (
        <div className="player">
            <div className="player-name">
                {props.name}
            </div>
            <div className="player-score">
                <Counter initialScore={props.score} />
            </div>
        </div>

    )

};

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,

};


function Application(props){ //props.title=My Scoreboard
    return (
        <div className="scoreboard">
            <Header title={props.title} />

            <div className="players">
                {props.players.map(function(player){
                    return <Player name={player.name} score={player.score} key={player.id}/>
                })}
            </div>

        </div>
    );

};

Application.propTypes = {

    title:React.PropTypes.string.isRequired,
    players:React.PropTypes.arrayOf(React.PropTypes.shape(
        {
            name:React.PropTypes.string.isRequired,
            score:React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired,
        }
    )).isRequired

};

Application.defaultProps = {
    title: "Untitled Scoreboard"
};


//ReactDOM.render(<h1>Hello!!!!</h1>,document.getElementById("container"));
ReactDOM.render(
        <Application
            title="titleeee"
            players={players}
        />,
        document.getElementById('container'));//since proptype string, this will cause an error
// ReactDOM.render(<Application title="MY SCOREBOARD"/>, document.getElementById('container'));
