/* ============================================================
    JS para la comprobación de datos del formulario de entrada
   ============================================================*/


/* ==================================================
         INICIALIZACIÓN VARIABLES, OBJETOS, DOM
==================================================*/


/* ==============================
            FUNCIONES
   ==============================*/
function DOMLoaded(){
   saveUserData(); //Debe llamarse después de comprobar los datos del formulario
}

/* ===================================
            EVENTO PRINCIPAL
   ===================================*/
document.addEventListener('DOMContentLoaded', DOMLoaded);

/* ========================================
             GEOLOCALIZACIÓN
========================================*/
dataGeolocation();