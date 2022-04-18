'use strict';
//Variables globales 
const formQuoter = document.querySelector('#cotizar-seguro');

//Constructor de Seguro
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Prototype para cotizar seguro de carro según del tipo que es
Seguro.prototype.cotizarSeguro = function() {
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            //Americano 1.15
            cantidad = base * 1.15;
        break;
        case '2':
            //Asiatico 1.05
            cantidad = base * 1.05;
        break;
        case '3':
            //Europeo 1.35
            cantidad = base * 1.35;
        break;
        default:
            console.log('Nada')
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    //Cada año la diferencia es mayor, su costo va a reducir un 3%
    cantidad -= ((diferencia * 3) * cantidad)/100;
    //Si el seguro es Basico se debe de multiplicar por un 30% mas
    //Si el seguro es Completo se debe de multiplicar por un 50% mas

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;

}

UI.prototype.mostrarResultado = function(seguro, total) {
    const div = document.createElement('div');
    const resultadoDiv = document.querySelector('#resultado');
    div.classList.add('mt-10');
    const {marca, tipo, year } = seguro;

    let marcaString;

    switch (marca) {
        case '1':
            marcaString = 'Americano';
            break;
        case '2':
            marcaString = 'Asiatico';
            break;
        case '3':
            marcaString = 'Europeo';
            break;
        default:
            break;
    }

    div.innerHTML = `
        <p class="header"> Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${marcaString} </span> </p>
        <p class="font-bold">Tipo: <span class="font-normal">  ${tipo} </span> </p>
        <p class="font-bold">Año: <span class="font-normal">  ${year} </span> </p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span> </p>
    `;

    //Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout( () =>  {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);   
}

function UI() {}

//Llena las opciones de los años
UI.prototype.fillYears = function() {
    const maxyear = new Date().getFullYear();
    const minYear = maxyear - 20;
    const selectYear = document.querySelector('#year');
    for (let i = maxyear; i >= minYear; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Prototype para mostrar mensaje de error en el formulario

UI.prototype.mensajeError = function(tipoMessage, message){
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje', 'mt-10');
    mensaje.textContent = message;

    if (tipoMessage === 'error') {
        mensaje.classList.add('error');
    }else{
        mensaje.classList.add('correcto');
    }
    formQuoter.insertBefore(mensaje, document.querySelector('#resultado'));
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

//Instanciar objeto UI sin atributos
const ui = new UI();

//Eventos

document.addEventListener('DOMContentLoaded', () => {
    ui.fillYears(); //Llamar funcion con su metodo para llenar select con los años
});

eventListeners();

function eventListeners() {
    
    formQuoter.addEventListener('submit',insuraceQuoter);
}

function insuraceQuoter(e) {
    e.preventDefault();

    //Leer la marca seleccinada
    const inputMarca = document.querySelector('#marca').value;

    //Leer el año seleccinado
    const inputYear = document.querySelector('#year').value;

    //Leer el tipo de cobertura
    const inputCobertura = document.querySelector('input[name="tipo"]:checked').value;

    if(inputMarca === "" || inputYear === "" || inputCobertura === ""){
        ui.mensajeError('error', 'Todos los campos son obligatorios');
       return;
    }
    // Limpiar resultados anteriores
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
         resultados.remove();
    }

    //Intanciar el objeto del seguro
    const seguro = new Seguro(inputMarca, inputYear, inputCobertura);
    
    //Cotizar seguro
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a mostrar el resultado de la busqueda
    ui.mostrarResultado(seguro, total)
    ui.mensajeError('correcto', 'Cotizando...');

}
