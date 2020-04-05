//////////// GLOBAL VARIABLES
var chrono; //chrono for stopwatch
var utility;
var playerManager;
var puzzleGameObj;
var gameWon;
var wrongMove;
////////////  CONSTRUCTORS
function Player(name, boardDimension, moves, duration, status) {
  this.name = name;
  this.boardDimension = boardDimension;
  this.numMoves = moves;
  this.duration = duration;
  this.theStatus = status;
}

function PlayerManager() {
  this.listPlayerArr = [];
  this.gameCounter = 0;
  this.gameDuration = 0;
  this.nberMove = 0;
  this.storeGameStats = storeGameStats;

  function storeGameStats(theStatus) {
    //instantiate player
    var name = document.getElementById("nameInput").value;
    var dim = document.getElementById("dimensionList").options[document.getElementById("dimensionList").selectedIndex].value;
    var moves = document.getElementById("displayMoves").value;
    var player = new Player(name, dim, this.nberMove, this.gameDuration, theStatus);
    //add player
    this.listPlayerArr.push(player);

    //reset stats
    this.gameCounter++;
    this.gameDuration = 0;
    this.nberMove = 0;
  }
}
/////////////// UTILITY FUNCTIONS
function Utility() {
  this.generateRandomNumber = generateRandomNumber;
  this.sampleEasyBoardTest = sampleEasyBoardTest;
  this.terminateGame = terminateGame;
  this.clearDisplay = clearDisplay;
  this.cancelPuzzlePlay = cancelPuzzlePlay;
  this.checkFormFilled = checkFormFilled;
  this.enableButton = enableButton;
  this.showChrono = showChrono;
  this.showStats = showStats;
  this.playAudio = playAudio;

 /*Generates a random integer between the minimum and maximum values */
  function generateRandomNumber(minValue, maxValue) {
    return (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
  }

/* plays an audio if you won the game and plays audio if you attempt an impossible move */
  function playAudio() {
    if (gameWon == true) {
      var audio = new Audio('sounds/Firework.mp3');
      audio.play();
      gameWon = false;
    }
    if (wrongMove == true) {
      var audio = new Audio('sounds/beep-07.mp3');
      audio.play();
      wrongMove = false;
    }
  }
  //used for testing (2 moves away from winning)
  function sampleEasyBoardTest() {
    var easyBoard = [];
    var arr1 = [new Tile(0, 0, 1), new Tile(0, 1, 2), new Tile(0, 2, 3)];
    var arr2 = [new Tile(1, 0, 4), new Tile(1, 1, 0), new Tile(1, 2, 6)];
    var arr3 = [new Tile(2, 0, 7), new Tile(2, 1, 5), new Tile(2, 2, 8)];
    easyBoard = [arr1, arr2, arr3];
    return easyBoard;
  }

/* calls mehods used whenever a game is stopped */
  function terminateGame(theStatus) {

    playerManager.storeGameStats(theStatus);
    clearDisplay();
    showStats();
  }

/*Clears all the values and whats displayed  */
  function clearDisplay() {
    clearInterval(chrono);
    chrono = undefined;
    document.getElementById('displayMoves').value = "";
    document.getElementById('displayHours').value = "";
    document.getElementById('displaySeconds').value = "";
    document.getElementById('displayMinutes').value = "";
  }
  /* steps to when a game is cancelled*/
  function cancelPuzzlePlay() {
    if (gameWon == true) {
      terminateGame("success");
    } else {
      terminateGame("cancelled");
    }
    enableButton("redButton", true);
    enableButton("greenButton", false);
  }

  /* make sure the user has a name and dimension size checked */
  function checkFormFilled() {
    var dimSize = document.getElementById('dimensionList');
    // also check for chrono to make sure a user doesnt change their name midway and enable the play game button
    if (document.getElementById("nameInput").value == "" || dimSize.options[dimSize.selectedIndex].value == 0 || chrono != undefined) {
      enableButton("greenButton", true);
    } else {
      enableButton("greenButton", false);
    }
  }
  /* enables or disables a button, also used for labels and select  */
  function enableButton(btnId, theStatus) {
    document.getElementById(btnId).disabled = theStatus;
  }

/*Creates the chrono and siaplys the time  */
  function showChrono() {
    //document.getElementById("displayMoves").value = 0;
    var sec = document.getElementById("displaySeconds");
    var min = document.getElementById("displayMinutes");
    var hrs = document.getElementById("displayHours");
    sec.value = 0;
    min.value = 0;
    hrs.value = 0;
    chrono = setInterval(function() {
      playerManager.gameDuration++;
      sec.value++;
      if (sec.value == 60) {
        min.value++;
        sec.value = 0;
        if (min.value == 60) {
          hrs.value++;
          min.value = 0;
        }
      }
    }, 1000);
  }
/* Dynamically create a table to show the players and their stats */
  function showStats() {
    var tableBegin = "<table>";
    var heading = "<th>#</th><th>Name</th><th>Dimension</th><th>Moves</th><th>Duration</th><th>Status</th>";
    var content = "";
    for (var i = 1; i < playerManager.listPlayerArr.length + 1; i++) { //
      content = content + "<tr>" +
        "<td>" + i + "</td>" +
        "<td>" + playerManager.listPlayerArr[i - 1].name + "</td>" +
        "<td>" + playerManager.listPlayerArr[i - 1].boardDimension + "</td>" +
        "<td>" + playerManager.listPlayerArr[i - 1].numMoves + "</td>" +
        "<td>" + playerManager.listPlayerArr[i - 1].duration + "</td>" +
        "<td>" + playerManager.listPlayerArr[i - 1].theStatus + "</td>" +
        "</tr>";
    }

    var tableEnd = "</table>";
    document.getElementById("leaderboardsTable").innerHTML = tableBegin + heading + content + tableEnd;
  }
}


function playGame() {
  document.getElementById('displayMoves').value = 0;
  utility.enableButton("redButton", false);
  utility.enableButton("greenButton", true);
  utility.enableButton("nameInput", true); //player cant change name or selectedIndex during game
  utility.enableButton("dimensionList", true);
  puzzleGameObj = new PuzzleGame();
  drawPuzzleBoard();
  document.querySelector('.puzzleBoard').style.display = 'block'; //display board again when game is restarted
  setupTileClickEvent();
  utility.showChrono();
}

function cancelGame() {
  utility.cancelPuzzlePlay("cancelled");
  utility.enableButton("nameInput", false); //player can change the name or input during game
  utility.enableButton("dimensionList", false);
  document.querySelector('.puzzleBoard').style.display = 'none'; //stop displaying board when game done
  puzzleGameObj = new PuzzleGame();
}


//GAME LOGIC
//5.3 Tile
function Tile(row, col, indexNumber) {
  this.row = row;
  this.col = col;
  //emptyTile(for 0) or filledType(for the rest)
  this.tileType = checkTileType(indexNumber);
  //if 3x3 board (0-8)
  this.indexNumber = indexNumber;
}

function checkTileType(num) {
  var result;
  if (num == 0) {
    result = "emptyTile";
  } else {
    result = "filledType";
  }
  return result;
}

//5.4 PuzzleGame
function PuzzleGame() {
  //calls its function members to set the fields
  this.puzzleWidth = document.getElementById('dimensionList').value;
  this.puzzleBoard = createBoardStructure();
  //this.puzzleBoard = utility.sampleEasyBoardTest();
  this.goalState = createGoalState();
}

//5.4 PuzzleGame member
function createGoalState() {
  var puzzleWidth = document.getElementById('dimensionList').value;
  var resultPuzzleBoard = [];
  if (puzzleWidth == 3) {
    resultPuzzleBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ];
  } else if (puzzleWidth == 4) {
    resultPuzzleBoard = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ];
  } else {
    resultPuzzleBoard = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 0]
    ];
  }
  return resultPuzzleBoard;
}

//5.4 PuzzleGame member
function createBoardStructure() {
  var puzzleWidth = document.getElementById('dimensionList').value;
  var puzzleArr = [];
  //TODO
  var indexes;
  if (puzzleWidth == 3) {
    indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  } else if (puzzleWidth == 4) {
    indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  } else {
    indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  }

  for (var i = 0; i < puzzleWidth; i++) {
    puzzleArr[i] = [];
    for (var j = 0; j < puzzleWidth; j++) {
      //the number from indexes that will be placed in the array
      var positionRemove = utility.generateRandomNumber(0, indexes.length - 1);
      //remove the value at that index and store it into the variable
      var removedValue = indexes.splice(positionRemove, 1);
      //creating the Tile object and placing it
      puzzleArr[i][j] = new Tile(i, j, removedValue[0]);
    }
  }
  return puzzleArr;
}

function drawPuzzleBoard() {
  //remove the current board and create a new one with a new puzzleBoard layout if it doesn't exist
  console.log("hi");
  var currentBoard = document.querySelector('.puzzleBoard');
  if (currentBoard != null) {
    currentBoard.remove();
  }

  var puzzleBoardDiv = document.createElement('div');
  puzzleBoardDiv.className = "puzzleBoard";

  var htmlTable = "<table id='puzzleTable'>";
  var htmlRows = "";

  for (var i = 0; i < puzzleGameObj.puzzleWidth; i++) {
    htmlRows += "<tr>";
    for (var j = 0; j < puzzleGameObj.puzzleWidth; j++) {
      //appending all the array elements
      if (puzzleGameObj.puzzleBoard[i][j].indexNumber == 0) {
        htmlRows += "<td class='emptyTile'></td>";
      } else {
        htmlRows += "<td class='filledType'>" + puzzleGameObj.puzzleBoard[i][j].indexNumber + "</button>" + "</td>";
      }
    }
    htmlRows += "</tr>";
  }
  puzzleBoardDiv.innerHTML = htmlTable + htmlRows + "</table>";
  //appending the puzzleBoard div to the checkBoardId div
  document.getElementById('checkBoardId').appendChild(puzzleBoardDiv);
}
//helper that takes as input the value that is on the table
//works,tested in console
function findTile(indexNumber) {
  var coordinate = [];
  for (var i = 0; i < puzzleGameObj.puzzleBoard.length; i++) {
    for (var j = 0; j < puzzleGameObj.puzzleBoard[i].length; j++) {
      if (puzzleGameObj.puzzleBoard[i][j].indexNumber == indexNumber) {
        coordinate = [i, j];
        return coordinate;
      }
    }
  }
}
//first contains the position of the current, second param contains position of the place to move to.
function swap2Tiles(indexTile1, indexTile2) {
  var tileCurrent = puzzleGameObj.puzzleBoard[indexTile1[0]][indexTile1[1]];
  var neighbour = puzzleGameObj.puzzleBoard[indexTile2[0]][indexTile2[1]];

  var tempIndexNumber = puzzleGameObj.puzzleBoard[indexTile1[0]][indexTile1[1]].indexNumber;

  puzzleGameObj.puzzleBoard[indexTile1[0]][indexTile1[1]].indexNumber = neighbour.indexNumber;
  puzzleGameObj.puzzleBoard[indexTile1[0]][indexTile1[1]].tileType = 'emptyTile';

  puzzleGameObj.puzzleBoard[indexTile2[0]][indexTile2[1]].indexNumber = tempIndexNumber;
  puzzleGameObj.puzzleBoard[indexTile2[0]][indexTile2[1]].tileType = 'filledType';
}
//works, tested in console
function match2States(state1, state2) {
  for (var i = 0; i < state1.length; i++) {
    for (var j = 0; j < state1[i].length; j++) {
      if (state1[i][j].indexNumber != state2[i][j]) {
        return false;
      }
    }
  }
  return true;
}
//returns indexNumber properties of the tiles surounding the tile at "position" ex:[0,2]
function getNeighboursIndicesArr(position) {
  var returnValues = [];

  var north = [position[0] - 1, position[1]];
  if (north[0] < 0 || north[1] < 0 || north[0] >= puzzleGameObj.puzzleWidth || north[1] >= puzzleGameObj.puzzleWidth) {
    returnValues[0] = -1;
  } else {
    returnValues[0] = puzzleGameObj.puzzleBoard[north[0]][north[1]].indexNumber;
  }
  var east = [position[0], position[1] + 1];
  if (east[0] < 0 || east[1] < 0 || east[0] >= puzzleGameObj.puzzleWidth || east[1] >= puzzleGameObj.puzzleWidth) {
    returnValues[1] = -1;
  } else {
    returnValues[1] = puzzleGameObj.puzzleBoard[east[0]][east[1]].indexNumber;
  }
  var south = [position[0] + 1, position[1]];
  if (south[0] < 0 || south[1] < 0 || south[0] >= puzzleGameObj.puzzleWidth || south[1] >= puzzleGameObj.puzzleWidth) {
    returnValues[2] = -1;
  } else {
    returnValues[2] = puzzleGameObj.puzzleBoard[south[0]][south[1]].indexNumber;
  }
  var west = [position[0], position[1] - 1];
  if (west[0] < 0 || west[1] < 0 || west[0] >= puzzleGameObj.puzzleWidth || west[1] >= puzzleGameObj.puzzleWidth) {
    returnValues[3] = -1;
  } else {
    returnValues[3] = puzzleGameObj.puzzleBoard[west[0]][west[1]].indexNumber;
  }
  return returnValues;

}

function processClickTile(indexValue) {
  //finds position of tile
  var current = findTile(indexValue);
  //calls getNeighboursIndicesArr so we know the indexNumbers of the getNeighbours
  var neighbours = getNeighboursIndicesArr(current);

  //the neighbour that has the 0 value
  var indexMoveTo;
  for (var i = 0; i < neighbours.length; i++) {
    if (neighbours[i] == 0) {
      indexMoveTo = neighbours[i];
    }
  }

  if (indexMoveTo != null) {
    var a = document.getElementById('displayMoves');
    playerManager.nberMove++;
    a.value=playerManager.nberMove;

    var moveTo = findTile(indexMoveTo);
    swap2Tiles(current, moveTo);
    //redraw updated board
    drawPuzzleBoard();
    setupTileClickEvent();
    if (match2States(puzzleGameObj.puzzleBoard, puzzleGameObj.goalState) == true) {
      gameWon = true;
      cancelGame();
      utility.playAudio();
      puzzleGameObj = new PuzzleGame();
    }
  } else {
    wrongMove = true;
    utility.playAudio();
  }
}

function callProcessClickTile(e) {
  processClickTile(e.target.innerHTML);
}
//making it so all the table buttons are clickable and call the processClickTile method to move tiles
function setupTileClickEvent() {
  var tableChildren = document.querySelectorAll('.filledType');
  for (var i = 0; i < tableChildren.length; i++) {
    tableChildren[i].addEventListener('click', callProcessClickTile);
  }
}

function init() {
  gameWon = false;
  wrongMove = false;
  utility = new Utility();
  playerManager = new PlayerManager();
  puzzleGameObj = new PuzzleGame();
  document.getElementById("nameInput").addEventListener("input", utility.checkFormFilled);
  document.getElementById("dimensionList").addEventListener("input", utility.checkFormFilled);

  document.getElementById("greenButton").addEventListener("click", playGame);
  document.getElementById("redButton").addEventListener("click", cancelGame);
}

document.addEventListener('DOMContentLoaded', init);
