//To be applied to the cross hair object.
#pragma strict
//The farthest the crosshair will appear to be when aimed at distant objects
var maxDistance : int = 50;
//The Raycast object cast from the camera.
var cameraRay : RaycastHit;


function Update () {
    //If the cameraRay lands a hit, the crosshair object is moved to that location so that the apparent size of
    //the crosshair can function as a range finder.
    if (Physics.Raycast(transform.parent.position, transform.parent.forward, cameraRay, maxDistance) ) {
        transform.position = cameraRay.point;
    }
    //If the ray does not land a hit before the maxDistance then the cross hair is just moved to the tip of the
    //ray.
    else {
        var target : Ray = new Ray(transform.parent.position, transform.parent.TransformDirection(Vector3.forward));
        transform.position = target.GetPoint(maxDistance);
    }
}