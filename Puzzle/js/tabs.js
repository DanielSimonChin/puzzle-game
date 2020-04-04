function changeTofields() {
  document.getElementById("allFields").style.display = "block";
  document.getElementById("leaderboards").style.display = "none";
  document.getElementById("playerInfoBtn").style.background = "#008CBA";
  document.getElementById("gameStatsBtn").style.background = "#e7e7e7";
}

function changeToLeaderboards() {
  document.getElementById("leaderboards").style.display = "block";
  document.getElementById("allFields").style.display = "none";
  document.getElementById("gameStatsBtn").style.background = "#008CBA";
  document.getElementById("playerInfoBtn").style.background = "#e7e7e7";

}

function process() {
  document.getElementById("playerInfoBtn").addEventListener("click", changeTofields);
  document.getElementById("gameStatsBtn").addEventListener("click", changeToLeaderboards);

}

document.addEventListener('DOMContentLoaded', process);
