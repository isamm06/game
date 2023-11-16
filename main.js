//inician variables

let tarjetasDestapadas = 0;

let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;

let movimientos = 0;
let aciertos = 0;

let temporizador= false;
let timer=80;  
let timerInicial=80;
let cuentaRegresivaId=null;        

let audioClick = document.getElementById("click");
let audioBien = document.getElementById("bien");
let audioPerder = document.getElementById("perder");
let audioGanar = document.getElementById("ganar");


//html

let mostrarMovimientos=document.getElementById(`movimientos`);
let mostrarAciertos= document.getElementById(`aciertos`);
let mostrarTiempo= document.getElementById(`t-restante`);

//numeros aleatorios

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15]; // arreglo o array
numeros = numeros.sort (()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    cuentaRegresivaId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML=`Tiempo: ${timer} segundos`;
        if (timer==0){
            audioPerder.play();
            clearInterval(cuentaRegresivaId);
            bloquearTarjetas();
        }
    }, 1000);
}

function bloquearTarjetas(){
    for (let i=0; i<=30; i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML= numeros[i];
        tarjetaBloqueada.disabled=true;
    }
}

// funcion principal
function destapar(id) {

    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }

    audioClick.play();

    tarjetasDestapadas ++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas==1){
        //muestra un numero
        tarjeta1 = document.getElementById(id);
        primerResultado=numeros[id]
        tarjeta1.innerHTML= primerResultado;
        tarjeta1.disabled=true;
        //deshabilita primer cuadro^
    }
    else if(tarjetasDestapadas==2){
        //segundo numero
        tarjeta2= document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=segundoResultado;
        tarjeta2.disabled=true;
        //dehabilite segundo cuadro

        //mas movimientos

        movimientos ++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;

        if(primerResultado==segundoResultado){
            audioBien.play();
            //contador tarjetas destapadas
            tarjetasDestapadas=0;
            //aumento de aciertos
            aciertos++;
            mostrarAciertos.innerHTML=`Aciertos: ${aciertos}`;

            if(aciertos==15){
             audioGanar.play();
            clearInterval(cuentaRegresivaId);
            mostrarAciertos.innerHTML=`Aciertos: ${aciertos}🔥`;
            mostrarTiempo.innerHTML= `Fantastico! Solo demoraste ${timerInicial-timer} segundos👏`
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}👌`;
            }
        }
        else{
            //mostrar valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML=` `;
                tarjeta2.innerHTML=` `;
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },800)
        }
    }

}