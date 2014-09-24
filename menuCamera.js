//To be placed on the parent object for the menu/victory/death/new round camera

#pragma strict
//The rotation speed
var speed : float;
//The player character
var target : Transform;


//Rotate's the object around the y-axis and follows the player's position
function Update () {
    transform.Rotate(Vector3(0,speed,0)*Time.deltaTime);
    transform.position = target.position;
    

}


