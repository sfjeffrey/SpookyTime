//A script for applying the lengthy game manual description with the appropriate formating

#pragma strict
var text : TextMesh;

var tutorialText : String = 
'-Navigate the grave yard\n-Defend yourself from malevolent skeletons.\n-Search for ammo.\n-Try to survive\n\n\tW A S D : movement\n\tR : reload\n\tMouse1 : shoot\n\tMouse 2 : flip camera\n\tShift : sprint';
function Start () {
	text = GetComponent(TextMesh);
	text.text = tutorialText;
}