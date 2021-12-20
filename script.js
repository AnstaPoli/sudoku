// -------------------First screen, User Validation -----------

function checkUserName() {
    let userName = getID('userName').value;
    let userPas = getID('userPassword').value;

    if (userName == 'abcd' && userPas == 1234) {
        getID('sheet1').classList.add('hidden');
        getID('sheet2').classList.remove('hidden');
        getID('sheet2').classList.add('sheet_1_2');
    }
    else if (userName == 'abcd' && userPas !== 1234) {
        getID('passwordError').innerHTML = 'Password Error';
    }
    else if (userName !== 'abcd' && userPas == 1234) {
        getID('nameError').innerHTML = 'Name Error';
    }
    else if (userName !== 'abcd' && userPas !== 1234) {
        getID('passwordError').innerHTML = 'Password Error';
        getID('nameError').innerHTML = 'Name Error';
    }
}
// --------Borads array: in each game random board is choosen
const boards = [[
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,

    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,

    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
], [
    3, 1, 6, 5, 7, 8, 4, 9, 2,
    5, 2, 9, 1, 3, 4, 7, 6, 8,
    4, 8, 7, 6, 2, 9, 5, 3, 1,

    2, 6, 3, 4, 1, 5, 9, 8, 7,
    9, 7, 4, 8, 6, 3, 1, 2, 5,
    8, 5, 1, 7, 9, 2, 6, 4, 3,

    1, 3, 8, 9, 4, 7, 2, 5, 6,
    6, 9, 2, 3, 5, 1, 8, 7, 4,
    7, 4, 5, 2, 8, 6, 3, 1, 9
], [
    8, 6, 3, 9, 2, 5, 7, 4, 1,
    4, 1, 2, 7, 8, 6, 3, 5, 9,
    7, 5, 9, 4, 1, 3, 2, 8, 6,

    9, 7, 1, 2, 6, 4, 8, 3, 5,
    3, 4, 6, 8, 5, 7, 9, 1, 2,
    2, 8, 5, 3, 9, 1, 4, 6, 7,

    1, 9, 8, 6, 3, 2, 5, 7, 4,
    5, 2, 4, 1, 7, 8, 6, 9, 3,
    6, 3, 7, 5, 4, 9, 1, 2, 8
]];

// ===Global Variables =======
let SelectedBoard = [];
let blankArray =[];
let boardArray =[];
var numOfBlanks = 0;
var numOfHints = 0;
let messageResult = null;
let userLevel=0;




// When user choose Diffculty level, random board is selected, blank array is created (GenerateBlankArray function) based on diff level,
// and board is created and populated.

function userSelectLevelAndStartGame(level){
    userLevel=level;
    startGame(userLevel);
}

function startGame(level) {
    diffBtn(level);
    SelectedBoard = boards[Math.floor(Math.random() * boards.length)];
    blankArray = generateBlankArray(numOfBlanks);
    boardArray = generateGameArray(SelectedBoard, blankArray);
    getID('sheet2').classList.add('hidden');
    getID('board').classList.remove('hidden');
    
    // looping all elements in button div to show them
    getID('finHintBtnContainer').classList.remove('hidden');
    var btnContainer = getID('finHintBtnContainer');
    var btnChildren = btnContainer.getElementsByTagName('*');
        for (let i=0; i<btnChildren.length;i++){
            btnChildren[i].classList.remove('hidden');
        }

    getID('numOfHints').innerHTML = `Hints remains : ${numOfHints}`
 
    createSudokuTiles();
    populateArrayInSudokuTiles(boardArray);


}
// ===========================
// ========Functions========== 
// ===========================

//helper function to quickly fetch element id
function getID(id) {
    return document.getElementById(id);
}

function diffBtn(diffLevel) {


    if (diffLevel == 1) {
        numOfBlanks = 20;
        numOfHints = 5;

    }
    else if (diffLevel == 2) {
        numOfBlanks = 40;
        numOfHints = 4;
    }
    else {
        numOfBlanks = 61;
        numOfHints = 3;
    }
}


// according to number of blanks as per diffculty level, a blank array is created to 
// instruct which position is going to be "hole to fill by the gamer" in  selected board.

function generateBlankArray(num) {
    let blanks = [];
    while (blanks.length < num) {
        let pos = Math.floor(Math.random() * 81);
        if (blanks.indexOf(pos) == -1) {
            blanks.push(pos);

        }
    } return blanks;
}

//Create the game array based on the ranbomlly chosen board array and the blanks array
function generateGameArray(board, blanks) {
    let gameBoard = [];
    for (let i = 0; i < board.length; i++) {

        if (blanks.indexOf([i] * 1) != -1) {  //without *1 the result reamin string, while the blank array is all numbers. so it allways show missmatch
            gameBoard[i] = '';

        }
        else { gameBoard[i] = board[i] }
    }
    return gameBoard;
}

function createSudokuTiles() {

    let div = getID("board");
    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("input");
        tile.type = "number";
        div.appendChild(tile);
        tile.disabled = false;
        tile.min = "1";
        tile.max = "9";
        tile.id = i;
        tile.classList.add("gameTiles");
    }
}

function populateArrayInSudokuTiles(arr){
    // placeing the non-blank Sudoku numbers in the newly created tile and block them from edit.
    for (let i=0; i<81; i++){
        if (arr[i] != '') {
            getID(i).value = arr[i];
            getID(i).disabled = true;
        }

        // adding bold line to divide board to 3*3 blocks. right border and bottom border class to be added to the proper tiles. 

        if ((i > 17 && i < 27) || (i > 44 && i < 54)) {
            getID(i).classList.add("bottomBorder");
        }

        if ((i + 1) % 9 == 3 || (i + 1) % 9 == 6) {
            getID(i).classList.add("rightBorder");
        }


    }
}



function hint() {
    if (numOfHints > 0) {
        for (let j = 0; j < 1; j++) {
            let i = Math.floor(Math.random() * 81);
            if (getID(i).value != '') {
                j--;
                continue;
            }
            else if (getID(i).value == '') {
                getID(i).value = SelectedBoard[i];
                getID(i).classList.add("hint");
                numOfHints--;
                getID('numOfHints').innerHTML = `Hints remains : ${numOfHints}`
                break;
            }
        }
    } else { alert('No more Hints for you!'); }
}

function finsihBtn() {
    compareResult(SelectedBoard);
 

}



function compareResult(board) {
    // collecting gamer's work  
    let boardResult = [];
    for (let i = 0; i < 81; i++) {
        boardResult[i] = getID(i).value;
    }

    let error = 0;

    let i = 0;
    while (i < 81) {

        if (board[i] != boardResult[i] * 1) {

            getID(i).classList.add('error');
            error++;
        }
        i++;
    }


    if (error > 0) {
        messageResult = 'Found an error. You Failed!';
    }
    else {
        messageResult = 'Good Job!';
    }

    setTimeout(() => {
        endGame()
    }, 3000);
}

function againBtn(){
    
    for (let i=0;i<81;i++){
        getID(i).value='';
    }
    diffBtn(userLevel);
    populateArrayInSudokuTiles(boardArray);

}


function endGame(){
    alert (messageResult);
    
    // looping all tiles in board div to hide them
    getID('board').classList.add('hidden');
    var boardContainer = getID('board');
    var tiles = boardContainer.getElementsByTagName('*');
        for (let i=0; i<tiles.length;i++){
            tiles[i].classList.add('hidden');
        }
    
    // looping all elements in button div to hide them
    getID('finHintBtnContainer').classList.add('hidden');
    var btnContainer = getID('finHintBtnContainer');
    var btnChildren = btnContainer.getElementsByTagName('*');
        for (let i=0; i<btnChildren.length;i++){
            btnChildren[i].classList.add('hidden');
        }

   
    getID('sheet2').classList.remove('hidden');

}
function MakiKaji(){
    for (let i= 0; i < 81; i++) {
     
        if (getID(i).value != '') {
            
            continue;
        }
        else if (getID(i).value == '') {
            getID(i).value = SelectedBoard[i];
            getID(i).classList.add("hint");
            
            
            
        }
    }
    finsihBtn();

}

