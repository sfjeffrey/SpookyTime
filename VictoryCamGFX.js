//To be placed on the victory camera.
#pragma strict
//The skeleon master object's skeletonDropper class
var master : skeletonDropper;
//The text displaying the game time
var timer : TextMesh;
//The text displaying the current round
var roundN : TextMesh;
//The text displaying the label for the timer
var clockLabel : TextMesh;
//true if the player died
var dead : boolean = false;
//true if the round was won
var won : boolean = true;
function Start () {
}

//continues on any key stroke
function Update () {
    if (Input.anyKey) {
        clickToContinue();
    }
}

//normalizes the round timer into hours:minutes:seconds
function displayTime(round:int,time:float) {
    won = true;
    var hour = (time - (time % 3600)) / 3600;
    time = time % 3600;
    var minute = (time - (time % 60)) / 60;
    var second = (time % 60);
    
    clockLabel.text = 'Time :';
    timer.text = padTime(hour) + ':' + padTime(minute) + ':' + padTime(Mathf.Floor(second));
    roundN.text = 'Round '+round.ToString()+' Complete!';

}

//Continues to the next stage after the victory/death camera
function clickToContinue() {
    //If the player won the next round is started
    if (won) {
        master.nextRound();
        won = false;
    }
    //If the player died then the menu screen is loaded.
    else if (dead) {
        Application.LoadLevel(0);
    }
}

//Normalizes the round timer and displays a special death message
function deathCam (round:int,time:float) {
    dead = true;
    Screen.lockCursor = false;
    var hour = (time - (time % 3600)) / 3600;
    time = time % 3600;
    var minute = (time - (time % 60)) / 60;
    var second = (time % 60);
    
    clockLabel.text = 'Lasted: ';
    timer.text = padTime(hour) + ':' + padTime(minute) + ':' + padTime(Mathf.Floor(second));
    roundN.text = 'Got too spooky on round '+round.ToString();

}
//returns single digit integers as strings with a 0 in the ten's place
function padTime (n:int){
    var time : String = n.ToString();
    if (time.Length < 2) {
        return '0'+time;
    }
    else {
        return time;
    }
}