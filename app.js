// VARIABLES 
/*document.> PERMITE CONECTAR LOS DIFERENTES ELEMENTOS DEL html CON EL javaScript
.querySelector>  PERMITE SELECCIONAR UN ELEMENTO ENTRE TODOS LOS QUE HAY PASANDOLE UN VALOR */
let listaNumeroSort = [];
let numeroMaximo = 3;
let numeroUsuario = 0;
let intentos = 3;
let contador = 1;
let titulo = document.querySelector(`h1`); 
let numeroSecreto = generarNumSecreto();

// ##### COMO INTERACTUAR CON ELEMENTOS EN EL HTML ##########

/*OPCION 1(PRINCIPIANTE): 
.innerHTML> PERMITE AGREGARLE CONTENIDO AL ELEMENTO, EN ESTE CASO UN TITULO (CONTENIDO DEL h! DEL HTML)*/

titulo.innerHTML = `JUEGO DEL NUMERO `;

/* OPCION 2 (AVANZADO) CON FUNCIONES: 
elemento>, texto> SON PARAMETROS QUE SE INTRODUCEN EN LA FUNCION Y SE VUELVEN VARIABLES UTILIZABLES DENTRO DE LA FUNCION */

function asignarTextoElemento(elemento, texto){ 
    // EN EL .querySelector> SE INTRODUCE EL ELEMENTO QUE SE QUIERE MODIFICAR 
    let elementoHTML = document.querySelector(elemento);
    // .innerHTML> ES IGUAL AL TEXTO LITERAL QUE SE QUIERE IMPRIMIR 
    elementoHTML.innerHTML = texto;
    return;
}


function generarNumSecreto() {
    //return> PERMITE REGRESAR EL VALOR DE LA VARIABLE AL LLAMAR A LA FUNCION
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;  
    console.log(numeroGenerado);
    console.log(listaNumeroSort);

    //SE COMPARA listaNumSort> CON EL NUMERO MAXIMO DE INTENTOS PARA NO ENTRAR EN UN BUCLE
    if (listaNumeroSort.length == numeroMaximo){
        asignarTextoElemento(`p`, `ALCANSASTE NUMERO MAXIMO DE PARTIDAS: ${numeroMaximo}`);
    }else{

        if (listaNumeroSort.includes(numeroGenerado)){
            return generarNumSecreto();
        }else {
            listaNumeroSort.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}



function verificarNum(){
    while(numeroUsuario != numeroSecreto){
        let numeroUsuario = parseInt(document.getElementById(`valorUsuario`).value);
   
    // TRIPLE IGUAL COMPARA QUE SEA EL VISMO VALOR Y EL MISMO TIPO DE DATO
    console.log(numeroUsuario === numeroSecreto);
    //SE HACE LA COMPARACION ENTRE EL NUMERO SECRETO Y EL DEL USUARIO 
    if (numeroUsuario === numeroSecreto){
        asignarTextoElemento(`p`, `ADIVINASTE !! EN ${contador} ${(contador === 1) ? `INTENTO` : `INTENTOS`}`);
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else{
        // DE AQUI PARA ABAJO ES PARA CUANDO EL USUARIO NO LE ATINA 
        if (numeroUsuario > numeroSecreto){
            asignarTextoElemento(`p`, `EL NUMERO SECRETO ES MENOR`);
        }else{
            asignarTextoElemento(`p`, `EL NUMERO SECRETO ES MAYOR`);
        }
        if(contador >= intentos){
            asignarTextoElemento(`p`, `PERDISTE`);
            break;
        }
        contador++;
        // SE LLAMA LA FUNCION limpiarCaja PARA QUE CADA INTENTO SE LIMPIE EL numeroUsuario
        limpiarCaja();
    }
    return;

    }
}

function limpiarCaja(){
    //  AL COLOCAR EL # EL querySelector? SABE QUE SE VA A LLAMAR A UN ELEMENTO POR SU ID 
    document.querySelector(`#valorUsuario`).value = ``;
    // SE LE ASIGNA EL VALOR "VACIO" CON .value>
}


function mensajeIntervalo(){
    // SE LLAMA A LA FUNCION, SE PONE EL ELEMENTO A CAMBIAR (`p`) , EL TEXTO POR IMPRIMIR (`ESCOJE UN NUMERO DEL 1 AL 10`)
    asignarTextoElemento(`p`, `ESCOJE UN NUMERO DEL 1 AL ${numeroMaximo}`);
}


// DENTRO DE ESTA FUNCION VAN TODOS LOS PASOS A REALIZAR QUE IMPLICA REINICIAR EL GUEJO
function reiniciarJuego() {
    // LUMPIAR NUMERO USUARIO 
    limpiarCaja();
    // CAMBIAR MENSAJE DE INTERVALO DE NUMEROS 
    mensajeIntervalo();
    // GENERAR EL NUEVO NUMEROSECRETO
    numeroSecreto = generarNumSecreto();
    // REINICIAR EL CONTADOR 
    contador = 1;
    // DESHABILITAR EL BOTON "NUEVO JUEGO"
    // AL USAR setAtTribute> SE REQUIEREN DOS PARAMTETROS
    document.querySelector(`#reiniciar`).setAttribute(`disabled`, `true`);

}



mensajeIntervalo();
