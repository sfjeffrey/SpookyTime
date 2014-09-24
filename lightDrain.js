//To be placed on the lgiht source for the muzzle flash
#pragma strict
@script RequireComponent(Light)
var lightCom : Light;

function Start () {
    lightCom = GetComponent(Light);
}

//Reduces the light's intensity by 1 per frame causing the appearence of bright and sudden flashes
function Update () {
    if (lightCom.intensity > 0) {
        lightCom.intensity -= 1;
    }
}