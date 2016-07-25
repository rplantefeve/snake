//alert('Welcome to the best snake game in the world !');

//Hauteur de la grille
var hauteur = 30;
//Largeure de la grille
var largeur = 30;
//vitesse maximum
var vitesseMax=50;
//vitesse initiale + 1 (car lors de la création de la première pomme, on perd 1 en vitesse)
var vitesse=101;

//Création des variables globales
var directionNoir = "droite";
var directionRouge = "droite";
var positionSnakeNoir = new Array();
var positionSnakeRouge = new Array();
var indexPomme;
var indexTemp;
var indexTete;
var directionBoucleNoir;
var directionBoucleRouge;
var scoreNoir=0;
var scoreRouge=0;
var flagN=false; //true si le snake noir meurt
var flagR=false; //true si le snake rouge meurt

//création du snake
positionSnakeNoir = [ "1 1", "1 2", "1 3" ];
positionSnakeRouge = [ "10 1", "10 2", "10 3" ];

//mise en page du score
document.getElementById("scorenoir").style.width = "100px";
document.getElementById("scorenoir").style.height = "20px";
document.getElementById("scorenoir").style.border = "thick solid black";

document.getElementById("scorerouge").style.width = "100px";
document.getElementById("scorerouge").style.height = "20px";
document.getElementById("scorerouge").style.border = "thick solid red";

//initialisation des scores
document.getElementById("scorenoir").innerHTML=scoreNoir;
document.getElementById("scorerouge").innerHTML=scoreRouge;

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

document.getElementById(positionSnakeNoir[0]).style.backgroundColor = "black";
document.getElementById(positionSnakeNoir[1]).style.backgroundColor = "black";
document.getElementById(positionSnakeNoir[2]).style.backgroundColor = "black";

document.getElementById(positionSnakeRouge[0]).style.backgroundColor = "red";
document.getElementById(positionSnakeRouge[1]).style.backgroundColor = "red";
document.getElementById(positionSnakeRouge[2]).style.backgroundColor = "red";

//faire apparaitre une pomme:
apparaitrePomme();

//déplacement du snake noir
window.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
	case 37:
		if (directionBoucleNoir != "droite") {
			directionNoir = "gauche";
		}
		break;
	case 38:
		if (directionBoucleNoir != "bas") {
			directionNoir = "haut";
		}
		break;
	case 39:
		if (directionBoucleNoir != "gauche") {
			directionNoir = "droite";
		}
		break;
	case 40:
		if (directionBoucleNoir != "haut") {
			directionNoir = "bas";
		}
		break;
	case 81:
		if (directionBoucleRouge != "droite") {
			directionRouge = "gauche";
		}
		break;
	case 90:
		if (directionBoucleRouge != "bas") {
			directionRouge = "haut";
		}
		break;
	case 68:
		if (directionBoucleRouge != "gauche") {
			directionRouge = "droite";
		}
		break;
	case 83:
		if (directionBoucleRouge != "haut") {
			directionRouge = "bas";
		}
		break;
	}
});

var boucle = setInterval(deplacementSnake, vitesse);

function deplacementSnake() {
	//on déplace d'abord le noir, puis le rouge (pour pas de racisme)
	//si le noir est vivant
	if (flagN==false){
		indexTemp = 0;
		switch (directionNoir) {
		case "droite":
			indexTemp = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[1];
			indexTemp = parseInt(indexTemp) + 1;
			if (parseInt(indexTemp) > largeur) {
				indexTemp = 0;
			}
			indexTete = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[0] + " "
					+ indexTemp;
			directionBoucleNoir = "droite";
			break;
		case "gauche":
			indexTemp = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[1];
			indexTemp = parseInt(indexTemp) - 1;
			if (parseInt(indexTemp) < 0) {
				indexTemp = largeur;
			}
			indexTete = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[0] + " "
					+ indexTemp;
			directionBoucleNoir = "gauche";
			break;
		case "haut":
			indexTemp = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[0];
			indexTemp = parseInt(indexTemp) - 1;
			if (parseInt(indexTemp) < 0) {
				indexTemp = hauteur;
			}
			indexTete = indexTemp + " "
					+ positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[1];
			directionBoucleNoir = "haut";
			break;
		case "bas":
			indexTemp = positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[0];
			indexTemp = parseInt(indexTemp) + 1;
			if (parseInt(indexTemp) > hauteur) {
				indexTemp = 0;
			}
			indexTete = indexTemp + " "
					+ positionSnakeNoir[positionSnakeNoir.length - 1].split(' ')[1];
			directionBoucleNoir = "bas";
			break;
		}
		
		//Si on est sur une pomme:
		document.getElementById(positionSnakeNoir[0]).style.backgroundColor = "#87CEFA";
		for (var i=0; i<positionSnakeNoir.length-1;i++){
			positionSnakeNoir[i] = positionSnakeNoir[i+1];
		}
		positionSnakeNoir[positionSnakeNoir.length-1] = indexTete;
		
		//comme le rouge mange le noir, il faut le réafficher
		for (var i=0; i<positionSnakeNoir.length;i++){
			document.getElementById(positionSnakeNoir[i]).style.backgroundColor = "black";
		}
		
		//Si le snake se mord la queue
		for (var i=0; i<positionSnakeNoir.length-1;i++){
			if(positionSnakeNoir[i] == indexTete){
				flagN=true;
				for (var j=0; j<positionSnakeNoir.length;j++){
					document.getElementById(positionSnakeNoir[j]).style.backgroundColor = "#87CEFA";
				}
				if (flagR){
					clearInterval(boucle);
					alert("Vous avez perdu :'(");
					break;
				}
			}
		}
		if (indexTete == indexPomme){
			//on fait apparaitre une nouvelle pomme
			apparaitrePomme();
			//on fait grandir le snake
			positionSnakeNoir.push(indexTete);
			//ajout du nouveau score
			scoreNoir = scoreNoir + 10;
			document.getElementById("scorenoir").innerHTML=scoreNoir;
			
		}
	}
	
	
	//on déplace d'abord le noir, puis le rouge (pour pas de racisme)
	//si le snake est vivant
	if (flagR==false){
		indexTemp = 0;
		switch (directionRouge) {
		case "droite":
			indexTemp = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[1];
			indexTemp = parseInt(indexTemp) + 1;
			if (parseInt(indexTemp) > largeur) {
				indexTemp = 0;
			}
			indexTete = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[0] + " "
					+ indexTemp;
			directionBoucleRouge = "droite";
			break;
		case "gauche":
			indexTemp = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[1];
			indexTemp = parseInt(indexTemp) - 1;
			if (parseInt(indexTemp) < 0) {
				indexTemp = largeur;
			}
			indexTete = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[0] + " "
					+ indexTemp;
			directionBoucleRouge = "gauche";
			break;
		case "haut":
			indexTemp = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[0];
			indexTemp = parseInt(indexTemp) - 1;
			if (parseInt(indexTemp) < 0) {
				indexTemp = hauteur;
			}
			indexTete = indexTemp + " "
					+ positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[1];
			directionBoucleRouge = "haut";
			break;
		case "bas":
			indexTemp = positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[0];
			indexTemp = parseInt(indexTemp) + 1;
			if (parseInt(indexTemp) > hauteur) {
				indexTemp = 0;
			}
			indexTete = indexTemp + " "
					+ positionSnakeRouge[positionSnakeRouge.length - 1].split(' ')[1];
			directionBoucleRouge = "bas";
			break;
		}
		
		//Si on est sur une pomme:
		document.getElementById(positionSnakeRouge[0]).style.backgroundColor = "#87CEFA";
		for (var i=0; i<positionSnakeRouge.length-1;i++){
			positionSnakeRouge[i] = positionSnakeRouge[i+1];
		}
		positionSnakeRouge[positionSnakeRouge.length-1] = indexTete;
		
		for (var i=0; i<positionSnakeRouge.length;i++){
			document.getElementById(positionSnakeRouge[i]).style.backgroundColor = "red";
		}
		
		//Si le snake se mord la queue
		for (var i=0; i<positionSnakeRouge.length-1;i++){
			if(positionSnakeRouge[i] == indexTete){
				flagR=true;
				for (var j=0; j<positionSnakeRouge.length;j++){
					document.getElementById(positionSnakeRouge[j]).style.backgroundColor = "#87CEFA";
				}
				if (flagN){
					clearInterval(boucle);
					alert("Vous avez perdu :'(");
					break;
				}
			}
		}
		if (indexTete == indexPomme){
			//on fait apparaitre une nouvelle pomme
			apparaitrePomme();
			//on fait grandir le snake
			positionSnakeRouge.push(indexTete);
			//ajout du nouveau score
			scoreRouge = scoreRouge + 10;
			document.getElementById("scorerouge").innerHTML=scoreRouge;
			
		}
	}
	
}

function apparaitrePomme() {
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
		for (var i = 0; i<positionSnakeNoir.length; i++){
			if (indexPomme == positionSnakeNoir[i]){
				flag = true;
			}
		}
		for (var i = 0; i<positionSnakeRouge.length; i++){
			if (indexPomme == positionSnakeRouge[i]){
				flag = true;
			}
		}
	} while (flag);
	
	
	document.getElementById(indexPomme).style.backgroundColor = "green";
	
}
