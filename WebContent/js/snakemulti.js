//Code by Anorgar, rules by Emi ly

//c'est une nouvelle version du projet, en utilisant les objet js pour rendre le code beaucoup plus propre

//Variables a modifier pour changer les paramètres du snake
//Hauteur de la grille
var hauteur = 20;
// Largeure de la grille
var largeur = 20;
// vitesse maximum
var vitesseMax = 50;
// vitesse initiale + 1 (car lors de la création de la première pomme, on perd 1
// en vitesse)
var vitesseRouge = 100; // vitesse du snake rouge initiale
var vitesseNoir = 100; // vitesse du snake noir initiale
// nombre de pommes a faire apparaitre à la mort du premier snake
var nbrPomme = 19;
var nbrTour = 10000; // durée du bonus final en nombre de millisecondes
var nbrTourBonus = 10000; // durée des bonus classiques en nombre de
							// millisecondes
var nbrTourVraiBonus = 10000; // durée des vrais bonus classiques en nombre de
								// millisecondes
var probaJaune = 10;// Probabilité d'apparition d'une pomme jaune
var probaBleue = 10; // Probabilité d'apparition d'une pomme bleue
var probaMaron = 10; // Probabilité d'apparition d'une pomme maron
var probaViolet = 10; // Probabilité d'apparition d'une pomme maron

// Création du tableau pour le snake
var table = document.getElementById(("table"));
table.style.backgroundColor = "#87CEFA";
table.cellSpacing = "0px";
// table.cellSpacing = "0px";
for (var i = 0; i <= largeur + 1; i++) {
	var row = document.createElement("tr");
	for (var j = 0; j <= hauteur + 1; j++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode(""));
		cell.style.width = "8px";
		cell.style.height = "8px";
		cell.setAttribute("id", i + " " + j);
		row.appendChild(cell);
	}
	table.appendChild(row);
}
document.getElementById("debut").appendChild(table);

submit.onclick = function newGame(){

	// création des objet snakes
	var snakeNoir = {
//		boucle: new setInterval(),
		positionSnake : [ "1 1", "1 2", "1 3" ], //tableau contenant les indexes des cases du snake
		directionSnake : [ "droite", "droite", "droite" ], //tableau contenant les directions des cases du snake
		miam : [ false, false, false ], //tableau contenant l'estomac du snake
		snakeBody : [ "url('img/queueDroiteNoir.png')",
				"url('img/queueGaucheNoir.png')", "url('img/queueHautNoir.png')",
				"url('img/queueBasNoir.png')", "url('img/teteNoirDroite.png')",
				"url('img/teteNoirGauche.png')", "url('img/teteNoirHaute.png')",
				"url('img/teteNoirBas.png')", "url('img/corpDroiteNoir.png')",
				"url('img/corpHautNoir.png')", "url('img/corpHautDroiteNoir.png')",
				"url('img/corpGaucheHautNoir.png')",
				"url('img/corpBasDroiteNoir.png')",
				"url('img/corpBasGaucheNoir.png')", "url('img/miamNoir.png')" ], // tableau contenant les images permettant de dessiner le snake
		score : 0, //score du snake
		victoire: 0, //nombre de victoire du snake
		vitesse: vitesseNoir, //vitesse du snake
		nomScore: "scorenoir", //id de la case dans laquelle on affiche le score noir
		direction: "droite", // direction du snake dans une boucle de jeu
		mort: false, //permet de savoir si le snake est vivant
		tourFinal: 0, //permet de savoir conbient de temps va durer le bonus final
		flagBonus: false, //permet de savoir si le snake est sous l'effet d'un bonus
		tourBonus: 0, //permet de savoir conbien de temps va durer le bonus
		flagMalus: false, //permet de savoir si on est sous l'effet d'un malus
		tourMalus: 0 //permet de savoir combien de temps va durer le malus
	};
	
	var snakeRouge = {
//		boucle: new setInterval(),
		positionSnake : [ "10 1", "10 2", "10 3" ], //tableau contenant les indexes des cases du snake
		directionSnake : [ "droite", "droite", "droite" ], //tableau contenant les directions des cases du snake
		miam : [ false, false, false ], //tableau contenant l'estomac du snake
		snakeBody : ["url('img/queueDroiteRouge.png')","url('img/queueGaucheRouge.png')","url('img/queueHautRouge.png')","url('img/queueBasRouge.png')",
                     "url('img/teteRougeDroite.png')","url('img/teteRougeGauche.png')","url('img/teteRougeHaute.png')","url('img/teteRougeBas.png')",
                     "url('img/corpDroiteRouge.png')","url('img/corpHautRouge.png')",
                     "url('img/corpHautDroiteRouge.png')","url('img/corpGaucheHautRouge.png')","url('img/corpBasDroiteRouge.png')","url('img/corpBasGaucheRouge.png')",
                     "url('img/miamRouge.png')"], // tableau contenant les images permettant de dessiner le snake
		score : 0, //score du snake
		victoire: 0, //nombre de victoire du snake
		nomScore: "scorerouge", //id de la case dans laquelle on affiche le score rouge
		vitesse: vitesseRouge, //vitesse du snake
		direction: "droite", // direction du snake dans une boucle de jeu
		mort: false, //permet de savoir si le snake est vivant
		tourFinal: 0, //permet de savoir conbient de temps va durer le bonus final
		flagBonus: false, //permet de savoir si le snake est sous l'effet d'un bonus
		tourBonus: 0, //permet de savoir conbien de temps va durer le bonus
		flagMalus: false, //permet de savoir si on est sous l'effet d'un malus
		tourMalus: 0 //permet de savoir combien de temps va durer le malus
	};
	
	//création des pommes
	var pommes={
			
	};
	
	//on affiche les scores
	afficherScore(snakeNoir);
	afficherScore(snakeRouge);
	//on affiche les snakes
	afficherSnake(snakeNoir);
	afficherSnake(snakeRouge);

}




function afficherSnake(snake){		
	//on affiche la queue avec deux cas possible
	//si on a mangé une pomme à cet index
	if (snake.miam[0]){
		document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[14];
	} //il faut prendre en compte la rotation de la queue
	else if(snake.directionSnake[0]!=snake.directionSnake[1]){ 
		switch(snake.directionSnake[1]){
		case "droite": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[0]; break;
		case "gauche": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[1]; break;
		case "haut": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[2]; break;
		case "bas": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[3]; break;
		}
	}
	
	else { //sinon, il faut afficher la queue dans le bon sens
		switch(snake.directionSnake[0]){
		case "droite": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[0]; break;
		case "gauche": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[1]; break;
		case "haut": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[2]; break;
		case "bas": document.getElementById(snake.positionSnake[0]).style.backgroundImage = snake.snakeBody[3]; break;
		}
	}
	//Le reste du corps, c'est la merde...
	for (var i=1; i<snake.positionSnake.length-1;i++){
		//premier cas simple : on est en train de manger une pomme à cet index
		if (snake.miam[i]){
			document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[14];
		} else //sinon, on regarde s'il n'a a pas de changement de direction
		if (snake.directionSnake[i+1]==snake.directionSnake[i]){ 
			switch(snake.directionSnake[i]){
			case "droite":
			case "gauche": document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[8]; break;
			case "haut":
			case "bas": document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[9]; break;
			}
		}
		//sinon, il faut faire un coin
		else {
			//ça va être 4 if moche, mais ça va marcher
			if ((snake.directionSnake[i+1]=="haut")&&(snake.directionSnake[i]=="droite")||(snake.directionSnake[i+1]=="gauche")&&(snake.directionSnake[i]=="bas")){
				document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[11];
			} else
			if ((snake.directionSnake[i+1]=="haut")&&(snake.directionSnake[i]=="gauche")||(snake.directionSnake[i+1]=="droite")&&(snake.directionSnake[i]=="bas")){
				document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[10];
			}else
			if ((snake.directionSnake[i+1]=="bas")&&(snake.directionSnake[i]=="gauche")||(snake.directionSnake[i+1]=="droite")&&(snake.directionSnake[i]=="haut")){
				document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[12];
			} else {
				document.getElementById(snake.positionSnake[i]).style.backgroundImage = snake.snakeBody[13];
			}
		}
	}
	//on affiche la tête
	switch(snake.directionSnake[snake.directionSnake.length-1]){
	case "droite": document.getElementById(snake.positionSnake[snake.positionSnake.length-1]).style.backgroundImage = snake.snakeBody[4]; break;
	case "gauche": document.getElementById(snake.positionSnake[snake.positionSnake.length-1]).style.backgroundImage = snake.snakeBody[5]; break;
	case "haut": document.getElementById(snake.positionSnake[snake.positionSnake.length-1]).style.backgroundImage = snake.snakeBody[6]; break;
	case "bas": document.getElementById(snake.positionSnake[snake.positionSnake.length-1]).style.backgroundImage = snake.snakeBody[7]; break;
	}
}

function afficherScore(snake){
	document.getElementById(snake.nomScore).innerHTML=snake.score;
}