//démarage du jeux 
window.onload = function(){
	startGame()
};

//définition des variables
var myGamePiece;
var bullets = [];
var saucers = [];

var canShoot = true;
var spawner;
var areArriving = false;
var speedSaucer = 2;

//fonction démmarge du jeux
function startGame() {
	myGameArea.start();
	myGamePiece = new component(40, 40, "images/vaisseau-ballon-petit.png", 40, myGameArea.canvas.height/2);
}


//Zonne de jeux (parametre du canvas)
var myGameArea = {
    canvas : document.getElementById("stars"),
		score : document.getElementById("score"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 15); //Mise ajour toute les 15 miliseconde plus de 60fps*/
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
          })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //* Une fois mise a jour on suprime tout*/
    }
}

//Création des composents avec des parametres
function component(largeur, hauteur, src, x, y) {
    this.image = new Image();
    this.image.src = src;
    this.width = largeur;
    this.height = hauteur;
    this.x = x;
    this.y = y;
		this.speedX = 0;
		this.speedY = 0;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
    }
	//Nouvelle position
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
		//Verification des colisions
		this.collides = function(object){
			if(this.x + this.width >= object.x && this.x <= object.x + object.width &&
				 this.y + this.height >= object.y && this.y <= object.y + object.height){
					 return true;
				 }
			return false;
		}
}


//Mise a jour de la zone de jeux
function updateGameArea() {
  myGameArea.clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  Input();
  myGamePiece.newPos();
  myGamePiece.update();
  
	//Verification des soucoupe qui sorte du canvas
	for(let i = 0; i < saucers.length; i++){
		saucers[i].x -= speedSaucer;
	  saucers[i].update();

		if(saucers[i].x + saucers[i].width < 0){
			saucers.splice(i, 1);
			i--;

			let currScore = parseInt(myGameArea.score.innerHTML);
			//Perte de point
			myGameArea.score.innerHTML = (currScore - 1000) < 0 ? 0 : (currScore - 1000);

			continue;
		}
	}

	for(let i = 0; i < bullets.length; i++){
		bullets[i].newPos();
		bullets[i].update();

		if(bullets[i].x > myGameArea.canvas.width){
			bullets.splice(i,1);
			i--;
			continue;
		}

		//Si une soucoupe est touché +200 point 
		//Et augmentation de la vitesse du jeux si le score dépasse 1000 puis 5000
		for(let j = 0; j < saucers.length; j++){
			if(bullets[i].collides(saucers[j])){
				bullets.splice(i,1);
				i--;
				saucers.splice(j,1);
				j--;

				let currScore = parseInt(myGameArea.score.innerHTML);
				myGameArea.score.innerHTML = currScore + 200;
				if (document.getElementById("score").innerHTML >= 5000 ){
					speedSaucer = 6;
				}else if (document.getElementById("score").innerHTML >= 1000){
					speedSaucer = 4;
				}
				else{
					speedSaucer = 2;
				}
				break;
			}
		}

	}

}

//Vérification de la pressoin des touches
function Input(){
	if(myGameArea.keys){
		//Monter
		if (myGameArea.keys [38]) {
			if(myGamePiece.y >= 0) myGamePiece.speedY = -4;
		}
		//Décendre
		if (myGameArea.keys [40]) {
			if(myGamePiece.y + myGamePiece.height <= myGameArea.canvas.height) myGamePiece.speedY = 4;
		}
		//Tir
		if(myGameArea.keys[32]){
			if(canShoot){
				canShoot = false;
				let bul = new component(50, 10, "images/tir.png", myGamePiece.x + myGamePiece.width, myGamePiece.y + myGamePiece.height/2);
				bullets.push(bul);
				bullets[bullets.length-1].speedX = 8;
			}
		} else canShoot = true;
	}
}

// Bouton soucoupe simple
function newSaucer(){
	saucers.push(new component(48, 48, "images/flyingSaucer-petit.png", 900, Math.ceil(Math.random() * (myGameArea.canvas.height-48))));
	var MonCanvas = document.getElementById('stars');		//Focus les canvas (pour ne pas cliqué sur le bouton a chaque tir
	MonCanvas.setAttribute('tabindex','0');
	MonCanvas.focus();
}

//Ajout d'un spawner (bouton crée des soucopes "a l'infini") et peut etre activé ou désactivé
function modifySpawner(){
	if(!areArriving){
		areArriving = true;
		document.getElementById("spawner").innerHTML = "ON";
		document.getElementById("spawner").style.color = "green";
		spawner = setInterval(() =>{
				if(Math.random() < 0.5) newSaucer(); // 50% de chance de faire apparaitre une soucoupe ennemis 
		}, 750);
	} else{
		areArriving = false;
		document.getElementById("spawner").innerHTML = "OFF";
		document.getElementById("spawner").style.color = "red";
		clearInterval(spawner);
	}
	//Focus les canvas (pour ne pas cliqué sur le bouton a chaque tir
	var MonCanvas = document.getElementById('stars');
	MonCanvas.setAttribute('tabindex','0');
	MonCanvas.focus();
}
