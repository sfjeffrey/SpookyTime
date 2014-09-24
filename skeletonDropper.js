//To be placed on the skeletonMaster object.
#pragma strict
//The gameobject representing the enemy skeletons
var skeleton : GameObject;
//The time before the next wave of skeletons spawns
var spawnTimer : float = 10;
//How many skeletons must be killed before the round is over.
var roundGoal : int = 10;
//The remaining skeletons that have not yet spawned. 
var spawns : int = 0;
//the player's position
var player : Transform;
//The current round and the number of skeletons that are spawned at once
private var round : int = 0;
//how many skeletons have been killed in the current round
var kills : int = 0;
//The object containing the rotating victory camera
var victoryCam : Transform;
//Whether ot not to count game time
private var timeOn : boolean = false;
//The total game time
private var time : float;

function Start () {
    //freezes the player at the start
    player.GetComponent(playerStats).unfrozen(false);
}


function Update () {

    //checks if the round timer is running
    if (timeOn) {
        //does all the death stuff when the player's HP is out
        if (player.GetComponent(playerStats).health <= 0) {
            roundLose();
        }
        //adds time to the clock
        time += Time.deltaTime;
        
        //counts down to next skeleton wave
        spawnTimer -= Time.deltaTime;
        if (spawnTimer <= 0) {
            spawnSkeleton();
        }
        //wins the round when enough skeletons have been killed
        if (kills >= roundGoal) {
            roundWin();
        }
    }
}


//spawns the next wave of skeletons by picking the N closest spawn points and instantiating
//new skeletons there.
function spawnSkeleton() {
    spawnTimer = 10;
    //stops spawning skeletons in excess of round goal
    if (spawns <= 0) {
        return;
    }
    //array of all the spawn locations
    var graves : Array = GameObject.FindGameObjectsWithTag('spawn');
    //sorts spawns by distance
    graves.sort(function(a:GameObject,b:GameObject) {
        return Vector3.Distance(a.transform.position, player.position) - Vector3.Distance(b.transform.position, player.position);
    });
    
    //starting with the closest, spawns a skeleton at a spawn point for as many as the round number
    for (var i = 1; i <= round; ++i) {
        if (spawns <= 0) {
            break;
        }
        var choice : GameObject = graves[i];
        Instantiate(skeleton, choice.transform.position, Quaternion.identity);
        --spawns;
    }
}

//Function is called at the round completion and turns on the special victory cameras
function roundWin() {
    timeOn = false;
    victoryCam.gameObject.active = true;
    player.GetComponent(playerStats).unfrozen(false);
    victoryCam.GetComponent(VictoryCamGFX).displayTime(round,time);
    player.GetComponent(playerStats).fullRecover();
}

//Begins the next round by unfreezing the player and setting the appropriate spawn counts
function nextRound() {
    //GUI stuff
    Screen.lockCursor = true;
    timeOn = true;
    ++round;
    roundGoal = 10 + (round * 2);
    kills = 0;
    spawns = roundGoal;
    victoryCam.active = false;
    player.GetComponent(playerStats).unfrozen(true);
}

//Is called when the player dies. Runs the GUI aspects of the player's death
function roundLose() {
    timeOn = false;
    victoryCam.gameObject.active = true;
    player.GetComponent(playerStats).unfrozen(false);
    victoryCam.GetComponent(VictoryCamGFX).deathCam(round,time);
    
}

//Is called when a skeleton is killed and adds a point to the kill count
function addKill() {
    ++kills;
}

