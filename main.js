//inicializacion de variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//apuntando a elemento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t.restante');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoId=setInterval(()=>{
    timer--;
    mostrartiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer ==0){
    clearInterval(tiempoRegresivoId)
    bloquearTarjetas();
    }
},1000)
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

// Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if(tarjetasdestapadas == 1){
        //mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerresultado = numeros[id]
    tarjeta1.innerHTML = primerresultado; 

    //deshabilitar primer boton
    tarjeta1.disabled = true;
    }else if(tarjetasdestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        tarjeta2.innerHTML = segundoresultado;

        //deshabilitar segund boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = 'Movimientos: '+movimientos;

        if(primerresultado == segundoresultado){
            //Encerar contador de tapaderas destapadas
            tarjetasdestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = 'aciertos: '+aciertos;

            if(aciertos ==8){
                clearInterval(tiempoRegresivoId);
                mostraraciertos.innerHTML = `aciertos: ${aciertos}🤩`;
                mostrartiempo.innerHTML = `Fantástico! sólo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🥳`
            }

            }else{
                //mostrar momentaneamente valores y volver a tapar
                setTimeout(()=>{
                    tarjeta1.innerHTML = ' ';
                    tarjeta2.innerHTML = ' ';
                    tarjeta1.disabled = false
                    tarjeta2.disabled = false
                    tarjetasdestapadas = 0;
                },800);

            }
    }
}