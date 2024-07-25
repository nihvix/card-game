/* ============================================================
    JS para la comprobación de datos del formulario de entrada
   ============================================================*/


/* ==================================================
         INICIALIZACIÓN VARIABLES, OBJETOS, DOM
==================================================*/
var nickInput;
var difficultyInput;
var sizeInput;
var formInput;
var error;

/* ==============================
            FUNCIONES
   ==============================*/

   function checkForm(event) {
      if (nickInput.value.length == 0) {
          event.preventDefault();
          error.innerText = "Nick field cannot be empty";
          return false;
      } else if (nickInput.value.match(/\b\d+\w*/)) { //Para indicar inicio/fin del regex se usa '/' no comillas
          event.preventDefault();
          error.innerText = "Name field cannot start by a number";
          return false;
      } else if (difficultyInput.value == "0") {
         difficultyInput.focus();//El cursor se coloca sobre el input
         event.preventDefault();
         error.innerText = "A level must be selected";
         return false;
     } else if (sizeInput.value == "0") {
          sizeInput.focus();//El cursor se coloca sobre el input
          event.preventDefault();
          error.innerText = "A size must be selected";
          return false;
      }
      //En este punto la información ya es correcta, por lo que ya podemos almacenarla en la sesión
      saveUserData(nickInput, sizeInput, difficultyInput, avatarContainer);
      return true;
  }


/* ===================================
            EVENTO PRINCIPAL
   ===================================*/
function DOMLoaded() {
   //saveUserData(); //Debe llamarse después de comprobar los datos del formulario
   //Se cargan las variables
   nickInput = document.getElementById("nick");
   difficultyInput = document.getElementById("difficulty");
   sizeInput = document.getElementById("size");
   formInput = document.getElementById("inputForm"); //Botón de envío
   error = document.getElementById("error");

   //Se comprueba si hay algún error, ya que ahora sí estará cargado
   if (sessionStorage.getItem("error") != null) {
      error.innerText = sessionStorage.getItem("error"); //mostrar mensaje de error
      sessionStorage.removeItem("error"); //para que al recargar no vuelva a aparecer el error
   }
   //Se comprueba el formulario
   formInput.addEventListener('submit', checkForm);

}

document.addEventListener('DOMContentLoaded', DOMLoaded);

/* ========================================
             GEOLOCALIZACIÓN
========================================*/
dataGeolocation();