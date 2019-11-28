var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d'); 

//IMAGENES
var fondo;



// CREAR EL OBJETO DE LA NAVE
 var nave = {
   x: 100,
   y: canvas.height-100,//El alto del canvas - 100px
   width: 50,
   height: 50
 }


// Trae la imagen y llama al frameloop que a su vez llama la función para dibujar el fondo.
function loadMedia() {
  fondo = new Image();
  fondo.src = 'space.jpg';
  fondo.onload = function(){
    var intervalo = window.setInterval(frameLoop, 1000/55);
  }
}

//DIBUJA EL FONDO
function dibujarFondo() {
  ctx.drawImage(fondo, 0, 0);
}

function dibujarNave() {
  //Guarda un punto en la pila del contexto(checkpoint, guarda la información actual que posee).
  ctx.save();
  ctx.fillStyle= 'white'; //Pinta de blanco
  ctx.fillRect(nave.x, nave.y, nave.width, nave.height );//Dibujamos un rectangulo(x,y,ancho,alto)
}

//Se encarga de actualizar todas las posiciones de los jugadores y va a redibujar cada
// uno de los elementos del juego para el movimiento, además de dibujar el background.
function frameLoop() {
 dibujarFondo();
 dibujarNave();
}

loadMedia();