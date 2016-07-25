//alert('Welcome to the best snake game in the world !');

//Création des variables globales
var direction = "droite";
var positionSnake = new Array();
var indexPomme;
var indexTemp;
var indexTete;
var hauteur = 15;
var largeur = 15;
var directionBoucle;
var score=-10;
var vitesseMax=50;
var vitesse=101;
//création du snake
positionSnake = [ "1 1", "2 2", "3 3" ];

//mise en page du score
document.getElementById("score").style.width = "100px";
document.getElementById("score").style.height = "20px";
document.getElementById("score").style.border = "thick solid black";

// Création du tableau pour le snake
var table = document.createElement("table");
table.style.backgroundColor = "#87CEFA";
for (var i = 0; i <= largeur+1; i++) {
	var row = document.createElement("tr");
	for (var j = 0; j <= hauteur+1; j++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode(""));
		cell.style.width = "10px";
		cell.style.height = "10px";
		cell.setAttribute("id", i + " " + j);
		row.appendChild(cell);
	}
	table.appendChild(row);
}
document.getElementById("debut").appendChild(table);

document.getElementById(positionSnake[0]).style.backgroundColor = "black";
document.getElementById(positionSnake[1]).style.backgroundColor = "black";
document.getElementById(positionSnake[2]).style.backgroundColor = "black";

//faire apparaitre une pomme:
apparaitrePomme();


window.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
	case 37:
		if (directionBoucle != "droite") {
			direction = "gauche";
		}
		break;
	case 38:
		if (directionBoucle != "bas") {
			direction = "haut";
		}
		break;
	case 39:
		if (directionBoucle != "gauche") {
			direction = "droite";
		}
		break;
	case 40:
		if (directionBoucle != "haut") {
			direction = "bas";
		}
		break;
	}
});

var boucle = setInterval(deplacementSnake, vitesse);

function deplacementSnake() {
	indexTemp = 0;
	switch (direction) {
	case "droite":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[1];
		indexTemp = parseInt(indexTemp) + 1;
		if (parseInt(indexTemp) > largeur) {
			indexTemp = 0;
		}
		indexTete = positionSnake[positionSnake.length - 1].split(' ')[0] + " "
				+ indexTemp;
		directionBoucle = "droite";
		break;
	case "gauche":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[1];
		indexTemp = parseInt(indexTemp) - 1;
		if (parseInt(indexTemp) < 0) {
			indexTemp = largeur;
		}
		indexTete = positionSnake[positionSnake.length - 1].split(' ')[0] + " "
				+ indexTemp;
		directionBoucle = "gauche";
		break;
	case "haut":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[0];
		indexTemp = parseInt(indexTemp) - 1;
		if (parseInt(indexTemp) < 0) {
			indexTemp = hauteur;
		}
		indexTete = indexTemp + " "
				+ positionSnake[positionSnake.length - 1].split(' ')[1];
		directionBoucle = "haut";
		break;
	case "bas":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[0];
		indexTemp = parseInt(indexTemp) + 1;
		if (parseInt(indexTemp) > hauteur) {
			indexTemp = 0;
		}
		indexTete = indexTemp + " "
				+ positionSnake[positionSnake.length - 1].split(' ')[1];
		directionBoucle = "bas";
		break;
	}
	//Si le snake se mord la queue
	for (var i=0; i<positionSnake.length-1;i++){
		if(positionSnake[i] == indexTete){
			clearInterval(boucle);
			alert("Vous avez perdu :'(");
			break;
		}
	}
	//Si on est sur une pomme:
	document.getElementById(positionSnake[0]).style.backgroundColor = "#87CEFA";
	for (var i=0; i<positionSnake.length-1;i++){
		positionSnake[i] = positionSnake[i+1];
	}
	positionSnake[positionSnake.length-1] = indexTete;
	if (indexTete == indexPomme){
		//on fait apparaitre une nouvelle pomme
		apparaitrePomme();
		//on fait grandir le snake
		positionSnake.push(indexTete);
	}
	document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundColor = "black";

}

function apparaitrePomme() {
	//on gagne 10 points
	score = score + 10;
	document.getElementById("score").innerHTML=score;
	//augmentation progressive de la vitesse
	vitesse = vitesse -1;
	if (vitesse < vitesseMax){
		vitesse = vitesseMax;
	}
	var ligne;
	var colonne;
	var flag = false;
	do {
		flag = false;
		ligne = Math.floor(Math.random() * largeur);
		colonne = Math.floor(Math.random() * hauteur);
		indexPomme= colonne + " " + ligne;
		for (var i = 0; i<positionSnake.length; i++){
			if (indexPomme == positionSnake[i]){
				flag = true;
			}
		}
	} while (flag);
	
	
	document.getElementById(indexPomme).style.backgroundColor = "green";
	
}
