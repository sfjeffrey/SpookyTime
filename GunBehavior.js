//To be applied to the player's gun object.
#pragma strict
//The maximum amount of ammo that is held in the gun
var maxMagazine : int = 8;
//The current amount of ammo in the gun
var curMagazine : int = 8;
//The amount of ammo heald in reserve
var ammo : int = 8;
//The seconds between shots
var fireRate : int = 3;
//The timer that halts rapid firing
var fireCoolDown : float = 0;

//The ray object for the gun's shots
var shot : RaycastHit;
//The maximum range of the gun's shots
var range : float = 5.0;
//Whether or not the players is currently reloading
var isReloading : boolean = false;
//How many shots are fired per trigger pull
var buckShot : int = 8;
//The spread of the shotgun effect
var spread : float = 0.1;

//The dust cloud that spawns when the terrain is hit
var particle : GameObject;
//The light source of the muzzle flash
var lightSource : Light;
//The object representing bullet holes
var bulletHole : GameObject;
//The crosshair object the player sees
var crossHair : Transform;

//The animation component and sounds
var animations : Animator;
var shotgunShoot  : AudioSource;
var shotgunReload : AudioSource;
var shotgunCock   : AudioSource;
var shotgunClick  : AudioSource;

//Turns off the light at the start of the game
function Start () {
    lightSource.intensity = 0;
}

function Update () {
    //aim object at the crosshair
    transform.LookAt(crossHair.position);
    
    //normalizes ammo
    if (ammo > 16) {
        ammo = 16;
    }
    
    //counts down till you can shoot again
    if (fireCoolDown > 0) {
        fireCoolDown -= Time.deltaTime;
    }
    
    //shoots if cool down over and not reloading
    if (Input.GetMouseButtonDown(0) && fireCoolDown <= 0 && !isReloading) {
        shoot();
    }
    
    //reloads if not already reloading.
    if (Input.GetKey (KeyCode.R) && !isReloading) {
        reload();
    }
    
    //cancels reload
    if (Input.GetMouseButtonDown(0) || Input.GetKey(KeyCode.LeftShift)) {
        isReloading = false;
    }
}

//Is called when the player presses the left mouse button
function shoot () {
    //If there is no ammo in the gun the no ammo noise is played.
    if (curMagazine <= 0) {
        shotgunClick.Play();
        return;
    }
    
    //the muzzle flash is set to 10
    lightSource.intensity = 10;
    //One shell is removed from the guns magazine
    curMagazine -= 1;
    //The shooting sounds is played
    shotgunShoot.Play();
    //The shooting animation is played
    animations.Play('scottShoot');
    //The timer is set to the fire rate variable
    fireCoolDown = fireRate;
    
    //loops for as many times as buckShot for each piece of shot in one shell
    for (var i = 0; i <= buckShot; ++i) {
        //shotAngle is the randomly deviated from the forward position.
        var shotAngle : Vector3 = transform.forward;
        shotAngle.x += Random.Range(-spread, spread);
        shotAngle.y += Random.Range(-spread, spread);
        shotAngle.z += Random.Range(-spread, spread);
        
        //If the ray hits a skeleton its hurt function is called.
        if (Physics.Raycast(transform.position, shotAngle, shot, range)) {
            if (shot.collider.gameObject.tag == 'enemy') {
                shot.collider.GetComponent(enemyHealth).hurt();
            }
            //Otherwise, if the terrain is hit the dustcloud and bullet holes are place at
            //the point of impact
            else if (shot.collider.gameObject.tag == 'terrain') {
                var hitRotation = Quaternion.FromToRotation(Vector3.up, shot.normal);
                Instantiate(particle, shot.point, hitRotation);
                Instantiate(bulletHole, shot.point, hitRotation);

            }
        }
        
    }
}

//Called when the player presses R
function reload () {
    //If the gun is full or there is no spare ammo the no ammo animation is played and
    // the function is cancelled
    if ( curMagazine >= maxMagazine || ammo < 1) {
        animations.Play('scottNoAmmo');
        return;
    }
    //Otherwise set the reloading mode to true
    else {
        isReloading = true;
    }
    //loops as long as the gun has room for more ammo and there is spare ammo to load
    while (curMagazine < maxMagazine && ammo > 0) {
        //Wille cancel the loop if the reloading variable is switched off for a number of reasons
        if (!isReloading) {
            break;
        }
        //plays the reload noise and animation
        shotgunReload.Play();
        animations.Play('scottReload');
        //Waits two thirds of a second before increasing magazine size, decresing spare ammo
        // count, and starting over
        yield WaitForSeconds (0.66);
        ++curMagazine;
        --ammo;
    }
    //Sets the cool down to 1 so that the shotgun cannot be fired before the cocking animation has finished
    fireCoolDown = 1;
    shotgunCock.Play();
    animations.Play('scottCock');
    isReloading = false;
}