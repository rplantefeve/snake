//Code by Anorgar, rules by Emi ly

//c'est une nouvelle version du projet, en utilisant les objet js pour rendre le code beaucoup plus propre

//Variables a modifier pour changer les param√®tres du snake
//Hauteur de la grille
var hauteur = 20;
// Largeure de la grille
var largeur = 20;
// vitesse maximum
var vitesseMax = 50;
var vitesseRouge = 100; // vitesse du snake rouge initiale
var vitesseNoir = 100; // vitesse du snake noir initiale
// nombre de pommes a faire apparaitre √† la mort du premier snake
var nbrPommeFin = 19;
var nbrTourFinal = 10000; // dur√©e du bonus final en nombre de millisecondes
var nbrTourBonus = 10000; // dur√©e des bonus classiques en nombre de
							// millisecondes
var nbrTourMalus = 10000; // dur√©e des vrais bonus classiques en nombre de
								// millisecondes
var probaJaune = 10;// Probabilit√© d'apparition d'une pomme jaune
var probaBleue = 10; // Probabilit√© d'apparition d'une pomme bleue
var probaMaron = 10; // Probabilit√© d'apparition d'une pomme maron
var probaViolet = 10; // Probabilit√© d'apparition d'une pomme maron


var snakeNoirViolet = ["url('img/queueDroiteNoirViolet.png')","url('img/queueGaucheNoirViolet.png')","url('img/queueHautNoirViolet.png')","url('img/queueBasNoirViolet.png')",
                       "url('img/teteNoirDroiteViolet.png')","url('img/teteNoirGaucheViolet.png')","url('img/teteNoirHauteViolet.png')","url('img/teteNoirBasViolet.png')",
                       "url('img/corpDroiteNoirViolet.png')","url('img/corpHautNoirViolet.png')",
                       "url('img/corpHautDroiteNoirViolet.png')","url('img/corpGaucheHautNoirViolet.png')","url('img/corpBasDroiteNoirViolet.png')","url('img/corpBasGaucheNoirViolet.png')",
                       "url('img/miamNoirViolet.png')"];
var snakeRougeViolet = ["url('img/queueDroiteRougeViolet.png')","url('img/queueGaucheRougeViolet.png')","url('img/queueHautRougeViolet.png')","url('img/queueBasRougeViolet.png')",
                        "url('img/teteRougeDroiteViolet.png')","url('img/teteRougeGaucheViolet.png')","url('img/teteRougeHauteViolet.png')","url('img/teteRougeBasViolet.png')",
                        "url('img/corpDroiteRougeViolet.png')","url('img/corpHautRougeViolet.png')",
                        "url('img/corpHautDroiteRougeViolet.png')","url('img/corpGaucheHautRougeViolet.png')","url('img/corpBasDroiteRougeViolet.png')","url('img/corpBasGaucheRougeViolet.png')",
                        "url('img/miamRougeViolet.png')"];
var snakeNoir = ["url('img/queueDroiteNoir.png')","url('img/queueGaucheNoir.png')","url('img/queueHautNoir.png')","url('img/queueBasNoir.png')",
                         "url('img/teteNoirDroite.png')","url('img/teteNoirGauche.png')","url('img/teteNoirHaute.png')","url('img/teteNoirBas.png')",
                         "url('img/corpDroiteNoir.png')","url('img/corpHautNoir.png')",
                         "url('img/corpHautDroiteNoir.png')","url('img/corpGaucheHautNoir.png')","url('img/corpBasDroiteNoir.png')","url('img/corpBasGaucheNoir.png')",
                         "url('img/miamNoir.png')"]; 
var snakeRouge = ["url('img/queueDroiteRouge.png')","url('img/queueGaucheRouge.png')","url('img/queueHautRouge.png')","url('img/queueBasRouge.png')",
                          "url('img/teteRougeDroite.png')","url('img/teteRougeGauche.png')","url('img/teteRougeHaute.png')","url('img/teteRougeBas.png')",
                          "url('img/corpDroiteRouge.png')","url('img/corpHautRouge.png')",
                          "url('img/corpHautDroiteRouge.png')","url('img/corpGaucheHautRouge.png')","url('img/corpBasDroiteRouge.png')","url('img/corpBasGaucheRouge.png')",
                          "url('img/miamRouge.png')"]; 

//crÈation des snakes
var snakeNoir=new object();
var snakeRouge=new Object();

//crÈation des pommes
var pommes=new object();

//crÈation de la boucle de jeu
var boucle;

var flagBonusFin = false; //Permet de savoir si on est dans le bonus final
var tourBonusFin; //Permet de calculer le temps du bonus de fin
// Cr√©ation du tableau pour le snake
var table = document.getElementById(("table"));
table.style.backgroundColor = "#87CEFA";
table.cellSpacing = "0px";
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

	// cr√©ation des objet snakes
	snakeNoir.positionSnake = [ "1 1", "1 2", "1 3" ]; //tableau contenant les indexes des cases du snake
	snakeNoir.directionSnake = [ "droite", "droite", "droite" ]; //tableau contenant les directions des cases du snake
	snakeNoir.directionBoucle = "droite"; //direction du snake pendant la boucle, evite de lui permetre de se mordre la tÍte
	snakeNoir.miam = [ false, false, false ]; //tableau contenant l'estomac du snake
	snakeNoir.snakeBody = snakeNoir; // tableau contenant les images permettant de dessiner le snake
	snakeNoir.score = 0, //score du snake
	snakeNoir.victoire= 0; //nombre de victoire du snake
	snakeNoir.vitesse= vitesseNoir; //vitesse du snake
	snakeNoir.temps= 0; //permet d'utiliser une boucle de jeu globale aux deux snakes
	snakeNoir.nomScore= "scorenoir"; //id de la case dans laquelle on affiche le score noir
	snakeNoir.nomVictoire= "victoirenoir"; //id de la case dans laquelle le nombre de victoires est affichÈ.
	snakeNoir.direction= "droite"; // direction du snake dans une boucle de jeu
	snakeNoir.mort= false; //permet de savoir si le snake est vivant
	snakeNoir.tourFinal= 0; //permet de savoir conbient de temps va durer le bonus final
	snakeNoir.flagBonus= false; //permet de savoir si le snake est sous l'effet d'un bonus
	snakeNoir.tourBonus= 0; //permet de savoir conbien de temps va durer le bonus
	snakeNoir.flagMalus= false; //permet de savoir si on est sous l'effet d'un malus
	snakeNoir.tourMalus= 0; //permet de savoir combien de temps va durer le malus
	snakeNoir.bonusType= ""; //permet de connaÓtre le type de bonus du snake
	snakeNoir.malusType= ""; //permet de connaÓtre le type de malus du snake
	snakeNoir.couleur="noir"; //permet de savoir si on est le snake noir ou rouge

	snakeRouge.positionSnake = [ "10 1", "10 2", "10 3" ]; //tableau contenant les indexes des cases du snake
	snakeRouge.directionSnake = [ "droite", "droite", "droite" ]; //tableau contenant les directions des cases du snake
	snakeRouge.directionBoucle = "droite"; //direction du snake pendant la boucle, evite de lui permetre de se mordre la tÍte
	snakeRouge.miam = [ false, false, false ]; //tableau contenant l'estomac du snake
	snakeRouge.snakeBody = snakeRouge; // tableau contenant les images permettant de dessiner le snake
    snakeRouge.score = 0; //score du snake
    snakeRouge.victoire= 0; //nombre de victoire du snake
    snakeRouge.nomScore= "scorerouge"; //id de la case dans laquelle on affiche le score rouge
    snakeRouge.nomVictoire= "victoirerouge"; //id de la case dans laquelle le nombre de victoires est affichÈ.
    snakeRouge.vitesse= vitesseRouge; //vitesse du snake
    snakeRouge.temps= 0; //permet d'utiliser une boucle de jeu globale aux deux snakes
    snakeRouge.direction= "droite"; // direction du snake dans une boucle de jeu
    snakeRouge.mort= false; //permet de savoir si le snake est vivant
    snakeRouge.tourFinal= 0; //permet de savoir conbient de temps va durer le bonus final
    snakeRouge.flagBonus= false; //permet de savoir si le snake est sous l'effet d'un bonus
    snakeRouge.tourBonus= 0; //permet de savoir conbien de temps va durer le bonus
    snakeRouge.flagMalus= false; //permet de savoir si on est sous l'effet d'un malus
    snakeRouge.tourMalus= 0; //permet de savoir combien de temps va durer le malus
    snakeRouge.bonusType= ""; //permet de connaÓtre le type de bonus du snake
	snakeRouge.malusType= ""; //permet de connaÓtre le type de malus du snake
	snakeRouge.couleur="rouge"; //permet de savoir si on est le snake noir ou rouge
	
	//cr√©ation des pommes
	pommes.type= new Array(); //tableau permettant de connaÓtre les types des pommes
	pommes.indexPomme= new Array(); //tableau permettant de savoir o˘ se trouve les pomme sur la grille
	
	//on affiche les scores
	afficherScore(snakeNoir);
	afficherScore(snakeRouge);
	//on affiche les victoires
	afficherVictoire(snakeNoir);
	afficherVictoire(snakeRouge);
	//on affiche les snakes
	afficherSnake(snakeNoir);
	afficherSnake(snakeRouge);
	//On fait apparaÓtre une pomme
	apparaitrePomme("vert", "url('img/pommeVerte.png')");
	
	//crÈation de la boucle de jeu
	boucle = setInterval(boucleDeJeu, 1);

};

//appel les fonction de dÈplacement des snakes noirs et rouges
function boucleDeJeu(){
	snakeNoir.temps+=1;
	snakeRouge.temps+=1;
	//si le snake noir est vivant et que Áa vitesse est atteinte, il se dÈplace
	if (!snakeNoir.mort && snakeNoir.vitesse==snakeNoir.temps){
		//on remet le temps ‡ 0
		snakeNoir.temps=0;
		//on dÈplace le snake
		deplacement(snakeNoir, snakeRouge);
	}
	//si le snake rouge est vivant et que Áa vitesse est atteinte, il se dÈplace
	if (!snakeRouge.mort && snakeRouge.vitesse==snakeRouge.temps){
		//on remet le temps ‡ 0
		snakeRouge.temps=0;
		//on dÈplace le snake
		deplacement(snakeRouge, snakeNoir);
	}
}

function deplacement(snakeActif, snakePassif) {
	//on d√©place d'abord le snake
	avancer(snakeActif);
	//On regarde si le snakeActif mange une pomme
	for (var i = 0; i<pommes.indexPomme.length; i++){
		if (snakeActif.positionsnakeActif[snakeActif.positionsnakeActif.length-1] == pommes.indexPomme[i]){
			//on regarde le type de pomme qu'on mange
			switch(pommes.type[i]){
			//si on mange une pomme verte
			case "vert":
				//on utilise la fonction manger une pomme
				mangerVert(snakeActif, i);
				break;
				//Si on mange une pomme jaune : un perd des points, de la taille et de la vitesse
			case "jaune":
				//On appel la fonction qui gËre l'ingestion de la pomme jaune (assez indigeste d'ailleurs)
				mangerJaune(snakeActif, i);
				break;
			case "bleu":
				//On multipli par 2 la vitesse du snake
				mangerBleue(snakeActif, i);
				break;
			case "maron":
				//On divise par 2 la vitesse du snake
				mangerMaron(snakeActif, i);
				
				break;
			case "violet":
				//on mange la pomme violette
				mangerViolet(snakeActif,i);
				break;
			}
		}
	}
	//on affiche le corps du snake ici
	afficherSnake(snakeActif);
	
	//Si le snake se mord la queue
	for (var i=0; i<snakeActif.positionSnake.length-2;i++){
		//test de v√©rification de si le snake se mord
		if(snakeActif.positionSnake[i] == snakeActif.positionSnake[snakeActif.positionSnake.length-1]){
			//on tue le snake
			snakeActif.mort=true;
			//on efface son corps
			effacerSnake(snakeActif, snakeActif.positionSnake.length);
			//si l'autre snake est mort, la partie se termine
			if (snakePassif.mort){
				//on calcule le score pour la victoire
				victoire();
				break;
			}
			//sinon, on fait apparaitre x pommes
			else {
				apparaitrePleinDePomme();
			}
		}
	}
	//Si le snake est sous l'effet d'un bonus
	if (snakeActif.flagBonus){
		switch(snakeActif.typeBonus){
		//cas du bonus violet
		case "violet":
			//dans ce cas, on peut manger l'autre snake
			for (var i=0; i<snakePassif.positionSnake.length;i++){
				//on regarde si il y a √©galit√©
				if(snakePassif.positionSnake[i] == positionSnakeNoir[positionSnakeNoir.length-1]){
					//on doit augmenter l'index i pour manger aussi la case du croisement, sauf si on est sur la t√™te
					if(i!=snakePassif.positionSnake.length-1){	i+=1;}
					//on efface la partie mang√©e du snake
					effacerSnake(snakePassif.positionSnake, i);
					//on d√©coupe le snale rouge
					couperSnake(snakePassif, i);
					//on ne dÈcoupe le snake qu'une seule fois, sinon ce bonus est juste trop fort
					unsetFlagBonus(snakeActif);
					//on remet le snake dans sa couleur d'origine
					changerCouleurSnake(snakeActif, "normal");
					break;
				}
			}
		}
	}
	//calcul du temps restant au malus de jeu
	if (snakeActif.flagMalus){
		snakeActif.tourMalus+=snakeActif.vitesse;
		//si le bonus prend fin
		if (snakeActif.tourMalus>=nbrTourMalus){
			//on regarde le type de bonus, pour un retour √† l'√©tat initial
			switch(snakeActif.malusType){
			
			//si c'est un bonus bleue, la vitesse doit √™tre divis√©e par 2
			case "bleu": snakeActif.vitesse *= 2;
				break;
			//si c'est un bonus maron, la vitesse doit √™tre multipli√©e par 2
			case "maron": snakeActif.vitesse= Math.ceil(snakeActif.vitesse/2);
				break;
			}
			snakeActif.malusType="";
			snakeActif.flagMalus=false;
		}
	}
	//calcul du temps restant au bonus de jeu
	if (snakeActif.flagBonus){
		snakeActif.tourBonus+=snakeActif.vitesse;
		//si le bonus prend fin
		if (snakeActif.tourBonus>=nbrTourBonus){
			//on regarde le type de bonus, pour un retour √† l'√©tat initial
			switch(snakeActif.typeBonus){
			//si c'est une pomme violette
			case "violet": changerCouleurSnake(snakeActif, "normal"); break;
			}
			unsetFlagBonus(snakeActif);
		}
	}
	//Calcul du temps restant dans un bonus final
	if (snakePassif.mort){
		snakeActif.tourFinal += snakeActif.vitesse;
		if (snakeActif.tourFinal>=nbrTourFinal){
			//lorsque le bonus se termine, la partie s'arr√™te
			clearInterval(boucle);
			//on met le nombre de vicoire
			victoire();
		}
	}
}

function avancer(snake){
	var indexTemp;
	switch (snake.directionSnake) {
	case "droite":
		indexTemp = snake.positionSnake[snake.positionSnake.length - 1].split(' ')[1];
		indexTemp = parseInt(indexTemp) + 1;
		if (parseInt(indexTemp) > largeur) {
			indexTemp = 0;
		}
		snake.positionSnake[snake.positionSnake.length - 1] = snake.positionSnake[snake.positionSnake.length - 1].split(' ')[0] + " " + indexTemp;
		snake.directionBoucle = "droite";
		break;
	case "gauche":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[1];
		indexTemp = parseInt(indexTemp) - 1;
		if (parseInt(indexTemp) < 0) {
			indexTemp = largeur;
		}
		snake.positionSnake[snake.positionSnake.length - 1] = snake.positionSnake[snake.positionSnake.length - 1].split(' ')[0] + " " + indexTemp;
		snake.directionBoucle = "gauche";
		break;
	case "haut":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[0];
		indexTemp = parseInt(indexTemp) - 1;
		if (parseInt(indexTemp) < 0) {
			indexTemp = hauteur;
		}
		snake.positionSnake[snake.positionSnake.length - 1] = indexTemp + " " + snake.positionSnake[snake.positionSnake.length - 1].split(' ')[1];
		snake.directionBoucle = "haut";
		break;
	case "bas":
		indexTemp = positionSnake[positionSnake.length - 1].split(' ')[0];
		indexTemp = parseInt(indexTemp) + 1;
		if (parseInt(indexTemp) > hauteur) {
			indexTemp = 0;
		}
		snake.positionSnake[snake.positionSnake.length - 1] = indexTemp + " " + snake.positionSnake[snake.positionSnake.length - 1].split(' ')[1];
		snake.directionBoucle = "bas";
		break;
	}
}

//d√©placement du snake noir
window.addEventListener("keydown", function(event) {
	switch (event.keyCode) {
	case 37:
		if (snakeNoir.directionBoucle != "droite") {
			snakeNoir.directionSnake = "gauche";
		}
		break;
	case 38:
		if (snakeNoir.directionBoucle != "bas") {
			snakeNoir.directionSnake = "haut";
		}
		break;
	case 39:
		if (snakeNoir.directionBoucle != "gauche") {
			snakeNoir.directionSnake = "droite";
		}
		break;
	case 40:
		if (snakeNoir.directionBoucle != "haut") {
			snakeNoir.directionSnake = "bas";
		}
		break;
	case 81:
		if (snakeRouge.directionBoucle != "droite") {
			snakeRouge.directionSnake = "gauche";
		}
		break;
	case 90:
		if (snakeRouge.directionBoucle != "bas") {
			snakeRouge.directionSnake = "haut";
		}
		break;
	case 68:
		if (snakeRouge.directionBoucle != "gauche") {
			snakeRouge.directionSnake = "droite";
		}
		break;
	case 83:
		if (snakeRouge.directionBoucle != "haut") {
			snakeRouge.directionSnake = "bas";
		}
		break;
	}
});


function afficherSnake(snake){		
	//on affiche la queue avec deux cas possible
	//si on a mang√© une pomme √† cet index
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
		//premier cas simple : on est en train de manger une pomme √† cet index
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
			//√ßa va √™tre 4 if moche, mais √ßa va marcher
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
	//on affiche la t√™te
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

function afficherVictoire(snake){
	document.getElementById(snake.nomVictoire).innerHTML=snake.victoire;
}

//cette fonction efface les "temp" premi√®res cases d'un snake
function effacerSnake(snake, temp){
	for (var j=0; j<temp; j++){
		document.getElementById(snake.positionSnake[j]).style.backgroundImage="url()";
	}
}

//fonction permettant de savoir qui a gagn√©, et de mettre √† jour le nombre de victoires
function victoire(){
	//cas d'√©galit√©
	if (snakeNoir.score==snakeRouge.score){
		//on ne fait rien, mais il faut prendre le cas d'ÈgalitÈ en compte
	} 
	//si le score noir est plus grand, le noir gagne
	else if (snakeNoir.score>snakeRouge.score){
		snakeNoir.victoire += 1;
	}
	//sinon, le rouge gagne
	else {
		snakeRouge.victoire += 1;
	}
	//maintenant, on doit mettre √† jour les victoires
	document.getElementById(snakeNoir.nomVictoire).innerHTML=snakeNoir.victoire;
	document.getElementById(snakeRouge.nomVictoire).innerHTML=snakeRouge.victoire;
	
	//on stop la boucle de jeu
	clearInterval(boucle);
}

function apparaitrePomme(type, image) {
	var ligne;
	var colonne;
	var pomme;
	var flag;
	do {
		flag = false;
		//on cr√©e al√©atoirement les coordonn√©es x et y de la nouvelle pomme
		ligne = Math.floor(Math.random() * largeur);
		colonne = Math.floor(Math.random() * hauteur);
		//on concataine pour avoir l'indexe lisible
		pomme= colonne + " " + ligne;
		//on v√©rifie que la pomme n'est pas sur le snake noir
		for (var i = 0; i<snakeNoir.positionSnake.length; i++){
			if (pomme == snakeNoir.positionSnake[i]){
				flag = true;
			}
		}
		//on v√©rifie que la pomme n'est pas sur le snake rouge
		for (var i = 0; i<snakeRouge.positionSnake.length; i++){
			if (pomme == snakeRouge.positionSnake[i]){
				flag = true;
			}
		}
		//on v√©rifie que la pomme n'est pas sur une autre pomme
		for (var i = 0; i<pommes.indexPomme.length; i++){
			if (pomme == pommes.indexPomme[i]){
				flag = true;
			}
		}
	} while (flag);
	
	pommes.type.push(type);
	pommes.indexPomme.push(pomme);
	document.getElementById(pomme).style.backgroundImage =image;
}

function apparaitrePleinDePomme(){
	for (var i = 0; i< nbrPommeFin; i++){
		//on ajoute une pomme au tableau des indexes des pommes
		apparaitrePomme("vert", "url('img/pommeVerte.png')");
	}
	//permet de savoir qu'il va y avoir un bonnus
	flagBonusFin = true;
	//on remet a zero le conteur de tour
	tourBonusFin=0;
}

function apparaitreBonus(){
	if (bonus(probaJaune)){
		apparaitrePomme("jaune", "url('img/pommeJaune.png')");
	}
	if (bonus(probaBleue)){
		apparaitrePomme("bleu", "url('img/pommeJaune.png')");
	}
	if (bonus(probaMaron)){
		apparaitrePomme("maron", "url('img/pommeJaune.png')");
	}
	if (bonus(probaViolet)){
		apparaitrePomme("violet", "url('img/pommeJaune.png')");
	}
}

//fonction permettant de savoir si on va avoir un bonus ou non
function bonus(probaBonus){
	//On a une chance sur x (valeur de proba) de retourner true
	if (Math.floor(Math.random() * probaBonus)==0){
		return true;
	}
	return false;
}


function augmenterVitesse(snake, bonusType){
	snake.vitesse -= 1;
	if ((snake.vitesse < vitesseMax)&&(bonusType!="bleue")){
		snake.vitesse = vitesseMax;
	}
}

function manger(index){
	//On enlËve la pomme de l'objet
	pommes.type.splice(index,1);
	pommes.indexPomme.splice(index,1);
}

function couperSnake(snake, index){
	//on dÈcoupe le snake
	snake.positionSnake=snake.positionSnake.splice(index, snake.positionSnake.length-index);
	snake.directionSnake=snake.directionSnake.splice(index, snake.directionSnake.length-index);
	snake.miam=snake.miam.splice(index, snake.miam.length-index);
	//On met √† jour la vitesse
	snake.vitesse+=index;
	//On met le score √† jour
	snake.score-=10*index;
	document.getElementById(snake.nomScore).innerHTML=snake.score;
}

function setFlagBonus(snake, couleur){
	snake.flagBonus=true;
	snake.tourBonus=0;
	snake.bonusType=couleur;
}

function unsetFlagBonus(snake){
	snake.flagBonus=false;
	snake.tourBonus=0;
	snake.bonusType="";
}

function setFlagMalus(snake, couleur){
	snake.flagMalus=true;
	snake.tourMalus=0;
	snake.malusType=couleur;
}

function unsetFlagMalus(snake){
	snake.flagMalus=false;
	snake.tourMalus=0;
	snake.malusType="";
}

function mangerVert(snake, index) {
	//on met le score √† jour en premier, parce qu'on en a besoin dans la fonction manger pomme
	snake.score += 10;
	//on augmente la vitesse
	augmenterVitesse(snake, "vert");
	//On enlËve la pomme de l'objet
	manger(index);
	//On test si on doit faire apparaitre une pomme bonus jaune
	apparaitreBonus();
	//on fait apparaitre une nouvelle pomme
	apparaitrePomme("vert", "url('img/pommeVerte.png')");
	//on fait grandir le snake
	snake.positionSnake.push(snake.positionSnake[snake.positionSnake.length-1]);
	snake.directionSnake.push(snake.directionBoucle);
	snake.miam.push(true);
	//ajout du nouveau score
	document.getElementById(snake.nomScore).innerHTML=snake.score;
}

function mangerJaune(snake, i){
	var temp = Math.floor(snake.positionSnake.length/2);
	//je change de couleur les premi√®res cases du snake
	effacerSnake(snake, temp);
	//on enl√®ve la pomme du tableau, et son type
	manger(i);
	//on met √† jour l'estomac du snake
	snake.miam[snake.miam.length-1]=true;
	//on dÈcoupe le snake
	couperSnake(snake, temp);
}

function mangerBleue(snake, i){
	//on enl√®ve la pomme du tableau, et son type
	manger(i);
	//on divise la vitesse par 4 si on est sous l'effet d'une pomme maron
	if (snake.malusType=="maron"){
		snake.vitesse = Math.ceil(snake.vitesse/4);
	}
	//on modifie la vitesse si on est pas sous l'effet d'un bonus bleue
	else if (snake.malusType!="bleu"){
		snake.vitesse = Math.ceil(snake.vitesse/2);
	}
	//on met √† jour l'estomac du snake
	snake.miam[snake.miam.length-1]=true;
	
	//On met √† jour le bonus
	setFlagMalus(snake, "bleu");
}

function mangerMaron(snake, i){
	//on enl√®ve la pomme du tableau, et son type
	manger(i);
	//on multiplie la vitesse par 4 si on est sous l'effet d'une pomme maron
	if (snake.malusType=="bleu"){
		snake.vitesse = snake.vitesse*4;
	}
	//on modifie la vitesse si on est pas sous l'effet d'un bonus maron
	else if (snake.malusType!="maron"){
		snake.vitesse = snake.vitesse*2;
	}
	//on met √† jour l'estomac du snake
	snake.miam[snake.miam.length-1]=true;
	//On met √† jour le bonus
	setFlagMalus(snake, "maron");
}

function mangerViolet(snake, i){
	//on enl√®ve la pomme du tableau, et son type
	manger(i);
	
	changerCouleurSnake(snake, "violet");
	setFlagBonus(snake, "violet");
}

function changerCouleurSnake(snake, couleur){
	//on change la couleur du snake, et c'est pas la mÍme si on est le snake Noir ou Rouge
	if (snake.couleur=="noir"){
		switch(couleur){
		case "violet": snake.snakeBody=snakeNoirViolet; break;
		case "normal": snake.snakeBody=snakeNoir; break;
		}
	} else {
		switch(couleur){
		case "violet": snake.snakeBody=snakeRougeViolet; break;
		case "normal": snake.snakeBody=snakeRouge; break;
		}
	}
}