/* ==================================================
                ALMACENAR INFO USUARIO
   ==================================================*/

/* ==============================
        VARIABLES GLOBALES
   ==============================*/
var nick;
var difficulty;
var size;
var avatarImg;
var geolocationTxT;

/* ==============================
            FUNCIONES
   ==============================*/
/**
 * Función que almacena en el sessionStorage la info del form una vez rellenado correctamente
 * @param {*} nickInput 
 * @param {*} difficultyInput 
 * @param {*} sizeInput 
 * @param {*} avatarContainer 
 */
function saveUserData(nickInput, difficultyInput, sizeInput, avatarContainer) {
    sessionStorage.setItem("nick", nickInput.value);
    sessionStorage.setItem("difficulty", difficultyInput.value);
    sessionStorage.setItem("size", sizeInput.value);
    sessionStorage.setItem("avatarImg", avatarContainer.src);
    sessionStorage.setItem("geolocation", geolocationTxT.value);
}

/**
 * Función para obtener los datos de usuario 
 */
function getUserData() {
    nick = sessionStorage.getItem("nick");
    difficulty = sessionStorage.getItem("difficulty");
    email = sessionStorage.getItem("email");
    avatarImg = sessionStorage.getItem("avatarImg");
}

/**
* Función para realizar la petición y almacenamiento de la geolocalización del usuario
*/
function dataGeolocation() {
    if (!navigator.geolocation) {
        geolocationTxT = "Web browser does NOT support Geolocation API";
    } else {
        //A partir de aquí se empieza a escribir la geolocalización
        navigator.geolocation.getCurrentPosition(
            //Si se consigue correctamente: CALLBACKS(retorno de una petición)
            (position) => { geolocationTxT = "Latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude; },

            //Error
            () => { geolocationTxT = "Geolocation couldn't be done correctly."; }
        )

    }
}
