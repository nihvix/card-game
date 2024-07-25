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
function saveUserData(nickInput, difficultyInput, sizeInput, avatarContainer) {
    sessionStorage.setItem("nick", nickInput.value);
    sessionStorage.setItem("difficulty", difficultyInput.value);
    sessionStorage.setItem("size", sizeInput.value);
    sessionStorage.setItem("avatarImg", avatarContainer.src);
    sessionStorage.setItem("geolocation", geolocationTxT.value);
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
