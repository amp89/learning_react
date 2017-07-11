import React from 'react';
import ReactDOM from 'react-dom';

import 'app.css'

var players = [
    {
        name:'alex peterson',
        score:654,
        id:1,
    },


    {
        name:'bob bobberson',
        score:99,
        id:2,
    },


    {
        name:'bob boberstein',
        score:65,
        id:3,
    }


];

function Header(props){
    return (
        <div className="header">
            <Stats players={props.players} />
            <h1>{props.title}</h1>
            <Stopwatch />
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
                <a className="remove-player" onClick={props.onRemove}>X</a>
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
    onRemove: React.PropTypes.func.isRequired,
};

var AddPlayerForm = React.createClass({
    render: function(){
        return(
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        value={this.state.name}
                        placeholder="New Player Name"
                        onChange={this.onNameChange}
                    />
                    <input type='submit' value="ADD" />
                </form>
            </div>
        );
    },

    onNameChange: function(event){
        console.log(event.target.value);//event.target is the change generated
        this.setState({
            name:event.target.value,
        });
    },

    onSubmit: function(event){
        event.preventDefault();
        console.log('sub\'d');
        this.props.onAdd(this.state.name);
        this.setState({
            name:"",
        })
    },

    getInitialState: function(){
        return ({
            name:"",
        });
    },

    propTypes: {
        onAdd: React.PropTypes.func.isRequired,
    },



})


var Stopwatch = React.createClass({


    getInitialState:function(){
        return({
            running:false,
            elapsedTime:0,
            previousTime:0,
        });
    },

    onStart : function(){
        this.setState({
            running:true,
            previousTime: Date.now(),
        });
    },

    onStop : function(){
        this.setState({
            running:false,
        });
    },

    onReset: function(){
        console.log('reset');
        this.setState({
            elapsedTime:0,
            previousTime:Date.now(),
        })
    },

    componentDidMount: function(){
        this.interval = setInterval(this.onTick, 100);
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },


    onTick: function(){
        console.log(this.state.running, this.onTick);
        if(this.state.running){
            var now = Date.now();
            this.setState({
                previousTime:now,
                elapsedTime: this.state.elapsedTime + (now-this.state.previousTime)
            });
        }

    },

    render:function(){
        var seconds = Math.floor(this.state.elapsedTime / 1000);
        return(
            <div className="stopwatch">
                <h2>StOpWaTcH</h2>
                <div className='stopwatch-time'>{seconds}</div>
                {
                    this.state.running ?
                        <button onClick={this.onStop}>Stop</button>
                    :
                        <button onClick={this.onStart}>Start</button>
                }
                <button onClick={this.onReset}>Reset</button>
            </div>
        );
    },
})

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
                                        onRemove={function(){
                                            this.onRemovePlayer(index)
                                        }.bind(this)}
                                    />
                                )
                            }.bind(this)
                        )
                    }
                </div>

                <AddPlayerForm onAdd={this.onPlayerAdd}/>

            </div>
        );

    },

    nextId:4,

    onRemovePlayer: function(index){
        console.log(index);
        this.state.players.splice(index,1);
        this.setState(this.state);
    },

    onPlayerAdd: function(name){
        console.log('new player',name);
        this.state.players.push({
            name:name,
            score:0,
            id:this.nextId,
        })
        this.nextId++;
        this.setState(this.state);
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
