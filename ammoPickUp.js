//To be placed on the Ammo Pick Up gameObjects
#pragma strict

//The amount of ammo the pick up provides
var amount : int = 8;
//Seconds after item is picked up before it reappears
var respawnTimer : int = 60;
//The sound to be played when picked up
var sound : AudioSource;
//The time remaining before respawning
var countDown : float = 0;
//Whether or not the item is available to be picked up
var on : boolean = true;


function Update () {
	//Counts down the countDown variable as long as the item is not on. When it reaches 0 it runs the
	//turnOn function
	if (!on) {
		countDown -= Time.deltaTime;
		if (countDown <= 0) {
			turnOn();
		}
	}
}

//The turn on function re-enables the pickup's graphics and collider, as well as sets the on variable to true
function turnOn() {
	transform.GetChild(0).active = true;
	GetComponent(SphereCollider).enabled = true;
	on = true;
}

//The turnOff function disables the item's graphics and collider and sets the respawnTimer to the respawn time.
function turnOff () {
	on = false;
	countDown = respawnTimer;
	transform.GetChild(0).active = false;
	GetComponent(SphereCollider).enabled = false;

}

//The onTriggerEnter function activates the turnOff function if the player collides with the item
//while it is on, and also adds ammo to the player's inventory equal to the amount variable
function OnTriggerEnter (collided : Collider) {
	if (collided.gameObject.name == 'player' && on == true) {
		sound.Play();
		collided.gameObject.GetComponentInChildren(GunBehavior).ammo += amount;
		turnOff();
	}
}