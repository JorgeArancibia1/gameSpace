var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

//IMAGENES
var fondo;

//CREAMOS OBJETO TECLADO VACÍO.
var teclado = {};
//ARRAY PARA LOS DISPAROS.
var disparos = [];
//ARREGLO PARA ENEMIGOS.
var enemigos = [];


// CREAR EL OBJETO DE LA NAVE
var nave = {
  x: 100,
  y: canvas.height - 100,//El alto del canvas - 100px
  width: 50,
  height: 50
}

var juego = {
  estado: 'iniciando'
}

// Trae la imagen y llama al frameloop que a su vez llama la función para dibujar el fondo.
function loadMedia() {
  fondo = new Image();
  fondo.src = 'space.jpg';
  fondo.onload = function () {
    var intervalo = window.setInterval(frameLoop, 1000 / 55);
  }
}

function dibujarEnemigos() {
  for (let i in enemigos) {
    var enemigo = enemigos[i];
    ctx.save();
    if (enemigo.estado == 'vivo') ctx.fillStyle = 'red';
    if (enemigo.estado == 'muerto') ctx.fillStyle = 'black';
    ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height);
  }
}

//DIBUJA EL FONDO
function dibujarFondo() {
  ctx.drawImage(fondo, 0, 0);
}

function dibujarNave() {
  //Guarda un punto en la pila del contexto(checkpoint, guarda la información actual que posee).
  ctx.save();
  ctx.fillStyle = 'white'; //Pinta de blanco
  ctx.fillRect(nave.x, nave.y, nave.width, nave.height);//Dibujamos un rectangulo(x,y,ancho,alto)
}

function agregarEventosTeclado() {
  //Ejecutamos la función agregarEventos
  //Lo que hace esta en particular es agregar el numero de codigo de tecla al objeto "teclado" y lo va a colocar en "true" (teclado[32] = true;)
  agregarEvento(document, "keydown", function (e) { //Agregamos al documento el evento keydown, que cuando se presione una tecla se ejecuta la función.
    teclado[e.keyCode] = true; //Va a tomar el objeto del teclado y va a agregar como clave del evento el keyCode("Codigo que identifica la tecla presionada").
  });//Es como representar "teclado.n = true"(tecla n° x encendida)

  //PARA DEJAR EN FALSO LA TECLA QUE DEJÓ DE SER PRESIONADA.
  agregarEvento(document, "keyup", function (e) {
    teclado[e.keyCode] = false;
  });

  //Programamos la función agregarEventos
  function agregarEvento(elemento, nombreEvento, funcion) {
    if (elemento.addEventListener) { //Si existe addEventListener utilizalo.
      elemento.addEventListener(nombreEvento, funcion, false); //Aquí se asigna el elemento al cual se va a escuchar, que evento se ejecutara, que es lo que hará cuando se accione el evento y que inicie el escucha en falso.
    } else if (elemento.attachEvent) { //Para que funcione en internet explorer.
      elemento.attachEvent(nombreEvento, funcion);
    }
  }
}

function moverNave() {
  //MOVIMIENTO A LA IZQUIERDA
  if (teclado[37]) { //Si la tecla con keyCode 37 "flecha a la izquierda" es actualizada, se actualiza la posición de la nave.
    nave.x -= 6; // A la posición que tenga le vamos a quitar 10.
    if (nave.x < 0) nave.x = 0; // Para que no se salga del rango.
  }
  //MOVIMIENTO A LA DERECHA
  if (teclado[39]) { //Si la tecla con keyCode 37 "flecha a la derecha" es actualizada, se actualiza la posición de la nave.
    var limite = canvas.width - nave.width;
    nave.x += 6; // A la posición que tenga le vamos a quitar 10.
    if (nave.x > limite) nave.x = limite; // Para que no se salga del rango.
  }
  //DISPAROS
  if (teclado[32]) {
    //
    if (!teclado.fire) {
      fire();
      teclado.fire = true;
    }
  } else teclado.fire = false; // Si no esta precionada la tecla, que cancele la acción.
}

function actualizaEnemigos() {
  if (juego.estado == 'iniciando') {
    for (let i = 0; i < 10 ; i++) {
      enemigos.push({
        x: 10 + (i*50),
        y: 10,
        height: 40,
        width: 40,
        estado: 'vivo',
        contador: 0
      });
    }
    juego.estado = 'jugando';
  }
  for (let i in enemigos) {
    var enemigo = enemigos[i];
    if (!enemigo) continue; // Si no esta el enemigo, se va a saltar al siguiente paso del ciclo.
    if (enemigo && enemigo.estado == 'vivo') { // Si el enemigo está vivo se va a mover.
      enemigo.contador++;
      //Formula de seno para que al aumentar el contador sea positivo y luego negativo.
      enemigo.x += Math.sin(enemigo.contador * Math.PI /90)*5;
    }
  }
}



// 
function moverDisparos() {
  //Este for recorre el arreglo de disparos.
  for (var i in disparos) {
    var disparo = disparos[i];
    disparo.y -= 2;
  }
  // Este filtro se encarga de eliminar del arreglo los disparos cuya coordenada en y hayan superado el tope del canvas que está en la coordenada 0.
  // Si no se eliminan los disparos que se salen de la pantalla, se consume mucha memoria.
  disparos = disparos.filter(function (disparo) {
    return disparo.y > 0;
  });
}

//AGREGA UN OBJETO AL ARREGLO DE LOS DISPAROS
function fire() {
  disparos.push({
    x: nave.x + 20,
    y: nave.y - 10,
    width: 10,
    height: 30
  });
}

// CON ESTO MOSTRAMOS VISUALMENTE LOS DISPAROS, LOS DIBUJAMOS EN EL CANVAS.
function dibujarDisparos() {
  ctx.save(); // Salvamos la info actual del canvas.
  ctx.fillStyle = 'white';
  for (var i in disparos) {
    var disparo = disparos[i];
    ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height); //Dibuja un rectangulo(x,y,ancho,alto)
  }
  ctx.restore(); // Cuando terminemos la regresamos como la encontramos.
}

//Se encarga de actualizar todas las posiciones de los jugadores y va a redibujar cada
// uno de los elementos del juego para el movimiento, además de dibujar el background.
function frameLoop() {
  //Para actualizar la nave cada vez que se ejecuta un nuevo frame.
  moverNave();
  actualizaEnemigos();
  moverDisparos();
  dibujarFondo();
  dibujarEnemigos();
  dibujarDisparos();
  dibujarNave();
}


//EJECUCIÓN DE FUNCIONES
loadMedia();
agregarEventosTeclado();