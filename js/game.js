/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/

var nCards;
//--- Ambas variables dependen del nivel de dificultad del formulario
var visibleTime;
var throwsLeft;

/* ==============================
            FUNCIONES
   ==============================*/
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

function drawPanel(){
   document.getElementById("game").style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
   document.getElementById("game").style.gridTemplateRows = "repeat(" + size + ", 1fr)";
   let items="";
   for (let index = 1; index <= nCards; index++) { //El index lo utlizaremos para el cálculo de los puntos adyacentes luego
      
      items += `<div class="flipCardContainer">
                        <div class="flipCard">
                            <div class="flipCardFront">
                                <img src="./img/front.jpg">
                            </div>
                            <div class="flipCardBack">
                                <img id="img${index}" src="./img/image${index}.png">
                            </div>
                        </div>
                    </div>`; //Comillas evaluativas para poder meter variable
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