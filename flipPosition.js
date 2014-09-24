//To be applied to the parent camera object

#pragma strict

//Flips the camera's x-axis position when the right mouse button is clicked to align it to
//a left or right handed view
function Update () {
    if (Input.GetKeyUp(KeyCode.Mouse1)) {
        transform.localPosition.x = -transform.localPosition.x;
    }    
}