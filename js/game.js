/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/

var nCards;
var visibleCards = [];
var arrayImg = [];
var item
//--- Ambas variables dependen del nivel de dificultad del formulario
var visibleTime;
var throwsLeft;

/* ==============================
            FUNCIONES
   ==============================*/
/**
* Función que devuelve un número random entre 0 y max
* @param {int} max 
* @returns 
*/
function getRandomInt(max) {
   return Math.floor(Math.random() * (max - 1) + 1);
}

/**
 * Función para obtener la información del usuario de la parte derecha del menú
 */
function fillUserForm() {
   document.getElementById("nick").value = nick;
   document.getElementById("avatarImg").src = avatarImg; //variable de userData que almacena el avatar
   nCards = size * size;
}

/**
 * Función que establece el tiempo que cada carta permanece visible y el número de tiradas según el nivel de dificultad
 */
function difficultyDetails() {
   let level = difficulty;
   visibleTime = 5 - level;
   throwsLeft = parseInt((nCards / 2) + (10 / level));
   document.getElementById("throws").value += throwsLeft;
}

/**
 * Función que rellena un array con números según la cantidad de tarjetas de la partida
 * para seleccionar las imágenes y que sólo se repitan 2 veces max
 */
function fillArrayImg() {
   for (let i = 1; i <= nCards / 2; i++) {
      arrayImg.push(i);
      arrayImg.push(i);
   }
   if (nCards % 2 == 1) //Para tableros impares
      arrayImg.push(13);
}

/**
 * Método que dibuja el panel de juego
 */
function drawPanel() {
   for (let i = 0; i < nCards; i++) {
      visibleCards.push(false);
   }

   fillArrayImg();
   document.getElementById("game").style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
   document.getElementById("game").style.gridTemplateRows = "repeat(" + size + ", 1fr)";
   let items = "";
   for (let index = 1; index <= nCards; index++) {
      let posArrayImg = getRandomInt(arrayImg.length - 1);
      let cont = arrayImg[posArrayImg];
      items += `<div class="flipCardContainer">
                        <div id="flip${index}" class="flipCard">
                            <div class="flipCardFront">
                                <img src="./img/front.jpg">
                            </div>
                            <div class="flipCardBack">
                                <img id="img${index}" src="./img/image${cont}.png">
                            </div>
                        </div>
                    </div>`;
      arrayImg.splice(posArrayImg, 1);

   }
   document.getElementById("game").innerHTML = items;
}

function startMarking(event) {
   item = event.target;
   console.log("hola");
   item.classList.toggle('is-flipped');}

function gameEvents() {
   const items = document.getElementsByClassName("flipCard");
   for (let item of items) {
      item.addEventListener('mousedown', startMarking);
   }
}


/**
 * Método que realiza el cambio de pantalla al final de la partida
 */
function finishingGame() {
   let count = parseInt(document.getElementById("throws").value);
   if (count == 0) {
      //Cambiar z-index de los paneles (pantalla PLAY AGAIN)
      document.getElementById("finishedGame").classList.add("finishedGameColor"); //Añadimos la clase de color para las transiciones de la última pantalla
      document.getElementById("finishedGame").style.zIndex = "2";
      document.getElementById("game").style.zIndex = "1";
      document.getElementById("newGame").addEventListener("click",
         (e) => { location.reload() }); //Se recarga la misma página para empezar una nueva partida
   }
}

/* =======================================
            LLAMADAS A FUNCIONES
   =======================================*/
//Se cargan todas las variables que se van a necesitar
getUserData();

//Comprobamos si se ha realizado formulario y, en caso contario, redirigimos al formulario
//No se permite comenzar el juego sin la información del usuario
if (!checkUserData()) {
   location = "index.html";
}

//Rellenamos la info del usuario
fillUserForm();

//Establecemos detalles según dificultad
difficultyDetails();

//Dibujar tarjetas
drawPanel();

//Eventos del juego
gameEvents();

//Finalizar partida
finishingGame(); //Debe ser llamada tras cada emparejamiento