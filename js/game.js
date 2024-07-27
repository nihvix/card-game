/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/

var nCards;
var visibleCards = [];
var arrayImg = [];
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

function difficultyDetails() {
   let level = difficulty;
   visibleTime = 5 - level;
   throwsLeft = parseInt((nCards / 2) + (10 / level));
   document.getElementById("throws").value += throwsLeft;
}

function fillArrayImg() {
   for (let i = 1; i <= nCards / 2; i++) {
      arrayImg.push(i);
      arrayImg.push(i);
   }
   if (nCards % 2 == 1) //Para tableros impares
      arrayImg.push(13);
}

function drawPanel() {
   for (let i = 0; i < nCards; i++) {
      visibleCards.push(false);
   }

   fillArrayImg();
   document.getElementById("game").style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
   document.getElementById("game").style.gridTemplateRows = "repeat(" + size + ", 1fr)";
   let items = "";
   for (let index = 1; index <= nCards; index++) { //El index lo utlizaremos para el cálculo de los puntos adyacentes luego
      console.log("size: ", arrayImg.length);
      let posArrayImg = getRandomInt(arrayImg.length - 1);
      console.log("posArrayImg: ", posArrayImg);
      let cont = arrayImg[posArrayImg];
      console.log("cont: ", cont);
      items += `<div class="flipCardContainer">
                        <div class="flipCard">
                            <div class="flipCardFront">
                                <img src="./img/front.jpg">
                            </div>
                            <div class="flipCardBack">
                                <img id="img${index}" src="./img/image${cont}.png">
                            </div>
                        </div>
                    </div>`; //Comillas evaluativas para poder meter variable
      arrayImg.splice(posArrayImg, 1);

      console.log(arrayImg);
   }
   document.getElementById("game").innerHTML = items;
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