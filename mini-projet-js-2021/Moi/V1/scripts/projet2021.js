//**démarage du jeux */

window.onload = function(){
	startGame()
};



var myGamePiece;
var myObstacle;

/**regrader https://www.youtube.com/watch?v=mwl95yvl-n0 */
//**situation initiale */
/**if bouton précé alors cré un myObstacle en aléa */
function startGame() {
    myGamePiece = new component(40, 40, "images/vaisseau-ballon-petit.png", 10, 120);
    myObstacle = new component(48, 48, "images/flyingSaucer-petit.png", 300, 120);
    myGameArea.start();
}


//*zone de jeu*/
var myGameArea = {
    canvas : document.getElementById("stars"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //**Mise ajour toute les 20 miliseconde 50fps*/
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

/**Ajout de composent, création d'un composent*/
/**essayer de re crée une fonction avec des composents comme celle la mais pour les soucoupes 
/** du coup essayer de crée le vaisseau en dur pas comme la fonction */
/**tout crée manuelement vu que le veseau reste toujour ici ! */
/**comme ca on a juste a lancé cette fonction quand on click sur le bouton pour les soucoupe */
/**le tout avec des valeurs aléa et voila !! */
function component(largeur, hauteur, src, x, y) {
    this.image = new Image();
    this.image.src = src;
    this.width = largeur
    this.height = hauteur;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

}


//*mise a jours des frames */
//* ne pas essaye de mettre ici ue condition pour crée la soucoupe avec le bouton marche pas*/
function updateGameArea() {
    myGameArea.clear();
    myObstacle.x += -2;
    myObstacle.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys [38]) {myGamePiece.speedY = -4; }
    if (myGameArea.keys && myGameArea.keys [40]) {myGamePiece.speedY = 4; }
    myGamePiece.newPos();    
    myGamePiece.update();
    
}