
function Application(props){ //props.title=My Scoreboard
    return (
        <div className="scoreboard">
            <div className="header">
                <h1>
                    {props.title}
                </h1>
            </div>

            <div className="players">
                <div className="player">
                    <div className="player-name">
                        Alex Peterson
                    </div>
                    <div className="player-score">
                        <div className="counter">
                            <button className="counter-action decrement">-</button>
                            <button className="counter-score">99</button>
                            <button className="counter-action increment">+</button>
                        </div>
                    </div>
                </div>
                <div className="player">
                    <div className="player-name">
                        Alex Peterson
                    </div>
                    <div className="player-score">
                        <div className="counter">
                            <button className="counter-action decrement">-</button>
                            <button className="counter-score">99</button>
                            <button className="counter-action increment">+</button>
                        </div>
                    </div>
                </div>
                <div className="player">
                    <div className="player-name">
                        Alex Peterson
                    </div>
                    <div className="player-score">
                        <div className="counter">
                            <button className="counter-action decrement">-</button>
                            <button className="counter-score">99</button>
                            <button className="counter-action increment">+</button>
                        </div>
                    </div>
                </div>
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
