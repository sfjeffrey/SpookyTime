//To be applied to the blood affect object.
#pragma strict

var take1 : ParticleSystem[];
var take2 : ParticleSystem[];
var take3 : ParticleSystem[];
var take4 : ParticleSystem[];


//This function handles specifically arranged particle systems and allows
// them to be activated in sequence along with the death animation

function playParticles1() {
    for (var i:ParticleSystem in take1) {
        i.Play(false);
    }

}
function playParticles2() {
    for (var i:ParticleSystem in take2) {
        i.Play(false);
    }

}
function playParticles3() {
    for (var i:ParticleSystem in take3) {
        i.Play(false);
    }

}
function playParticles4() {
    for (var i:ParticleSystem in take4) {
        i.Play(false);
    }

}
