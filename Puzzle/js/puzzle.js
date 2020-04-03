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

function nameEntered() {
  if (document.getElementById("nameInput").value == "") {
    document.getElementById("greenButton").disabled = true;
  } else {
    document.getElementById("greenButton").disabled = false;
  }

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

function generateRandomNumber(minValue, maxValue){
  Math.floor(Math.random() * (maxValue-minValue)) + minValue;
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
  clearInterval();
  setGameInfo_Stats();
}
function process() {
  document.getElementById("nameInput").addEventListener("input", nameEntered);
  document.getElementById("greenButton").addEventListener("click", playGame);
  document.getElementById("redButton").addEventListener("click", cancelGame);
}

document.addEventListener('DOMContentLoaded', process);
