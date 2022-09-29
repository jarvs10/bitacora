// variables //
const formulario = document.querySelector('.formulario');
const actividades = document.querySelector('#listado__actividades');
//const formulario2 = document.querySelector('.formulario__contenido');

// eventos //
registroEventos();
function registroEventos() {
    formulario.addEventListener('submit', validarCampos);

    document.addEventListener('DOMContentLoaded', validarCheckbox);
}

// arreglo //
let arreglo = [];

// funciones //
function validarCampos(e) {
    e.preventDefault();

    const contratista = document.querySelector('#contratista').value;

    const actividad = document.querySelector('#actividad').value;

    const inicio = document.querySelector('#inicio').value;

    const fin = document.querySelector('#fin').value;

    if(contratista === '' || actividad === '' || inicio === '' || fin === ''){
        mostrarError('Todos los campos son necesarios');

        return;

    } else {
        mostrarCorrecto('Agregando datos....')
    }

    const objactividad = {
        id: Date.now(),
        contratista,
        actividad,
        inicio,
        fin
    }

    arreglo.push(objactividad);

    formulario.reset();

    console.log(arreglo);

    mostrarHTML();
}

function mostrarHTML(){

    limpiarHMTL();

    arreglo.forEach(item => {
        const { contratista, actividad, inicio, fin, id } = item;

        const divInfo = document.createElement('div');
        divInfo.dataset.id = id;
        divInfo.innerHTML = `
            <p>Contratista: <span>${contratista}</span></p>
            <p>Actividad: <span>${actividad}</span></p>
            <p>Contratista: <span>${inicio}</span></p>
            <p>Contratista: <span>${fin}</span></p>
        `;

        const btneliminar = document.createElement('button');
        btneliminar.classList.add('borrar');
        btneliminar.innerHTML = 'Borrar &times;';

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('editar', 'mr-3');
        btnEditar.innerHTML = 'Editar ✔';
        
        btneliminar.onclick = () => {
            eliminarActividad(id);
        }

        divInfo.appendChild(btnEditar);
        divInfo.appendChild(btneliminar);
        
        actividades.appendChild(divInfo);
    })
}

function eliminarActividad(id){
    arreglo = arreglo.filter(item => item.id !== id);

    mostrarHTML();
}

function limpiarHMTL(){
    while(actividades.firstChild){
        actividades.removeChild(actividades.firstChild);
    }
}

function mostrarError(message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = message;

    formulario.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}

function mostrarCorrecto(message) {
    const correcto = document.createElement('div');
    correcto.classList.add('correcto');
    correcto.textContent = message;

    formulario.appendChild(correcto);

    setTimeout(() => {
        correcto.remove();
    }, 3000);
}

function validarCheckbox(){
    const policia = document.getElementById('policia').checked;

    console.log(policia);
}