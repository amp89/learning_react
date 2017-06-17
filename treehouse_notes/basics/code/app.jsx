function Header(props){
    return (
        <div className="header">
            <h1>
                {props.title}
            </h1>
        </div>
    )

}

Header.propTypes = {

    title:React.PropTypes.string.isRequired //No default value on this one, so make required.

}

function Counter(props){
    return (
        <div className="counter">
            <button className="counter-action decrement">-</button>
            <button className="counter-score">{props.score}</button>
            <button className="counter-action increment">+</button>
        </div>
    )

}

Counter.propTypes = {
    score:React.PropTypes.number.isRequired //No default value on this one, so make required.
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

}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
}


function Application(props){ //props.title=My Scoreboard
    return (
        <div className="scoreboard">
            <Header title={props.title} />

            <div className="players">
                <Player name="Alex Peterson" score={654} />
                <Player name="Alex Peterson" score={65} />
                <Player name="Alex Peterson" score={54} />
            </div>

        </div>
    );

}

Application.propTypes = {

    title:React.PropTypes.string.isRequired

}

Application.defaultProps = {
    title: "Untitled Scoreboard"
}


//ReactDOM.render(<h1>Hello!!!!</h1>,document.getElementById("container"));
ReactDOM.render(
        <Application />,
        document.getElementById('container'));//since proptype string, this will cause an error
// ReactDOM.render(<Application title="MY SCOREBOARD"/>, document.getElementById('container'));
