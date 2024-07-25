/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/
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
   panelSize = parseInt(size);
}

function difficultyDetails() {
   let level = difficulty;
   let nCards = size * size;
   visibleTime = 5 - level;
   throwsLeft = parseInt((nCards / 2) + (10 / level));
   document.getElementById("throws").value += throwsLeft;
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