'use strict';

//Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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

//Prototype para validar formulario

UI.prototype.validateForm = function(){

}

//Instanciar objeto UI sin atributos
const ui = new UI();

//Eventos

document.addEventListener('DOMContentLoaded', () => {
    ui.fillYears(); //Llamar funcion con su metodo para llenar select con los años
});

eventListeners();

function eventListeners() {
    //Constantes
    const formQuoter = document.querySelector('#cotizar-seguro');
    
    formQuoter.addEventListener('submit',insuraceQuoter);
}

function insuraceQuoter(e) {
    e.preventDefault();
    console.log('Prueba');
}

