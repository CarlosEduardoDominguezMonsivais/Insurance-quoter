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

//Instanciar objeto UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.fillYears(); //Lalamar funcion con su metofo para llenar select con los años
});