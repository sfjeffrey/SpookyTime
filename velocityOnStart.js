//To be placed on the parts of the skeleton corpses. Gives them and added velocity on birth so that they
//appear to explode rather than smply fall apart.

#pragma strict
var velocity : float;
var direction : Vector3;
function Start () {
    GetComponent(Rigidbody).AddForce (transform.TransformDirection(direction) * velocity);
}

function Update () {

}
