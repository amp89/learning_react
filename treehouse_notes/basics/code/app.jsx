
function Application(){
    return (
        <div>
            <h1>Helloooooo!</h1>
            <p>Rendered by Application Componenet</p>
        </div>
    );

}

//ReactDOM.render(<h1>Hello!!!!</h1>,document.getElementById("container"));
ReactDOM.render(<Application />, document.getElementById('container'));
