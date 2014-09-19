//The player's statistics covering current/maximum health and stamina aswell as health/stamina regeneration
//rates and procedures

#pragma strict
//The health and stamina stats
var health : float = 60.0;
var maxHealth : float = health;
var stamina : float = 1.0;
//variable trackign whether the player is standing still
private var isMoving : boolean = true;
//variable for when the player is tired
var isTired : boolean = false;
//The burst skeleton object for durign the death animation
var burstSkeletonObject : GameObject;

//The speed multiplier for when the player is tired
var tiredSpeed : float = 0.5;
//How much stamina recovers per second
var staminaRecovery : float = 0.1;
//How much stamina is consumed per second while sprinting
var staminaConsumption : float = 0.1;
//The amount of stamina that must be recovered before the player ceases to be
//tired
var tiredLimit : float = 0.5;
//A timer for tracking how long since damage was last taken/for how long it was taken
var hurtTimer : float = 0;
//How much hp is recovered per second while healing
var healRate : float = 1;
//Whether or not the player is dead
var dead : boolean = false;

//graphic overlays and sounds for health and stamina
var healthOverlay : GUITexture;
var healthNoise : AudioSource;
var staminaOverlay : GUITexture;
var staminaNoise : AudioSource;


function Update () {
	//If the player's health reaches 0 the player dies
	if (health <= 0 && !dead) {
		die();
		return;
	}
	//If the inputs for movement are 0 then the isMoving variable is false
	if (Input.GetAxisRaw('Horizontal') == 0 && Input.GetAxisRaw('Vertical') == 0) {
		isMoving = false;
	}
	//Otherwise it is true
	else {
		isMoving = true;
	}
	//If you are still stamina recovers. If you're sprinting it diminishes.
	if (!isMoving && stamina < 1) {
		stamina += staminaRecovery * Time.deltaTime;
		//If the player is in the tired state, but recovers to the tiredLimit then the speed multiplier is returned
		//normal
		if (isTired && stamina >= tiredLimit) {
			isTired = false;
			transform.GetComponent(ThirdPersonShooter).speedMultiplier = 1.0;
		}
	}
	//If there is available stamina and the sprint key is being held down then stamina drains
	else if (stamina >= 0 && Input.GetAxisRaw('Vertical') == 1 && (Input.GetKey (KeyCode.LeftShift) || Input.GetKey (KeyCode.RightShift)) ) {
		stamina -= staminaConsumption * Time.deltaTime;
	}
	
	//If you stamina hits 0 your're tired
	if (stamina <= 0.0) {
		isTired = true;
		transform.GetComponent(ThirdPersonShooter).speedMultiplier = tiredSpeed;
	}
	
	//If the hurtTimer is above 0 it counts down. Otherwise health recovers at healRate per second
	if (hurtTimer > 0) {
		hurtTimer -= Time.deltaTime;
	}
	else {
		if (health < maxHealth) {
			health += healRate * Time.deltaTime;
		}
	}
	
	//Adjusts the sound volume and overlay oppactiy to signify how much of either is left
	staminaOverlay.color.a = 1 - ((stamina+0.5) / 1);
	staminaNoise.volume = staminaOverlay.color.a;
	healthOverlay.color.a = 0.5 - (health / maxHealth);
	healthNoise.volume = healthOverlay.color.a * 2;
}

//Is called by the offending skeleton
function hurt (power:int) {
	//Increases the hurt timer by one and a half seconds for every second
	hurtTimer += Time.deltaTime * 1.5;
	//Lowers health by power every second
	health -= power * Time.deltaTime;
}

//freezes or unfreezes the player while the game is paused.
function unfrozen(bool:boolean) {
	transform.GetComponent(MouseLook).enabled = bool;
	transform.GetComponent(ThirdPersonShooter).enabled = bool;
	transform.GetComponentInChildren(GunBehavior).enabled = bool;
	transform.GetChild(1).GetComponent(MouseLook).enabled = bool;

}
//Activates the death animation sequence i nthe player model and in the burst skeleton
function die(){
	dead = true;
	GetComponentInChildren(Animator).Play('scottDie');
	burstSkeletonObject.gameObject.active = true;
	burstSkeletonObject.GetComponent(burstSkeleton).burstOut();

}
//Function is called at the beginning of every round giving the player full health and stamina
function fullRecover () {
	hurtTimer = 0;
	health = maxHealth;
	stamina = 1;
}