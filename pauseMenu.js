//To be applied to the menu camera object

#pragma strict
//currently paused
var paused : boolean = false;
//the player object
var player : GameObject;
//the camera and text objects
var menuCamera : GameObject;
var victoryText : GameObject;
var pausedText : GameObject;

//Runs the pause function when ESC is pressed
function Update () {
	if (Input.GetKeyUp(KeyCode.Escape)){
		pause();
	}
}

function pause() {
	//If currently paused, the function unpauses the game
	if (paused) {
		Screen.lockCursor = true;
		paused = false;
		Time.timeScale = 1.0;
		player.GetComponent(playerStats).unfrozen(true);
		AudioListener.pause = false;
		menuCamera.active = false;
		victoryText.active = true;
		pausedText.active = false;
	}
	//Otherwise it pauses the game
	else {
		Screen.lockCursor = false;
		paused = true;
		Time.timeScale = 0.0;
		player.GetComponent(playerStats).unfrozen(false);
		AudioListener.pause = true;
		menuCamera.active = true;
		victoryText.active = false;
		pausedText.active = true;
	}

}

function pauseMenu() {
	transform.gameObject.active = true;
	
}