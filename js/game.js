/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/

var nCards;
var arrayImg = [];
var item;
var prevItem; //para ir comparando tarjetas
var score = 0;
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

/**
 * Función que, tras cada tirada, comprueba si la partida ha acabado
 */
function checkFinish() {
   let currentScore = parseInt(document.getElementById("score").value);
   let currentThrows = parseInt(document.getElementById("throws").value);
   if (currentScore == (nCards / 2) || currentThrows == 0) {
      finishingGame();
   }
}

/**
 * Función para volver a girar la tarjeta una vez que el tiempo visible se acaba
 * @param {HTML Element} item 
 */
function flipBackAgain(item) {
   item.classList.remove('is-flipped');
}

/**
 * Función que comienza al hacer click en una imagen
 * @param {Event} event 
 */
function startMarking(event) {
   item = event.currentTarget;
   item.classList.add('is-flipped');
   if (prevItem != null) { //Añadir que se comparen si ambas están visibles
      document.getElementById("throws").value = parseInt(document.getElementById("throws").value) - 1;

      //Comparamos las imágenes
      console.log(item);
      let frontPrev = prevItem.getElementsByTagName("img")[1].src;
      let frontCurrent = item.getElementsByTagName("img")[1].src;
      console.log("prev", frontPrev);
      console.log("cur", frontCurrent);
      if (frontPrev == frontCurrent && prevItem.classList.contains('is-flipped')) {
         score++;
         document.getElementById("score").value = score;
         //WORKING ON -- Las mantenemos hacia arriba y quitamos el listener para que no se puedan clickar 
         item.classList.add('is-flipped');
         prevItem.classList.add('is-flipped');
         item.removeEventListener('mousedown', startMarking);
         prevItem.removeEventListener('mousedown', startMarking);
      } else {
         setTimeout(flipBackAgain, (visibleTime * 1000), item);
      }
   } else {
      setTimeout(flipBackAgain, (visibleTime * 1000), item);
   }
   checkFinish();
   prevItem = item;
}

/**
 * Función donde se establecen los eventos del juego
 */
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
   //Cambiar z-index de los paneles (pantalla PLAY AGAIN)
   document.getElementById("finishedGame").classList.add("finishedGameColor"); //Añadimos la clase de color para las transiciones de la última pantalla
   document.getElementById("finishedGame").style.zIndex = "2";
   document.getElementById("game").style.zIndex = "1";
   document.getElementById("newGame").addEventListener("click",
      (e) => { location.reload() }); //Se recarga la misma página para empezar una nueva partida

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
//finishingGame(); //Debe ser llamada tras cada emparejamiento