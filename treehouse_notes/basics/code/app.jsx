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

function Counter(props){
    return (
        <div className="counter">
            <button  className="counter-action decrement">-</button>
            <button className="counter-score">{props.score}</button>
            <button className="counter-action increment">+</button>
        </div>

    )
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
}


function Player(props){

    return (
        <div className="player">
            <div className="player-name">
                {props.name}
            </div>
            <div className="player-score">
                <Counter score={props.score} />
            </div>
        </div>

    )

};

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,

};

var Application = React.createClass({
    render: function(){
        return (

            <div className="scoreboard">
                <Header title={this.props.title} />

                <div className="players">
                    {
                        this.state.players.map(function(player)
                        {
                            return <Player name={player.name} score={player.score} key={player.id}/>
                        })
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
    }


});

ReactDOM.render(
        <Application
            title="titleeee"
            initialPlayers={players}
        />,
        document.getElementById('container'));
