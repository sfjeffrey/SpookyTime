//To be applied to the skeleton enemies
#pragma strict
//The starting HP of all the skeletons
var health : int = 5;
//The object used as the skeleton's physics driven corpse
var corpseObject : GameObject;


function Update () {
	//on the frame that the skeleton's health reaches 0 the die function is called.
	if (health <= 0) {
		die();
	}
}

//The hurt function is called by the player's weapon
function hurt() {
	//drop health by 1 per call
	health -= 1;
}

//The dies function is called when health drops to 0
function die() {
	//removes the gameobject
	Destroy(transform.gameObject);
	//replaces the skeleton with the rag doll corpse
	Instantiate(corpseObject, transform.position, transform.rotation);
	//Counts the kill in the total number of kill this round
	GameObject.FindGameObjectWithTag('skeletonMaster').GetComponent(skeletonDropper).addKill();
}