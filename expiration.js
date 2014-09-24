//To be placed on any object which will dissappear over a length of tme

#pragma strict
//Seconds until the object disappears
var lifeTime : float = 5;

function Update () {
    //lifeTime is counted down
    lifeTime -= Time.deltaTime;
    //if the lifeTime reaches 0 the object disappears;
    if (lifeTime <= 0) {
        Destroy(transform.gameObject);
    }
}