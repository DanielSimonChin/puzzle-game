var listPlayerArr = []; //list of all players
var moveCount; // amount of moves it took the player at end of game
var gameWon; //if the currentplayer has won the game
var puzzleGameObj;
//constructor
function Player(moves, status) {
  var name = document.getElementById("nameInput");
  var boardDimension = document.getElementById('dimensionList').options[document.getElementById("dimensionList").selectedIndex].value;
  var numMoves = moves;
  var duration = document.getElementById('displaySeconds');
  var theStatus = status;
}

function playGame() {
  document.getElementById("redButton").disabled = false;
  createPuzzle();
  chronoStart();
}

function cancelGame() {
  document.getElementById("redButton").disabled = true;
  var player = new Player(moveCount, "cancelled")
}

function wonGame() {

}

/*function createPuzzle() {

  var tableBegin = '<table border="thick">'

  var content;
  var dropDownMenu = document.getElementById("dimensionList");
  if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 3) {
    for (var i = 0; i < 3; i++) {
      content = content + "<tr>" + "<td>" + i + 1 + "</td>" +
        "<td>" + i + 2 + "</td>" +
        "<td>" + i + 3 + "</td>" + "</tr>";

    }
  } else if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 4) {
    for (var i = 0; i < 4; i++) {
      content = content + "<tr>" + "<td>" + i + 1 + "</td>" +
        "<td>" + i + 2 + "</td>" +
        "<td>" + i + 3 + "</td>" + "</tr>";

    }
  } else if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 5) {
    for (var i = 0; i < 5; i++) {
      content = content + "<tr>" + "<td>" + i + 1 + "</td>" +
        "<td>" + i + 2 + "</td>" +
        "<td>" + i + 3 + "</td>" + "</tr>";

    }
  }
  var tableEnding = "</table>"
  document.getElementbyId('gameTable').innerHtml = tableBegin + tr_heading + content + tableEnding;
}*/

///////////////////// all Helper methods

function generateRandomNumber(minValue, maxValue) {
  //taken from w3schools at https://www.w3schools.com/js/js_random.asp
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function playAudio() { //not completed
  if (gameWon == true) {
    var audio = new Audio('sounds/Firework.mp3');
    audio.play();
  } else if (gameWon == false) {
    var audio = new Audio('sounds/beep-07.mp3');
    audio.play();
  }
}

function sampleEasyBoardTest() {
  //TODO
}

function terminateGame(theStatus) {
  //TODO
  clearInterval(); //TODO
  setGameInfo_Stats(theStatus);
  document.getElementById("nameInput").value = "";
  moveCount = 0;
  document.getElementById('dimensionList').options[document.getElementById('dimensionList').selectedIndex].value = 3;
  document.getElementById('displayMoves').value = 0;
  document.getElementById('displayHours').value = 0;
  document.getElementById('displaySeconds').value = 0;
  document.getElementById('displayMinutes').value = 0;
}

function cancelPuzzlePlay() {
  terminateGameInfo("cancelled");
  document.getElementById("redButton").disabled = true;
}

function checkFormFilled() {
  if (document.getElementById("nameInput").value == "") {
    document.getElementById("greenButton").disabled = true;
  } else {
    document.getElementById("greenButton").disabled = false;
  }
}

function enableButton(btnId, theStatus, btnClass) {

}

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
      var positionRemove = generateRandomNumber(0, indexes.length - 1);
      //remove the value at that index and store it into the variable
      var removedValue = indexes.splice(positionRemove, 1);
      //creating the Tile object and placing it
      puzzleArr[i][j] = new Tile(i, j, removedValue[0]);
    }
  }
  return puzzleArr;
}

function drawPuzzleBoard() {
  var puzzleBoardDiv = document.createElement('div');
  puzzleBoardDiv.class = "puzzleBoard";

  var htmlTable = "<table>";
  var htmlRows = "";

  for (var i = 0; i < puzzleGameObj.puzzleWidth; i++) {
    htmlRows += "<tr>";
    for (var j = 0; j < puzzleGameObj.puzzleWidth; j++) {
      //appending all the array elements
      htmlRows += "<td>" + "<button>" + puzzleGameObj.puzzleBoard[i][j].indexNumber + "</button>" + "</td>";
    }
    htmlRows += "</tr>";
  }
  puzzleBoardDiv.innerHTML = htmlTable + htmlRows + "</table>";
  //appending the puzzleBoard div to the checkBoardId div
  document.getElementById('checkBoardId').appendChild(puzzleBoardDiv);
}
//helper that takes as input the value that is on the table
//works,tested in console
function findTile(indexNumber)
{
  var coordinate = [];
  for(var i = 0 ; i < puzzleGameObj.puzzleBoard.length;i++)
  {
    for(var j = 0 ; j < puzzleGameObj.puzzleBoard[i].length;j++)
    {
      if(puzzleGameObj.puzzleBoard[i][j].indexNumber == indexNumber)
      {
        coordinate = [i,j];
        return coordinate;
      }
    }
  }
}

function swap2Tiles(indexTile1,indexTile2)
{

}
//works, tested in console
function match2States(state1,state2)
{
  for(var i = 0; i < state1.length; i++)
  {
    for(var j = 0 ; j < state1[i].length; j++)
    {
      if(state1[i][j] != state2[i][j])
      {
        return false;
      }
    }
  }
  return true;
}
//returns indexNumber properties of the tiles surounding the tile at "position" ex:[0,2]
function getNeighboursIndicesArr(position)
{
  var returnValues = [];

  var north = [position[0]-1,position[1]];
  if(north[0] < 0 || north[1] < 0 || north[0] >= puzzleGameObj.puzzleWidth || north[1] >= puzzleGameObj.puzzleWidth)
  {
    returnValues[0] = -1;
  }
  else
  {
    returnValues[0] = puzzleGameObj[north[0]][north[1]].indexNumber;
  }
  var east = [position[0],position[1]+1];
  if(east[0] < 0 || east[1] < 0 || east[0] >= puzzleGameObj.puzzleWidth || east[1] >= puzzleGameObj.puzzleWidth)
  {
    returnValues[1] = -1;
  }
  else
  {
    returnValues[1] = puzzleGameObj[east[0]][east[1]].indexNumber;
  }
  var south = [position[0]+1,position[1]];
  if(south[0] < 0 || south[1] < 0 || south[0] >= puzzleGameObj.puzzleWidth || south[1] >= puzzleGameObj.puzzleWidth)
  {
    returnValues[2] = -1;
  }
  else
  {
    returnValues[2] = puzzleGameObj[south[0]][south[1]].indexNumber;
  }
  var west = [position[0],position[1]-1];
  if(west[0] < 0 || west[1] < 0 || west[0] >= puzzleGameObj.puzzleWidth || west[1] >= puzzleGameObj.puzzleWidth)
  {
    returnValues[3] = -1;
  }
  else
  {
    returnValues[3] = puzzleGameObj[west[0]][west[1]].indexNumber;
  }
  return returnValues;
}
function processClickTile(indexValue)
{
  //finds position of tile
  var position = findTile(indexValue);


}



function process() {
  //document.getElementById("nameInput").addEventListener("input", checkFormFilled);
  //document.getElementById("greenButton").addEventListener("click", playGame);
  //document.getElementById("redButton").addEventListener("click", cancelGame);
  puzzleGameObj = new PuzzleGame();
  drawPuzzleBoard();

}

document.addEventListener('DOMContentLoaded', process);
