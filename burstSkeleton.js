//This script is to be applied to the burst skeleton object.

#pragma strict
//The total number of possible dances the burst skeleton might do.
var numOfDances : int;

//The burstOut function is activated by the player's death function and plays the special "burst" animation,
//waits until it is completed, and then plays a random dance animation.
function burstOut() {
	GetComponent(Animator).Play('skeleton-burst');
	yield WaitForSeconds(4);
	var dance = 'skeleton-dance'+Mathf.Round(Random.Range(1,numOfDances+1));
	GetComponent(Animator).Play(dance);
}