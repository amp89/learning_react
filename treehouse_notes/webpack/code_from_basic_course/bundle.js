/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var players = [{
    name: 'alex peterson',
    score: 654,
    id: 1
}, {
    name: 'bob bobberson',
    score: 99,
    id: 2
}, {
    name: 'bob boberstein',
    score: 65,
    id: 3
}];

function Header(props) {
    return React.createElement(
        'div',
        { className: 'header' },
        React.createElement(Stats, { players: props.players }),
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(Stopwatch, null)
    );
};

Header.propTypes = {

    title: React.PropTypes.string.isRequired, //No default value on this one, so make required.
    players: React.PropTypes.array.isRequired //No default value on this one, so make required.

};

function Stats(props) {

    var totalPlayers = props.players.length;

    var totalPoints = props.players.reduce(function (total, player) {
        return total += player.score;
    }, 0);

    return React.createElement(
        'table',
        { clasName: 'stats' },
        React.createElement('thead', null),
        React.createElement(
            'tbody',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    'Players:'
                ),
                React.createElement(
                    'td',
                    null,
                    totalPlayers
                )
            ),
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    'Total Points:'
                ),
                React.createElement(
                    'td',
                    null,
                    totalPoints
                )
            )
        )
    );
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired
};

function Counter(props) {
    return React.createElement(
        'div',
        { className: 'counter' },
        React.createElement(
            'button',
            {
                className: 'counter-action decrement',
                onClick: function onClick() {
                    props.onChange(-1);
                }
            },
            '-'
        ),
        React.createElement(
            'button',
            { className: 'counter-score' },
            props.score
        ),
        React.createElement(
            'button',
            {
                className: 'counter-action increment',
                onClick: function onClick() {
                    props.onChange(1);
                }
            },
            '+'
        )
    );
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
};

function Player(props) {

    return React.createElement(
        'div',
        { className: 'player' },
        React.createElement(
            'div',
            { className: 'player-name' },
            React.createElement(
                'a',
                { className: 'remove-player', onClick: props.onRemove },
                'X'
            ),
            props.name
        ),
        React.createElement(
            'div',
            { className: 'player-score' },
            React.createElement(Counter, { onChange: props.onScoreChange, score: props.score })
        )
    );
};

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

var AddPlayerForm = React.createClass({
    displayName: 'AddPlayerForm',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'add-player-form' },
            React.createElement(
                'form',
                { onSubmit: this.onSubmit },
                React.createElement('input', {
                    type: 'text',
                    value: this.state.name,
                    placeholder: 'New Player Name',
                    onChange: this.onNameChange
                }),
                React.createElement('input', { type: 'submit', value: 'ADD' })
            )
        );
    },

    onNameChange: function onNameChange(event) {
        console.log(event.target.value); //event.target is the change generated
        this.setState({
            name: event.target.value
        });
    },

    onSubmit: function onSubmit(event) {
        event.preventDefault();
        console.log('sub\'d');
        this.props.onAdd(this.state.name);
        this.setState({
            name: ""
        });
    },

    getInitialState: function getInitialState() {
        return {
            name: ""
        };
    },

    propTypes: {
        onAdd: React.PropTypes.func.isRequired
    }

});

var Stopwatch = React.createClass({
    displayName: 'Stopwatch',


    getInitialState: function getInitialState() {
        return {
            running: false,
            elapsedTime: 0,
            previousTime: 0
        };
    },

    onStart: function onStart() {
        this.setState({
            running: true,
            previousTime: Date.now()
        });
    },

    onStop: function onStop() {
        this.setState({
            running: false
        });
    },

    onReset: function onReset() {
        console.log('reset');
        this.setState({
            elapsedTime: 0,
            previousTime: Date.now()
        });
    },

    componentDidMount: function componentDidMount() {
        this.interval = setInterval(this.onTick, 100);
    },

    componentWillUnmount: function componentWillUnmount() {
        clearInterval(this.interval);
    },

    onTick: function onTick() {
        console.log(this.state.running, this.onTick);
        if (this.state.running) {
            var now = Date.now();
            this.setState({
                previousTime: now,
                elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
            });
        }
    },

    render: function render() {
        var seconds = Math.floor(this.state.elapsedTime / 1000);
        return React.createElement(
            'div',
            { className: 'stopwatch' },
            React.createElement(
                'h2',
                null,
                'StOpWaTcH'
            ),
            React.createElement(
                'div',
                { className: 'stopwatch-time' },
                seconds
            ),
            this.state.running ? React.createElement(
                'button',
                { onClick: this.onStop },
                'Stop'
            ) : React.createElement(
                'button',
                { onClick: this.onStart },
                'Start'
            ),
            React.createElement(
                'button',
                { onClick: this.onReset },
                'Reset'
            )
        );
    }
});

var Application = React.createClass({
    displayName: 'Application',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'scoreboard' },
            React.createElement(Header, { title: this.props.title, players: this.state.players }),
            React.createElement(
                'div',
                { className: 'players' },
                this.state.players.map(function (player, index) {
                    return React.createElement(Player, {
                        name: player.name,
                        score: player.score,
                        key: player.id,
                        onScoreChange: function (delta) {
                            this.onScoreChange(delta, index);
                        }.bind(this),
                        onRemove: function () {
                            this.onRemovePlayer(index);
                        }.bind(this)
                    });
                }.bind(this))
            ),
            React.createElement(AddPlayerForm, { onAdd: this.onPlayerAdd })
        );
    },

    nextId: 4,

    onRemovePlayer: function onRemovePlayer(index) {
        console.log(index);
        this.state.players.splice(index, 1);
        this.setState(this.state);
    },

    onPlayerAdd: function onPlayerAdd(name) {
        console.log('new player', name);
        this.state.players.push({
            name: name,
            score: 0,
            id: this.nextId
        });
        this.nextId++;
        this.setState(this.state);
    },

    propTypes: {
        title: React.PropTypes.string.isRequired,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired
        }))
    },

    getDefaultProps: function getDefaultProps() {
        return {
            title: "This is a scoreboard!"
        };
    },

    getInitialState: function getInitialState() {
        return {
            players: this.props.initialPlayers
        };
    },

    onScoreChange: function onScoreChange(delta, index) {
        console.log('onScoreChange', index, delta);
        this.state.players[index].score += delta;
        this.setState(this.state);
    }

});

ReactDOM.render(React.createElement(Application, {
    title: 'titleeee',
    initialPlayers: players
}), document.getElementById('container'));

/***/ })
/******/ ]);