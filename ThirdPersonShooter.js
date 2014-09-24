//To be placed on the player object. Handles movement and third person shoot aiming

//The aiming camera
var cameraTransform : Transform;

//The speed the player walks
var walkSpeed : float;
//the speed the player runs
var runSpeed : float;
//The current speed multiplier
var speedMultiplier : float = 1;

//The crosshair object
var crossHair : GameObject;
//The gun object's gunbehavior class
var gunControl : GunBehavior;
//the animations object
var animations : Animator;
var yAxisTransform : Transform;
function Start () {
    var control : CharacterController = GetComponent(CharacterController);
}

function Update () {

    //Sorts the inputs into a single Vecotr3 object.
    var h = Input.GetAxisRaw("Horizontal");
    var v = Input.GetAxisRaw("Vertical");
    var movement : Vector3 = transform.TransformDirection(Vector3(h,0,v));
    
    //If the player is holding shift they move at their run speed and the gun cannot be fired.
    if ( (Input.GetKey (KeyCode.LeftShift) || Input.GetKey (KeyCode.RightShift)) && v > 0) {
        gunControl.enabled = false;
        crossHair.active = false;
        control.SimpleMove(movement*runSpeed*speedMultiplier);
    }
    //If shift is not being held the player moves at the walking speed and can
    //still fire their gun
    else {
        gunControl.enabled = true;
        crossHair.active = true;
        control.SimpleMove(movement*walkSpeed*speedMultiplier);
    }
    playAnimations(h,v,(Input.GetKey (KeyCode.LeftShift) || Input.GetKey (KeyCode.RightShift)));
}

//Plays the appropriate running/walking/straffing animations depending on which direction the player
//is moving
function playAnimations(h,v,shift) {
    if (shift && v > 0) {
        animations.Play('scottSprint');
    }
    else if (v != 0) {
        if (v > 0) {
            animations.Play('scottWalkF');
        }
        else if (v < 0) {
            animations.Play('scottWalkB');
        }
        
    }
    else if (h != 0) {
        if (h > 0) {
            animations.Play('scottStrafeR');
        }
        else if (h < 0) {
            animations.Play('scottStrafeL');
        }
        
    }
    
    else {
        animations.speed = 1;
        animations.Play('scottIdle');
    }
}