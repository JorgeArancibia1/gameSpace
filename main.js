var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d'); 

//IMAGENES
var fondo;





function loadMedia() {
  fondo = new Image();
  fondo.src = 'space.jpg';
  fondo.onload = function(){
    var intervalo = window.setInterval(frameLoop, 1000/55);
  }
}


function drawBackground() {
  ctx.drawImage(fondo, 0, 0);
}

//Se encarga de actualizar todas las posiciones de los jugadores y va a redibujar cada
// uno de los elementos del juego para el movimiento, además de dibujar el background.
function frameLoop() {
 drawBackground();
}

loadMedia();