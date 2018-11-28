import React, {Component} from 'react';
import './App.css';

let items = [];
let numOfMoves;
const maxNumOfMoves = 64;
let marioJump;
let maxGreenSprites;

/**
 * Welcome function with properties
 * @param props
 * */
function Welcome(props) {
    return (
        <div>
            <h2>Hackerbay Game </h2>
            <p>You need to eat all the GreenSprites in 64 steps. By Default board size is 10 x 10, you can change it by
                reloading or entering the height and width in prompt</p>
        </div>
    );
}

/**
 * function to read score cards
 * @param props
 * */
function ScoreCards(props) {
    let scoreAchived = document.getElementById("score_achived");
    let numberOfMoveScore = document.getElementById("number_of_moves_score");
    let stepReminding = document.getElementById("step_reminding");
    let greenSpritesRemaining = document.getElementById("green_sprites_remaining");

    stepReminding.innerHTML = maxNumOfMoves - numOfMoves;
    numberOfMoveScore.innerHTML = numOfMoves;
    greenSpritesRemaining.innerHTML = document.getElementsByClassName("active").length;
    scoreAchived.innerHTML = maxGreenSprites - document.getElementsByClassName("active").length;
}

/**
 * this is component for score
 * */
class Score extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            score: 0
        }
    }

    render() {
        return (
            <div id="score">
                <div>
                    <p>Score Achieved</p>
                    <p id="score_achived">0</p>
                </div>
                <div>
                    <p>Step used</p>
                    <p id="number_of_moves_score">0</p>
                </div>
                <div>
                    <p>Number of steps remaining</p>
                    <p id="step_reminding">0</p>
                </div>
                <div>
                    <p>Number of GreenSprites remaining</p>
                    <p id="green_sprites_remaining">0</p>
                </div>
            </div>
        )
    }
}

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };

    }

    render() {
        return (
            <div className={this.state.selected ? "cell active" : "cell"}
                 id={this.props.id}>

            </div>
        )
    }
}

function checkFinish() {
    if (numOfMoves === maxNumOfMoves) {
        let confirm = window.confirm("Game Over. Do you wish to restart?");
        if (confirm === true) {
            window.location.reload();
        }
    }
    let check = document.getElementsByClassName("active");
    if (check.length === 0) {
        let gameComplete = window.confirm("Well done! You have finished the game in " + numOfMoves + " moves");
        if (gameComplete === true) {
            window.location.reload();
        }
    }
}

class Box extends Component {

    constructor(props) {
        super(props);
        this.c = [];
        for (let i = 0; i <= this.props.matrix; i++) {
            this.c.push(<Cell key={i} id={i} cells={this.c}/>);
            items.push(i);
        }
        this.state = {cells: this.c};
    }

    render() {
        return (
            <div>
                {this.state.cells}
            </div>
        )
    }
}

/**
 * Randomize array element order in place
 * @param array
 * @return shuffled array
 **/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function movement(event) {
    if (event.keyCode === 37) {
        let mario = document.getElementsByClassName("mario");
        let marioId = mario[0].id;
        let move = document.getElementById(marioId - 1);
        if (move != null) {
            if (move.classList.contains("active")) {
                move.classList.toggle('active');
            }
            move.innerHTML = document.getElementById(marioId).innerHTML;
            document.getElementById(marioId).innerHTML = "";
            document.getElementById(marioId).classList.toggle("mario");
            move.classList.toggle("mario");
            marioId -= 1;
        }
    } else {
        numOfMoves= numOfMoves - 1;
    }

    if (event.keyCode === 38) {
        let mario = document.getElementsByClassName("mario");
        let marioId = mario[0].id;
        let moveUp = parseInt(marioId, 10) - parseInt(marioJump, 10);
        let move = document.getElementById(moveUp);
        if (move != null) {
            if (move.classList.contains("active")) {
                move.classList.toggle("active");
            }
            move.innerHTML = document.getElementById(marioId).innerHTML;
            document.getElementById(marioId).innerHTML = "";
            document.getElementById(marioId).classList.toggle("mario");
            move.classList.toggle("mario");
            marioId -= marioJump;
        }
    } else {
        numOfMoves= numOfMoves - 1;
    }

    if (event.keyCode === 39) {
        let mario = document.getElementsByClassName("mario");
        let marioId = mario[0].id;
        let moveRight = parseInt(marioId, 10) + 1;
        let move = document.getElementById(moveRight);
        if (move != null) {
            if (move.classList.contains("active")) {
                move.classList.toggle("active");
            }
            move.innerHTML = document.getElementById(marioId).innerHTML;
            document.getElementById(marioId).innerHTML = "";
            document.getElementById(marioId).classList.toggle("mario");
            move.classList.toggle("mario");
            marioId += 1;
        }
    }

    if (event.keyCode === 40) {
        let mario = document.getElementsByClassName("mario");
        let marioId = mario[0].id;
        let moveUp = parseInt(marioId, 10) + parseInt(marioJump, 10);
        let move = document.getElementById(moveUp);
        if (move != null) {
            if (move.classList.contains("active")) {
                move.classList.toggle("active");
            }
            move.innerHTML = document.getElementById(marioId).innerHTML;
            document.getElementById(marioId).innerHTML = "";
            document.getElementById(marioId).classList.toggle("mario");
            move.classList.toggle("mario");
            marioId += marioJump;
        }
    } else {
        numOfMoves= numOfMoves - 1;
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        let width = prompt("Enter width of game: ", "e.g 10, 20, 30....");
        let height = prompt("Enter height of game: ", "e.g 10, 20, 30...");
        if (height == null || width == null || isNaN(width) === true || isNaN(height) === true) {
            width = 10;
            height = 10;
        }
        let matrixSize = height * width;
        marioJump = width;
        this.state = {
            matrixSize: matrixSize,
            width: width,
            height: height
        };
    }

    componentDidMount() {
        window.addEventListener("load", this.handleLoad(this.state.width, this.state.height));
    }

    handleLoad(width, height) {
        let matrix = document.getElementById("root");
        matrix.style.height = 40 * height + "px";
        matrix.style.width = 40 * width + "px";
        let shuffledData = shuffleArray(items);
        let truncatedData = shuffledData.slice(0, parseInt(this.state.matrixSize / 3, 10));

        for (let i = 0; i < truncatedData.length; i++) {
            let elemPosition = document.getElementById(truncatedData[i]);
            elemPosition.innerHTML = "<img src='mario-mashroom.png' alt='mario' class='maze-image'/>";
            elemPosition.classList.toggle("active");
        }

        let uniqueData = shuffledData.filter((obj) => {
            return truncatedData.indexOf(obj) === -1;
        });

        let item = uniqueData[Math.floor(Math.random() * uniqueData.length)];
        let marioPosition = document.getElementById(item);
        marioPosition.classList.toggle('mario');
        marioPosition.innerHTML = "<img src='mario-icon.png' alt='mario' class='maze-image' />";
        maxGreenSprites = document.getElementsByClassName('active').length;
    }

    onKeyPress(event) {
        if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
            if (numOfMoves === undefined) {
                numOfMoves = 0;
            }
            numOfMoves = numOfMoves + 1;
        }
        movement(event);
        checkFinish();
        ScoreCards();
    }

    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPress);
    }

    render() {
        return (
            <div className="App">
                <Welcome/>
                <Box matrix={this.state.matrixSize}/>
                <Score/>
            </div>
        );
    }
}

export default App;
