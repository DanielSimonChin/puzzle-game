var listPlayerArr = []; //list of all players
var moveCount; // amount of moves it took the player at end of game
var gameWon; //if the currentplayer has won the game
//constructor
function Player(moves, status)
{
  var name= document.getElementById("nameInput");
  var boardDimension = document.getElementById('dimensionList').options[document.getElementById("dimensionList").selectedIndex].value;
  var numMoves= moves;
  var duration = document.getElementById('displaySeconds');
  var theStatus= status;
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

function wonGame()
{

}
/*
function createPuzzle() {

  var tableBegin = '<table border="thick">''
  var content;
  var dropDownMenu = document.getElementById("dimensionList");
  if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 3) {
    for (var i = 0; i < 3; i++) {
      content = content + "<tr>" + "<td>" + i+1+ "</td>" +
      "<td>" + i+2 +  "</td>" +
      "<td>" + i+3 +  "</td>" + "</tr>";

    }
  } else if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 4) {
    for (var i = 0; i < 4; i++) {
      content = content + "<tr>" + "<td>" +i+1+ "</td>" +
      "<td>" + i+2 +  "</td>" +
      "<td>" + i+3 +  "</td>" + "</tr>";

    }
  } else if (dropDownMenu.options[dropDownMenu.selectedIndex].value == 5) {
    for (var i = 0; i < 5; i++) {
      content = content + "<tr>" + "<td>" +i+1+ "</td>" +
      "<td>" + i+2 +  "</td>" +
      "<td>" + i+3 +  "</td>" + "</tr>";

    }
  }
    var tableEnding = "</table>"
    document.getElementbyId('gameTable').innerHtml = tableBegin + tr_heading + content + tableEnding;
} */

///////////////////// all Helper methods

function generateRandomNumber(minValue, maxValue)
{
  //taken from w3schools at https://www.w3schools.com/js/js_random.asp
  return Math.floor(Math.random() * (maxValue - minValue + 1) ) + minValue;
}

function playAudio(){ //not completed
  if (gameWon ==true){
    var audio = new Audio('sounds/Firework.mp3');
    audio.play();
  }
  else if (gameWon==false) {
    var audio = new Audio('sounds/beep-07.mp3');
    audio.play();
  }
}

function sampleEasyBoardTest(){
  //TODO
}

function terminateGame(theStatus)
{
  //TODO
  clearInterval(); //TODO
  setGameInfo_Stats(theStatus);
  document.getElementById("nameInput").value="";
  moveCount=0;
  document.getElementById('dimensionList').options[document.getElementById('dimensionList').selectedIndex].value=3;
  document.getElementById('displayMoves').value=0;
  document.getElementById('displayHours').value=0;
  document.getElementById('displaySeconds').value=0;
  document.getElementById('displayMinutes').value=0;
}

function cancelPuzzlePlay(){
  terminateGameInfo("cancelled");
  document.getElementById("redButton").disabled=true;
}

function checkFormFilled()
{
  if (document.getElementById("nameInput").value == "") {
    document.getElementById("greenButton").disabled = true;
  } else {
    document.getElementById("greenButton").disabled = false;
  }
}

function enableButton(btnId, theStatus, btnClass)
{

}

//5.3 Tile
function Tile(row,col,indexNumber)
{
  this.row = row;
  this.col = col;
  //emptyTile(for 0) or filledType(for the rest)
  this.tileType = checkTileType(indexNumber);
  //if 3x3 board (0-8)
  this.indexNumber = indexNumber;
}

function checkTileType(num)
{
  var result;
  if(num == 0)
  {
    result = "emptyTile";
  }
  else
  {
    result = "filledType";
  }
  return result;
}

//5.4 PuzzleGame
function PuzzleGame()
{
  //calls its function members to set the fields
  this.puzzleWidth = document.getElementById('dimensionList').value;
  this.puzzleBoard = [];
  this.goalState = createGoalState();
}
//5.4 PuzzleGame member
function createGoalState()
{
  var puzzleWidth = document.getElementById('dimensionList').value;
  var resultPuzzleBoard = [];
  if (puzzleWidth == 3)
  {
    resultPuzzleBoard = [[1,2,3],[4,5,6],[7,8,0]];
  }
  else if (puzzleWidth == 4)
  {
    resultPuzzleBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
  }
  else
  {
    resultPuzzleBoard = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,0]];
  }
  return resultPuzzleBoard;
}

//5.4 PuzzleGame member
function createBoardStructure()
{
  var puzzleWidth = document.getElementById('dimensionList').value;
  var puzzleArr = [];
  //TODO
  var indexes;
  if (puzzleWidth == 3)
  {
    indexes = [0,1,2,3,4,5,6,7,8];
  }
  else if (puzzleWidth == 4)
  {
    indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  }
  else
  {
    indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  }

  for(var i = 0; i < puzzleWidth; i++)
  {
    puzzleArr[i] = [];
    for(var j = 0 ; j < puzzleWidth;j++)
    {
      //the number from indexes that will be placed in the array
      var positionRemove = generateRandomNumber(0,indexes.length-1);
      //remove the value at that index and store it into the variable
      var removedValue = indexes.splice(positionRemove,1);
      //creating the Tile object and placing it
      puzzleArr[i][j] = new Tile(i,j,removedValue);
    }
  }
  return puzzleArr;
}

function process() {
  document.getElementById("nameInput").addEventListener("input", checkFormFilled);
  document.getElementById("greenButton").addEventListener("click", playGame);
  document.getElementById("redButton").addEventListener("click", cancelGame);
}

document.addEventListener('DOMContentLoaded', process);
