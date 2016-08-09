//alert('Welcome to the best snake game in the world !');

//Variables a modifier pour changer les paramètres du snake
//Hauteur de la grille
var hauteur = 30;
//Largeure de la grille
var largeur = 30;
//vitesse maximum
var vitesseMax=50;
//vitesse initiale + 1 (car lors de la création de la première pomme, on perd 1 en vitesse)
var vitesseRouge=100; //vitesse du snake rouge
var vitesseNoir=100; //vitesse du snake noir
//nombre de pommes a faire apparaitre à la mort du premier snake
var nbrPomme = 19;
var nbrTour = 100; //durée du bonus final en nombre de tour
var nbrTourBonus = 100; //durée des bonus classiques en nombre de tour
var probaJaune = 10;//Probabilité d'apparition d'une pomme jaune
var probaBleue = 10; //Probabilité d'apparition d'une pomme bleue
var probaMaron = 2; //Probabilité d'apparition d'une pomme maron
var probaMaron = 10; //Probabilité d'apparition d'une pomme maron




//Création des variables nécessaires au bon fonctionnement du code
var directionNoir;
var directionRouge;
//Position des snakes grace à leurs indexes
var positionSnakeNoir = new Array();
var positionSnakeRouge = new Array();
//tableau contenant la direction des cases des snakes
var directionSnakeNoir = new Array();
var directionSnakeRouge = new Array();
//tableau permettant de savoir si le snake a mangé une pomme à un index donné (true s'il a mangé, false sinon)
var miamNoir = new Array();
var miamRouge = new Array();
//tableau contenant les images du snake noir (parce que c'est quand même plus joli
var snakeBodyNoir = ["url('img/queueDroiteNoir.png')","url('img/queueGaucheNoir.png')","url('img/queueHautNoir.png')","url('img/queueBasNoir.png')",
                     "url('img/teteNoirDroite.png')","url('img/teteNoirGauche.png')","url('img/teteNoirHaute.png')","url('img/teteNoirBas.png')",
                     "url('img/corpDroiteNoir.png')","url('img/corpHautNoir.png')",
                     "url('img/corpHautDroiteNoir.png')","url('img/corpGaucheHautNoir.png')","url('img/corpBasDroiteNoir.png')","url('img/corpBasGaucheNoir.png')",
                     "url('img/miamNoir.png')"];
var snakeBodyRouge = ["url('img/queueDroiteRouge.png')","url('img/queueGaucheRouge.png')","url('img/queueHautRouge.png')","url('img/queueBasRouge.png')",
                     "url('img/teteRougeDroite.png')","url('img/teteRougeGauche.png')","url('img/teteRougeHaute.png')","url('img/teteRougeBas.png')",
                     "url('img/corpDroiteRouge.png')","url('img/corpHautRouge.png')",
                     "url('img/corpHautDroiteRouge.png')","url('img/corpGaucheHautRouge.png')","url('img/corpBasDroiteRouge.png')","url('img/corpBasGaucheRouge.png')",
                     "url('img/miamRouge.png')"];
var indexPomme = new Array(); //tableau contenant les indexes des différentes pommes
var typePomme = new Array(); //tableau permettant d'avoir le type de pomme, pour gérer les bonus
var indexTemp;
var indexTete;
var directionBoucleNoir;
var directionBoucleRouge;
var scoreNoir=0;
var scoreRouge=0;
var flagN; //true si le snake noir meurt
var flagR; //true si le snake rouge meurt
var scorenoir = "scorenoir"; //permet d'écrire dans la div score dans une fonction
var scorerouge = "scorerouge"; //permet d'écrire dans la div score dans une fonction
var couleurNoir = "black"; //permet d'utiliser les couleurs dans les fonctions
var couleurRouge = "red"; //permet d'utiliser les couleurs dans les fonctions
var pomme; //index de la pomme dans la fonction
var flagBonus; //permet de savoir 
var tour; //conteur pour savoir où on se situe dans le nombre de tours
var tmp; //varible temporaire pour effectuer les calculs
var victoireNoir =0; //nombre de victoires noires
var victoireRouge =0; //nombre de victoires rouges
var flagFristGame = false; //permet de savoir si c'est la première partie, pour l'initialisation des variables
var boucleNoir; //boucle de jeu noir
var boucleRouge; //boucle de jeu rouge
var flagBonusN; //permet de savoir si le snake noir est sous l'effet d'un bonus
var flagBonusR; //permet de savoir si le snake rouge est sous l'effet d'un bonus
var tourBonusN; //permet de savoir pendant combien de tour le bonus noir va continuer
var tourBonusR; //permet de savoir pendant combien de tour le bonus rouge va continuer
var bonusTypeN; //type de bonus (blueu, violet, marron...) pour le snake noir
var bonusTypeR; //type de bonus (blueu, violet, marron...) pour le snake rouge

//création du snake
positionSnakeNoir = [ "1 1", "1 2", "1 3" ];
positionSnakeRouge = [ "10 1", "10 2", "10 3" ];
//initialisation de la direction
directionSnakeNoir=["droite", "droite", "droite"];
directionSnakeRouge=["droite", "droite", "droite"];
//initialisation de l'estoma ;p
miamNoir=[false, false, false];
miamRouge=[false, false, false];

//initialisation des scores
document.getElementById("scorenoir").innerHTML=scoreNoir;
document.getElementById("scorerouge").innerHTML=scoreRouge;
document.getElementById("victoirenoir").innerHTML=victoireNoir;
document.getElementById("victoirerouge").innerHTML=victoireRouge;

// Création du tableau pour le snake
var table = document.getElementById(("table"));
table.style.backgroundColor = "#87CEFA";
table.cellSpacing="0px";
//table.cellSpacing = "0px";
for (var i = 0; i <= largeur+1; i++) {
	var row = document.createElement("tr");
	for (var j = 0; j <= hauteur+1; j++) {
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

//quand on appui sur New Game
submit.onclick = function newGame(){
	//nettoyage de la partie précédante
	scoreNoir=0;
	scoreRouge=0;
	//on reinitialise les vitesses
	vitesseRouge=100;
	vitesseNoir=100;
	//on enlève les bonus
	flagBonusN=false;
	flagBonusR=false;
	tourBonusN = 0;
	tourBonusR = 0;
	bonusTypeN="";
	bonusTypeR="";
	flagBonus=false;
	tour=0;
	//on rend les snake vivant
	flagN=false;
	flagR=false;
	
	if (flagFristGame){
		//on ferme les boucles de jeu
		clearInterval(boucleNoir);
		clearInterval(boucleRouge);
		//on supprime les images des snakes et pommes
		for(var i=0; i<positionSnakeNoir.length; i++){
			document.getElementById(positionSnakeNoir[i]).style.backgroundImage = "url()";
		}
		for(var i=0; i<positionSnakeRouge.length; i++){
			document.getElementById(positionSnakeRouge[i]).style.backgroundImage = "url()";
		}
		for(var i=0; i<indexPomme.length; i++){
			document.getElementById(indexPomme[i]).style.backgroundImage = "url()";
		}
		indexPomme = new Array();
		typePomme = new Array();
	}
	//création du snake
	positionSnakeNoir = [ "1 1", "1 2", "1 3" ];
	positionSnakeRouge = [ "10 1", "10 2", "10 3" ];
	//initialisation de la direction
	directionSnakeNoir=["droite", "droite", "droite"];
	directionSnakeRouge=["droite", "droite", "droite"];
	//On met à jour la direction de la boucle
	directionNoir = "droite";
	directionRouge = "droite";
	directionBoucleNoir = "droite";
	directionBoucleRouge = "droite";
	//initialisation de l'estoma ;p
	miamNoir=[false, false, false];
	miamRouge=[false, false, false];
	
	//initialisation des scores
	document.getElementById("scorenoir").innerHTML=scoreNoir;
	document.getElementById("scorerouge").innerHTML=scoreRouge;
	//création des snakes dans le tableau
	document.getElementById(positionSnakeNoir[0]).style.backgroundImage = "url('img/queueDroiteNoir.png')";
	document.getElementById(positionSnakeNoir[1]).style.backgroundImage = "url('img/corpDroiteNoir.png')";
	document.getElementById(positionSnakeNoir[2]).style.backgroundImage = "url('img/teteNoirDroite.png')";
	
	document.getElementById(positionSnakeRouge[0]).style.backgroundImage = "url('img/queueDroiteRouge.png')";
	document.getElementById(positionSnakeRouge[1]).style.backgroundImage = "url('img/corpDroiteRouge.png')";
	document.getElementById(positionSnakeRouge[2]).style.backgroundImage = "url('img/teteRougeDroite.png')";
	
	//faire apparaitre une pomme:
	indexPomme[0] = apparaitrePomme("url('img/pommeVerte.png')");
	typePomme[0] = "vert";
	
	//boucles de jeu
	boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir); //boucle de jeu du snake noir
	boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge); //boucle de jeu du snake rouge
	
	flagFristGame=true //la partie commence, donc ce n'est plus la première
}

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

function deplacementSnakeNoir() {
	//on déplace d'abord le snake
	directionBoucleNoir = avancer(positionSnakeNoir, directionNoir, directionSnakeNoir, miamNoir);
	
	//On regarde si le snake mange une pomme
	for (var i = 0; i<indexPomme.length; i++){
		if (positionSnakeNoir[positionSnakeNoir.length-1] == indexPomme[i]){
			//on regarde le type de pomme qu'on mange
			switch(typePomme[i]){
			//si on mange une pomme verte
			case "vert":
				//on met le score à jour en premier, parce qu'on en a besoin dans la fonction manger pomme
				scoreNoir = scoreNoir + 10;
				//on augmente la vitesse
				vitesseNoir = augmenterVitesse(vitesseNoir, bonusTypeN);
				//on utilise la fonction manger une pomme
				indexPomme[i] = mangerPomme(positionSnakeNoir, scoreNoir, scorenoir, directionSnakeNoir, directionBoucleNoir,miamNoir);
				//On met a jour le type de pomme
				typePomme[i] = "vert";
				//On test si on doit faire apparaitre une pomme bonus jaune
				apparaitreBonus();
				//On réinitialise la boucle du snake avec la nouvelle vitesse
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				break;
				//Si on mange une pomme jaune : un perd des points, de la taille et de la vitesse
			case "jaune":
				//je stock l'index de la moitié du snake
				tmp = mangerJaune(positionSnakeNoir, directionSnakeNoir, miamNoir, i);
				positionSnakeNoir=positionSnakeNoir.splice(tmp, positionSnakeNoir.length-tmp);
				directionSnakeNoir=directionSnakeNoir.splice(tmp, directionSnakeNoir.length-tmp);
				miamNoir=miamNoir.splice(tmp, miamNoir.length-tmp);
				//On met le score à jour
				scoreNoir=scoreNoir-10*tmp;
				document.getElementById(scorenoir).innerHTML=scoreNoir;
				//On met à jour la vitesse
				vitesseNoir=vitesseNoir+tmp;
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				break;
			case "bleue":
				//On multipli par 2 la vitesse du snake
				vitesseNoir = mangerBleue(vitesseNoir, bonusTypeN, i, miamNoir);
				//On met à jour la vitesse
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				//On met à jour le bonus
				flagBonusN=true;
				tourBonusN=0;
				bonusTypeN="bleue";
				break;
			case "maron":
				//On divise par 2 la vitesse du snake
				vitesseNoir = mangerMaron(vitesseNoir, bonusTypeN, i, miamNoir);
				//On met à jour la vitesse
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				//On met à jour le bonus
				flagBonusN=true;
				tourBonusN=0;
				bonusTypeN="maron";
				break;
			}
		}
	}
	//on affiche le corps du snake ici
	afficherSnake(positionSnakeNoir, directionSnakeNoir, miamNoir, snakeBodyNoir);
	
	//Si le snake se mord la queue
	for (var i=0; i<positionSnakeNoir.length-2;i++){
		//test de vérification de si le snake se mord
		if(positionSnakeNoir[i] == positionSnakeNoir[positionSnakeNoir.length-1]){
			flagN=true;
			for (var j=0; j<positionSnakeNoir.length;j++){
				document.getElementById(positionSnakeNoir[j]).style.backgroundImage="url()";
			}
			//dans tous les cas, on arrête la boucle de jeu
			clearInterval(boucleNoir);
			//si le snake rouge est mort, la partie se termine
			if (flagR){
				//on calcule le score pour la victoire
				victoire();
				alert("Vous avez perdu :'(");
				break;
			}
			//sinon, on fait apparaitre x pommes
			else {
				apparaitrePleinDePomme();
			}
		}
	}
	//calcul du temps restant au bonus de jeu
	if (flagBonusN){
		tourBonusN++;
		//si le bonus prend fin
		if (tourBonusN==nbrTourBonus){
			//on regarde le type de bonus, pour un retour à l'état initial
			switch(bonusTypeN){
			
			//si c'est un bonus bleue, la vitesse doit être divisée par 2
			case "bleue": vitesseNoir = vitesseNoir*2;
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				break;
			//si c'est un bonus maron, la vitesse doit être multipliée par 2
			case "maron": vitesseNoir = Math.ceil(vitesseNoir/2);
				clearInterval(boucleNoir);
				boucleNoir = setInterval(deplacementSnakeNoir, vitesseNoir);
				break;
			}
			bonusTypeN="";
			flagBonusN=false;
		}
	}
	//Calcul du temps restant dans un bonus final
	if (flagBonus){
		tour++;
		if (tour==nbrTour){
			//lorsque le bonus se termine, la partie s'arrête
			clearInterval(boucleNoir);
			//on met le nombre de vicoire
			victoire();
			alert("La partie est terminée :D");
		}
	}
}
	
function deplacementSnakeRouge(){
	//on déplace d'abord le snake
	directionBoucleRouge = avancer(positionSnakeRouge, directionRouge, directionSnakeRouge, miamRouge);
	
	//si on est sur une pomme (il peut y en avoir plusieurs)
	for (var i = 0; i<indexPomme.length; i++){
		if (positionSnakeRouge[positionSnakeRouge.length-1] == indexPomme[i]){
			//on regarde le type de pomme qu'on mange
			switch(typePomme[i]){
			//si on mange une pomme verte
			case "vert":
				//on met le score à jour en premier, parce qu'on en a besoin dans la fonction manger pomme
				scoreRouge = scoreRouge + 10;
				//on augmente la vitesse
				vitesseRouge = augmenterVitesse(vitesseRouge, bonusTypeR);
				//on fait apparaitre une nouvelle pomme
				indexPomme[i] = mangerPomme(positionSnakeRouge, scoreRouge, scorerouge, directionSnakeRouge, directionBoucleRouge,miamRouge);
				//On met a jour le type de pomme
				typePomme[i] = "vert";
				//On test si on doit faire apparaitre une pomme bonus jaune
				apparaitreBonus();
				//on réinitialise la boucle avec la nouvelle vitesse
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge, i);
				break;
			case "jaune":
				//je stock l'index de la moitié du snake
				tmp = mangerJaune(positionSnakeRouge, directionSnakeRouge, miamRouge, i);
				//je réduit la taille du snake
				positionSnakeRouge=positionSnakeRouge.splice(tmp, positionSnakeRouge.length-tmp);
				directionSnakeRouge=directionSnakeRouge.splice(tmp, directionSnakeRouge.length-tmp);
				miamRouge=miamRouge.splice(tmp, miamRouge.length-tmp);
				//On met le score à jour
				scoreRouge=scoreRouge-10*tmp;
				document.getElementById(scorerouge).innerHTML=scoreRouge;
				//On met à jour la vitesse
				vitesseRouge=vitesseRouge+tmp;
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge);
				break;
			case "bleue":
				//On multipli par 2 la vitesse du snake
				vitesseRouge = mangerBleue(vitesseRouge, bonusTypeR, i, miamRouge);
				//On met à jour la vitesse
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge);
				//On met à jour le bonus
				flagBonusR=true;
				tourBonusR=0;
				bonusTypeR="bleue";
				break;
			case "maron":
				//On multipli par 2 la vitesse du snake
				vitesseRouge = mangerMaron(vitesseRouge, bonusTypeR, i, miamRouge);
				//On met à jour la vitesse
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge);
				//On met à jour le bonus
				flagBonusR=true;
				tourBonusR=0;
				bonusTypeR="maron";
				break;
			}
		}
	}
	//on affiche le corps du snake ici
	afficherSnake(positionSnakeRouge, directionSnakeRouge, miamRouge, snakeBodyRouge);
	
	//Si le snake se mord la queue
	for (var i=0; i<positionSnakeRouge.length-2;i++){
		if(positionSnakeRouge[i] == positionSnakeRouge[positionSnakeRouge.length-1]){
			flagR=true;
			clearInterval(boucleRouge);
			for (var j=0; j<positionSnakeRouge.length;j++){
				document.getElementById(positionSnakeRouge[j]).style.backgroundImage="url()";
			}
			//si l'autre snake est deja mort, on arrête le jeu
			if (flagN){
				victoire();
				alert("Vous avez perdu :'(");
				break;
			}
			//sinon, on fait apparaitre x pommes
			else {
				apparaitrePleinDePomme();
			}
		}
	}
	//calcul du temps restant au bonus de jeu
	if (flagBonusR){
		tourBonusR++;
		//si le bonus prend fin
		if (tourBonusR==nbrTourBonus){
			//on regarde le type de bonus, pour un retour à l'état initial
			switch(bonusTypeR){
			
			//si c'est un bonus bleue, la vitesse doit être divisée par 2
			case "bleue":vitesseRouge = vitesseRouge*2;
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge);
				flagBonusR=false;
				break;
			//si c'est un bonus maron, la vitesse doit être multipliée par 2
			case "maron": vitesseRouge = Math.ceil(vitesseRouge/2);
				clearInterval(boucleRouge);
				boucleRouge = setInterval(deplacementSnakeRouge, vitesseRouge);
				flagBonusR=false;
				break;
			}
			bonusTypeR="";
			flagBonusR=false;
		}
	}
	//Calcul du temps restant dans un bonus final
	if (flagBonus){
		tour++;
		if (tour==nbrTour){
			clearInterval(boucleRouge);
			victoire()
			alert("La partie est terminée :D");
		}
	}
	
}

function avancer(positionSnake, direction, directionSnake, miam){
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
	
	//on efface la queue du snake avant de réorganiser le tableau
	document.getElementById(positionSnake[0]).style.backgroundImage = "url()";
	//on réorganise le tableau pour le déplacement, la direction et l'estomac
	for (var i=0; i<positionSnake.length-1;i++){
		positionSnake[i] = positionSnake[i+1];
		directionSnake[i] = directionSnake[i+1];
		miam[i]=miam[i+1];
	}
	//on met à jour la tête
	positionSnake[positionSnake.length-1] = indexTete;
	directionSnake[directionSnake.length-1] = directionBoucle;
	miam[miam.length-1]=false;
	
	return directionBoucle
}


function afficherSnake(positionSnake, directionSnake, miam, snakeBody){		
	//on affiche la queue avec deux cas possible
	//si on a mangé une pomme à cet index
	if (miam[0]){
		document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[14];
	} //il faut prendre en compte la rotation de la queue
	else if(directionSnake[0]!=directionSnake[1]){ 
		switch(directionSnake[1]){
		case "droite": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[0]; break;
		case "gauche": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[1]; break;
		case "haut": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[2]; break;
		case "bas": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[3]; break;
		}
	}
	
	else { //sinon, il faut afficher la queue dans le bon sens
		switch(directionSnake[0]){
		case "droite": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[0]; break;
		case "gauche": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[1]; break;
		case "haut": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[2]; break;
		case "bas": document.getElementById(positionSnake[0]).style.backgroundImage = snakeBody[3]; break;
		}
	}
	//Le reste du corps, c'est la merde...
	for (var i=1; i<positionSnake.length-1;i++){
		//premier cas simple : on est en train de manger une pomme à cet index
		if (miam[i]){
			document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[14];
		} else //sinon, on regarde s'il n'a a pas de changement de direction
		if (directionSnake[i+1]==directionSnake[i]){ 
			switch(directionSnake[i]){
			case "droite":
			case "gauche": document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[8]; break;
			case "haut":
			case "bas": document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[9]; break;
			}
		}
		//sinon, il faut faire un coin
		else {
			//ça va être 4 if moche, mais ça va marcher
			if ((directionSnake[i+1]=="haut")&&(directionSnake[i]=="droite")||(directionSnake[i+1]=="gauche")&&(directionSnake[i]=="bas")){
				document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[11];
			} else
			if ((directionSnake[i+1]=="haut")&&(directionSnake[i]=="gauche")||(directionSnake[i+1]=="droite")&&(directionSnake[i]=="bas")){
				document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[10];
			}else
			if ((directionSnake[i+1]=="bas")&&(directionSnake[i]=="gauche")||(directionSnake[i+1]=="droite")&&(directionSnake[i]=="haut")){
				document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[12];
			} else {
				document.getElementById(positionSnake[i]).style.backgroundImage = snakeBody[13];
			}
		}
	}
	//on affiche la tête
	switch(directionSnake[directionSnake.length-1]){
	case "droite": document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundImage = snakeBody[4]; break;
	case "gauche": document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundImage = snakeBody[5]; break;
	case "haut": document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundImage = snakeBody[6]; break;
	case "bas": document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundImage = snakeBody[7]; break;
	}
}



function mangerPomme(positionSnake, score, nomScore, directionSnake, directionBoucle, miam) {
	//on efface l'image de la pomme
	document.getElementById(positionSnake[positionSnake.length-1]).style.backgroundImage = "url()";
	//on fait apparaitre une nouvelle pomme
	pomme = apparaitrePomme("url('img/pommeVerte.png')");
	//on fait grandir le snake
	positionSnake.push(positionSnake[positionSnake.length-1]);
	directionSnake.push(directionBoucle);
	miam.push(true);
	//ajout du nouveau score
	document.getElementById(nomScore).innerHTML=score;
	return pomme;
}

function mangerJaune(positionSnake, directionSnake,miam, i){
	var temp = Math.floor(positionSnake.length/2);
	//je change de couleur les premières cases du snake
	for (var j=0; j<temp; j++){
		document.getElementById(positionSnake[j]).style.backgroundImage="url()";
	}
	//on enlève la pomme du tableau, et son type
	indexPomme.splice(i, 1);
	typePomme.splice(i, 1);
	//on met à jour l'estomac du snake
	miam[miam.length-1]=true;
	return temp
}

function mangerBleue(vitesse, bonusType, i, miam){
	//on enlève la pomme du tableau, et son type
	indexPomme.splice(i, 1);
	typePomme.splice(i, 1);
	//on divise la vitesse par 4 si on est sous l'effet d'une pomme maron
	if (bonusType=="maron"){
		vitesse = Math.ceil(vitesse/4);
	}
	//on modifie la vitesse si on est pas sous l'effet d'un bonus bleue
	else if (bonusType!="bleue"){
		vitesse = Math.ceil(vitesse/2);
	}
	//on met à jour l'estomac du snake
	miam[miam.length-1]=true;
	return vitesse;
}

function mangerMaron(vitesse, bonusType, i, miam){
	//on enlève la pomme du tableau, et son type
	indexPomme.splice(i, 1);
	typePomme.splice(i, 1);
	//on multiplie la vitesse par 4 si on est sous l'effet d'une pomme maron
	if (bonusType=="bleue"){
		vitesse = vitesse*4;
	}
	//on modifie la vitesse si on est pas sous l'effet d'un bonus maron
	else if (bonusType!="maron"){
		vitesse = vitesse*2;
	}
	//on met à jour l'estomac du snake
	miam[miam.length-1]=true;
	return vitesse;
}

function apparaitrePleinDePomme(){
	for (var i = 0; i< nbrPomme; i++){
		//on ajoute une pomme au tableau des indexes des pommes
		indexPomme.push(apparaitrePomme("url('img/pommeVerte.png')"));
		//On met a jour le type de pomme
		typePomme.push("vert");
		//permet de savoir qu'il va y avoir un bonnus
		flagBonus = true;
		//on remet a zero le conteur de tour
		tour=0;
	}
}

function augmenterVitesse(vitesse, bonusType){
	vitesse = vitesse - 1;
	if ((vitesse < vitesseMax)&&(bonusType!="bleue")){
		vitesse = vitesseMax;
	}
	return vitesse;
}

function apparaitrePomme(image) {
	var ligne;
	var colonne;
	var flag = false;
	do {
		flag = false;
		//on crée aléatoirement les coordonnées x et y de la nouvelle pomme
		ligne = Math.floor(Math.random() * largeur);
		colonne = Math.floor(Math.random() * hauteur);
		//on concataine pour avoir l'indexe lisible
		pomme= colonne + " " + ligne;
		//on vérifie que la pomme n'est pas sur le snake noir
		for (var i = 0; i<positionSnakeNoir.length; i++){
			if (pomme == positionSnakeNoir[i]){
				flag = true;
			}
		}
		//on vérifie que la pomme n'est pas sur le snake rouge
		for (var i = 0; i<positionSnakeRouge.length; i++){
			if (pomme == positionSnakeRouge[i]){
				flag = true;
			}
		}
		//on vérifie que la pomme n'est pas sur une autre pomme
		for (var i = 0; i<indexPomme.length; i++){
			if (pomme == indexPomme[i]){
				flag = true;
			}
		}
	} while (flag);
	
	
	document.getElementById(pomme).style.backgroundImage =image;
	return pomme;
}

//fonction permettant de savoir qui a gagné, et de mettre à jour le nombre de victoires
function victoire(){
	//cas d'égalité
	if (scoreNoir==scoreRouge){
		//on ne fait rien, mais il faut prendre ce cas en compte
	} 
	//si le score noir est plus grand, le noir gagne
	else if (scoreNoir>scoreRouge){
		victoireNoir += 1;
	}
	//sinon, le rouge gagne
	else {
		victoireRouge += 1;
	}
	//maintenant, on doit mettre à jour les victoires
	document.getElementById("victoirenoir").innerHTML=victoireNoir;
	document.getElementById("victoirerouge").innerHTML=victoireRouge;
}


function apparaitreBonus(){
	if (bonus(probaJaune)){
		indexPomme.push(apparaitrePomme("url('img/pommeJaune.png')"));
		typePomme.push("jaune");
	}
	if (bonus(probaBleue)){
		indexPomme.push(apparaitrePomme("url('img/pommeBleue.png')"));
		typePomme.push("bleue");
	}
	if (bonus(probaMaron)){
		indexPomme.push(apparaitrePomme("url('img/pommeMaron.png')"));
		typePomme.push("maron");
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