(function(){

    var contenedorTareas = document.getElementById('contenedor-tareas')

var inputTitulo = document.getElementById('input-nombreTarea');
var inputTarea = document.getElementById('input-tareas');
var inputAgregar = document.getElementById('input-crear');

var botonCompletar = document.getElementsByClassName('completar');
var botonCancelar = document.getElementsByClassName('cancelar');

var cantidadTareas = 0;
var cantidadCompletadas = 0;

var PcantidadTareas = document.getElementById('cantidad-tareas')
var PcantidadCompletadas = document.getElementById('cantidad-completadas')

var botonPanel = document.getElementsByClassName('boton-panel')[0];
var menuPanel = document.getElementsByClassName('menu-panel')[0];
var main = document.getElementsByTagName('main')[0];

var menuActivo = false;

var TitulosTareas = [];
var ContenidoTareas = [];

function checkStorage() {

    //TAREAS COMPLETADAS
    var tareasCompletadas = localStorage.getItem('tareasCompletadas');

    if (tareasCompletadas === null) {
        cantidadCompletadas = 0;
    } else {
        cantidadCompletadas = tareasCompletadas;
        PcantidadCompletadas.innerHTML = cantidadCompletadas;
    }

    //TAREAS ANTERIORES
    TitulosTareas = localStorage.getItem('ArrTitulosTareas').split(',');
    ContenidoTareas = localStorage.getItem('ArrContenidoTareas').split(',');

    if (TitulosTareas === null && ContenidoTareas === null) {
        return;
    } else {
        construirTareasAnteriores();
    }

    function construirTareasAnteriores() {

        for (let i = 0; i < TitulosTareas.length; i++) {

            //CREAR ELEMENTOS
            var nuevaTarea = document.createElement('div'); nuevaTarea.className = 'card mb-5';
            var tareaBody = document.createElement('div'); tareaBody.className = 'card-body';
            var tituloTarea = document.createElement('h4'); tituloTarea.className = 'card-title';
            var contenidoTarea = document.createElement('p'); contenidoTarea.className = 'card-text';
            var botonVerde = document.createElement('a'); botonVerde.className = 'btn btn-success completar';
            var botonRojo = document.createElement('a'); botonRojo.className = 'btn btn-danger cancelar';
            var iconoCheck = document.createElement('i'); iconoCheck.className = 'fas fa-check';
            var iconoTimes = document.createElement('i'); iconoTimes.className = 'fas fa-times';

            //UNIENDO ELEMENTOS
            nuevaTarea.appendChild(tareaBody);
            tareaBody.appendChild(tituloTarea);
            tareaBody.appendChild(contenidoTarea);
            tareaBody.appendChild(botonVerde);
            tareaBody.appendChild(botonRojo);
            botonVerde.appendChild(iconoCheck);
            botonRojo.appendChild(iconoTimes);


            //DANDO VALORES DEL ARRAY
            tituloTarea.innerHTML = TitulosTareas[i];
            contenidoTarea.innerHTML = ContenidoTareas[i];

            //CREANDO LAS TAREAS
            contenedorTareas.appendChild(nuevaTarea);

            //DANDO EVENTOS A LOS BOTONES DE LAS TAREAS ANTERIORES
            for (let i = 0; i < botonCompletar.length; i++) {

                botonCompletar[i].addEventListener('click', function () {
                    var body = this.parentElement;
                    var card = body.parentElement;
                    var contenedor = card.parentElement;

                    cantidadCompletadas++;
                    PcantidadCompletadas.innerHTML = cantidadCompletadas;
                    localStorage.setItem('tareasCompletadas', cantidadCompletadas);

                    cantidadTareas = contenedorTareas.children.length;
                    PcantidadTareas.innerHTML = cantidadTareas;

                    contenedor.removeChild(card);
                });
            };

            for (let i = 0; i < botonCancelar.length; i++) {

                botonCancelar[i].addEventListener('click', function () {

                    var body = this.parentElement;
                    var card = body.parentElement;
                    var contenedor = card.parentElement;

                    contenedor.removeChild(card);

                    cantidadTareas = contenedorTareas.children.length;
                    PcantidadTareas.innerHTML = cantidadTareas;

                });
            };
            
        };

    };

};

function actualizarStorage(){

    TitulosTareas.splice(i, 1)
    localStorage.removeItem('ArrTitulosTareas');
    localStorage.setItem('ArrTitulosTareas',TitulosTareas)

    localStorage.removeItem('ArrCon');
    localStorage.setItem('ArrContenidoTareas',ContenidoTareas)

};

function inicio() {

    inputAgregar.addEventListener('click', validarTarea);
    botonPanel.addEventListener('click', togglePanel)
};

function validarTarea(e) {

    e.preventDefault();

    if (inputTitulo.value == '' || inputTarea.value == '') {

        return;

    } else {

        agregarTarea();

    }

};

function agregarTarea() {

    //TOMANDO VALORES
    var nuevoTitulo = inputTitulo.value;
    var nuevoContenidoTarea = inputTarea.value;

    //CREAR ELEMENTOS
    var nuevaTarea = document.createElement('div'); nuevaTarea.className = 'card mb-5';
    var tareaBody = document.createElement('div'); tareaBody.className = 'card-body';
    var tituloTarea = document.createElement('h4'); tituloTarea.className = 'card-title';
    var contenidoTarea = document.createElement('p'); contenidoTarea.className = 'card-text';
    var botonVerde = document.createElement('a'); botonVerde.className = 'btn btn-success completar';
    var botonRojo = document.createElement('a'); botonRojo.className = 'btn btn-danger cancelar';
    var iconoCheck = document.createElement('i'); iconoCheck.className = 'fas fa-check';
    var iconoTimes = document.createElement('i'); iconoTimes.className = 'fas fa-times';

    //DANDO VALORES
    tituloTarea.innerHTML = nuevoTitulo;
    contenidoTarea.innerHTML = nuevoContenidoTarea;

    //GUARDANDO VALORES EN LOCAL STORAGE
    TitulosTareas.push(nuevoTitulo);
    ContenidoTareas.push(nuevoContenidoTarea);
    localStorage.setItem('ArrTitulosTareas', TitulosTareas);
    localStorage.setItem('ArrContenidoTareas', ContenidoTareas);

    //UNIENDO ELEMENTOS
    nuevaTarea.appendChild(tareaBody);

    tareaBody.appendChild(tituloTarea);
    tareaBody.appendChild(contenidoTarea);
    tareaBody.appendChild(botonVerde);
    tareaBody.appendChild(botonRojo);

    botonVerde.appendChild(iconoCheck);
    botonRojo.appendChild(iconoTimes);

    //AGREGANDO LA TAREA
    contenedorTareas.appendChild(nuevaTarea)

    //LIMPIANDO INPUT
    inputTitulo.value = '';
    inputTarea.value = '';

    //Cantidad tareas
    cantidadTareas = contenedorTareas.children.length;
    PcantidadTareas.innerHTML = cantidadTareas;

    for (var i = 0; i < botonCompletar.length; i++) {

        botonCompletar[i].addEventListener('click', function () {

            var body = this.parentElement;
            var card = body.parentElement;
            var contenedor = card.parentElement;

            contenedor.removeChild(card);

            cantidadCompletadas++;
            PcantidadCompletadas.innerHTML = cantidadCompletadas;
            localStorage.setItem('tareasCompletadas', cantidadCompletadas);

            cantidadTareas = contenedorTareas.children.length;
            PcantidadTareas.innerHTML = cantidadTareas;

        });
    };

    for (var i = 0; i < botonCancelar.length; i++) {

        botonCancelar[i].addEventListener('click', function () {

            var body = this.parentElement;
            var card = body.parentElement;
            var contenedor = card.parentElement;

            contenedor.removeChild(card);

            cantidadTareas = contenedorTareas.children.length;
            PcantidadTareas.innerHTML = cantidadTareas;

        });
    };
};

function togglePanel() {

    if (menuActivo == false) {

        menuActivo = true
        menuPanel.className = 'col-auto menu-panel active'

    } else {

        menuActivo = false
        menuPanel.className = 'col-auto menu-panel'

    }
};

window.addEventListener('load', checkStorage);
inicio();

}())