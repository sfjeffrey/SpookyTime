//To be placed on the skeleton enemy objects

#pragma strict
//The running speed of the skeletons
var speed : float = 3;
//Variable for when the players is close enough for an attack
private var inRange : boolean = false;
//The range at which a skeleton's attack deals damage
var attackRange : float = 10;
//The location of the player
var target : Transform;
//How much damage per second the skeleton's attack deals
var attackPower : int = 1;
//The path finding object
var agent : NavMeshAgent;

//The number of possible dances the skeleton might do
var numOfDances : int = 3;
//The animation object
var animations : Animator;
//Whether or not the skeleton is currently chasing the player
var isPursuing : boolean = false;
//Whether or not the skeleton is currently dancing
var isDancing : boolean = false;
//The time before a skeleton gives up chasing and despawns
var boredom : float = 30.0;

//Audio objects
var runSound : AudioSource;
var danceSound : AudioSource;

//At the object's instantiation the spawn function is run, the player is established as the target, and
//the animations component is estalished in the animations variable.
function Start () {
    spawn();
    target = GameObject.FindGameObjectWithTag('Player').transform;
    //agent = GetComponent(NavMeshAgent);
    animations = GetComponent(Animator);
    
    //animations.Play('skeleton-idle');
}

function Update () {
    //If the boredom reaches 0 the skeleton despawns. This allows skeletons who are too far behind the player or
    //get stuck can have a chance to respawn and ambush the player.
    if (boredom <= 0) {
        despawn();
    }
    //if the skeleton is in pursuit mode then the boredom timer ticks down, and the skeleton pursues the player
    //if the skeleton reaches half its attack range it will stop and begin dancing.
    else if (isPursuing) {

        if (Vector3.Distance(transform.position, target.position) >= attackRange / 2) {
            agent.SetDestination(target.position);
            boredom -= Time.deltaTime;
        }
        else {
            dance();
        }
    }
    //If the skeleton is dancing and the player is within its attack range then the player's hurt function
    //is called with the skeleton's attack power. If the players leaves the attack range then the skeleton
    //resumes pursuit.
    else if (isDancing) {
        if (Vector3.Distance(transform.position, target.position) <= attackRange) {
            target.gameObject.GetComponent(playerStats).hurt(attackPower);
        }
        else {
            pursue();
        }
    }
}

//The dance function is called when the skeleton catches up to within half its attack range to the player
function dance () {
    //stops the running sound
    runSound.Stop();
    //Stops the skeleton immediately
    agent.Stop(true);
    //plays the dance sounds
    danceSound.Play();
    //Picks a random dance animation and plays it
    var dance = 'skeleton-dance'+Mathf.Round(Random.Range(1,numOfDances+1));
    animations.CrossFade(dance,0.12);
    //While dancing the boredom timer increases, so that skeletons who manage to catch up with the player often
    //do not despawn
    boredom += Time.deltaTime;
    //Switches the mode variables
    isPursuing = false;
    isDancing = true;

}

//The pursue function is called with the player is too far away to attack
function pursue () {
    //Stops the dance sounds and plays the run sounds
    danceSound.Stop();
    runSound.Play();
    //Plays the running animations
    animations.CrossFade('skeleton-run',0.25);
    //Switches the mode variables
    isPursuing = true;
    isDancing = false;

}
//The spawn function is called when the object is substantiated
function spawn () {
    //plays the spawn animation, waits for 3 seconds, then runs the pursue function
    animations.Play('skeleton-spawn');
    yield WaitForSeconds(3);
    pursue();
}

//The despawn function is called when the bored timer reaches zero
function despawn() {
    //Turns off both of the mode variables
    isPursuing = false;
    isDancing = false;
    //Plays the despawn animation and waits for 1 second
    animations.Play('skeleton-dive');
    yield WaitForSeconds(1);
    //Removes the object from the world and adds 1 back into the spawn count for skeletons.
    Destroy(transform.gameObject);
    GameObject.FindGameObjectWithTag('skeletonMaster').GetComponent(skeletonDropper).spawns += 1;
}