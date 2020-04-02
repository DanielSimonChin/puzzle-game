var listPlayerArr = [];

function Player(username,boardDimension,numMoves,duration)
{
    this.Name = username;
    this.BoardSize = boardDimension;
    this.numMoves = numMoves;
    this.duration = duration;
}