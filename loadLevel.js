//To be placed on any menu button the loads a level

#pragma strict
//The name of the level to be loaded
var level : String;

//Loads the level on a mouse click
function OnMouseUp() {
	Debug.Log(level);
	Application.LoadLevel(level);

}