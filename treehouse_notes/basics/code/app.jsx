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
            <Stats players={props.players} />
            <h1>
                {props.title}
            </h1>
        </div>
    )

};

Header.propTypes = {

    title:React.PropTypes.string.isRequired, //No default value on this one, so make required.
    players:React.PropTypes.array.isRequired, //No default value on this one, so make required.

};

function Stats(props){

    var totalPlayers = props.players.length;

    var totalPoints = props.players.reduce(function(total,player){
        return total += player.score
    },0);

    return (
        <table clasName="stats">
            <thead></thead>
            <tbody>
                <tr>
                    <td>Players:</td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points:</td>
                    <td>{totalPoints}</td>
                </tr>

            </tbody>
        </table>
    );
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired,
}


function Counter(props){
    return (
        <div className="counter">
            <button
                className="counter-action decrement"
                onClick={ function() {props.onChange(-1);}}
            >-</button>
            <button className="counter-score">{props.score}</button>
            <button
                className="counter-action increment"
                onClick={ function() {props.onChange(1);}}
            >+</button>
        </div>

    )
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
}


function Player(props){

    return (
        <div className="player">
            <div className="player-name">
                {props.name}
            </div>
            <div className="player-score">
                <Counter onChange={props.onScoreChange} score={props.score} />
            </div>
        </div>

    )

};

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired,
};

var Application = React.createClass({
    render: function(){
        return (

            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players} />

                <div className="players">
                    {
                        this.state.players.map(function(player, index)
                            {
                                return (
                                    <Player
                                        name={player.name}
                                        score={player.score}
                                        key={player.id}
                                        onScoreChange={function(delta){
                                                this.onScoreChange(delta,index);
                                        }.bind(this)}
                                    />
                                )
                            }.bind(this)
                        )
                    }
                </div>

            </div>
        );

    },
    propTypes: {
        title:React.PropTypes.string.isRequired,
        initialPlayers:React.PropTypes.arrayOf(
            React.PropTypes.shape(
                {
                    name:React.PropTypes.string.isRequired,
                    score:React.PropTypes.number.isRequired,
                    id: React.PropTypes.number.isRequired,
                }
            )
        ),
    },

    getDefaultProps: function(){
        return ({
            title:"This is a scoreboard!",
        });
    },

    getInitialState: function(){
        return (
            {
                players:this.props.initialPlayers,
            }
        )
    },

    onScoreChange: function(delta,index){
        console.log('onScoreChange', index, delta);
        this.state.players[index].score += delta;
        this.setState(this.state);
    },

});

ReactDOM.render(
        <Application
            title="titleeee"
            initialPlayers={players}
        />,
        document.getElementById('container'));
