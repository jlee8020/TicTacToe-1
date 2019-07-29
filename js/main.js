/*------Constants------*/
const audioStart = new Audio('audio/MELODY_2.mp3');
const audioX = new Audio('audio/X.mp3');
const audioO = new Audio('audio/O.mp3');
const audioWin = new Audio('audio/YOU_WIN.mp3');



/*------Variables (state)------*/

let board, turn, winner;
let turnCount = 1;
let isWinner = false;




// This was commented out in order to provide functionality for the color picker.
// SQUARE_STATE = {
//     'null': 'white',
//     '1': 'red',       // 1 is X
//     '-1': 'blue',     // -1 is O
// };




/*------Cached Element References------*/

let gameStatus = document.getElementById('message');




/*------Event Listeners------*/

document.querySelector('section.board').addEventListener('click', onClick);



/*------Functions------*/

init();



function setTextColor(picker) {
    document.getElementsByTagName('p')[0].style.color = '#' + picker.toString()
}

function init() {
    audioStart.play();
    board = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
    turn = 1;
    winner = null;
    gameStatus.textContent = "It is X's turn";
    
    // render();
}


function onClick(evt){
        let squareIdx = parseInt(evt.target.id.replace('sq',''));
    if (board[squareIdx] !== 'null') return;
    getWinner();
    render(squareIdx);

}


function getWinner(){
    let winner = null;
    if (board[0]+board[1]+board[2] === 3 ||  board[3]+board[4]+board[5] === 3 ||  board[6]+board[7]+board[8] === 3 ||  
        board[0]+board[3]+board[6] === 3 ||  board[1]+board[4]+board[7] === 3 ||  board[2]+board[5]+board[8] === 3 ||  
        board[0]+board[4]+board[8] === 3 ||  board[2]+board[4]+board[6] === 3){
        gameStatus.textContent = "X wins the game";
        setTimeout(function(){audioWin.play();},1000);
        document.getElementById("board").className += " hvr-buzz-out";
        confetti.start(1500);
        isWinner = true;
    } 
    
    if (board[0]+board[1]+board[2] === -3 ||  board[3]+board[4]+board[5] === -3 ||  board[6]+board[7]+board[8] === -3 ||  
        board[0]+board[3]+board[6] === -3 ||  board[1]+board[4]+board[7] === -3 ||  board[2]+board[5]+board[8] === -3 ||  
        board[0]+board[4]+board[8] === -3 ||  board[2]+board[4]+board[6] === -3){
        gameStatus.textContent = "O wins the game";
        setTimeout(function(){audioWin.play();},1000);
        document.getElementById("board").className += " hvr-buzz-out";
        confetti.start(1500);
        isWinner = true;
    }
    
    if (turnCount === 10){
        gameStatus.textContent = "This game is a draw";
        document.getElementById("board").className += " hvr-buzz-out";
        isWinner = true;
    }
    
    
}



function render(squareIdx){
    if (isWinner === false) {
        setLetter = document.getElementById(`sq${squareIdx}`);
        // document.getElementById(`sq${squareIdx}`).style.backgroundColor = SQUARE_STATE[turn]; // removed to enable the color picker functionality
        board[squareIdx] = turn;
        if (turn === 1) {
            setLetter.textContent = "X";
            audioX.play();
            document.getElementById(`sq${squareIdx}`).style.backgroundColor = document.getElementById("colorA").style.backgroundColor;
            gameStatus.textContent = "It is O's turn"
        }   else {
            setLetter.textContent = "O";
            audioO.play();
            document.getElementById(`sq${squareIdx}`).style.backgroundColor = document.getElementById("colorB").style.backgroundColor;
            gameStatus.textContent = "It is X's turn"
    }
    turn *= -1;
    turnCount++;
    getWinner();
}
}