// variables //
const formulario = document.querySelector('.formulario');
const actividades = document.querySelector('#listado__actividades');
//const formulario2 = document.querySelector('.formulario__contenido');

const contratistaInput = document.querySelector('#contratista');

const actividadInput = document.querySelector('#actividad');

const inicioInput = document.querySelector('#inicio');

const finInput= document.querySelector('#fin');

let edicion;

const objactividad = {
    contratista: '',
    actividad : '',
    inicio : '',
    fin : ''
}

// arreglo //
let arreglo = [];

// eventos //
registroEventos();
function registroEventos() {
    formulario.addEventListener('submit', validarCampos);

    contratistaInput.addEventListener('change', e => {
        objactividad.contratista = e.target.value;
    });

    actividadInput.addEventListener('change', e => {
        objactividad.actividad = e.target.value;
    });

    inicioInput.addEventListener('change', e => {
        objactividad.inicio = e.target.value;
    });

    finInput.addEventListener('change', e => {
        objactividad.fin = e.target.value;
    });

    document.addEventListener('DOMContentLoaded', validarCheckbox);
}


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
    }

    if(edicion){
        // funcion editar id //
        editarItem({...objactividad});

        mostrarCorrecto('Datos actualizados correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar Actividad';

        edicion = false;

    } else {
        // generar id //
        objactividad.id = Date.now();
        
        // agregar el objeto al arreglo //
        arreglo.push(objactividad);

        mostrarCorrecto('Agregando datos....')
    }

    mostrarHTML();

    formulario.reset();
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

        btnEditar.onclick = () => editaId(item);

        divInfo.appendChild(btnEditar);
        divInfo.appendChild(btneliminar);
        
        actividades.appendChild(divInfo);
    })
}

function editarItem(citaUpdate){
    arreglo = arreglo.map(cita => cita.id === citaUpdate.id ? citaUpdate : cita);
    console.log(arreglo);

    //mostrarHTML();
}

function eliminarActividad(id){
    arreglo = arreglo.filter(item => item.id !== id);

    mostrarHTML();
}

function editaId(item){
    const { contratista, actividad, inicio, fin } = item;

    // llenar los inputs //
    contratistaInput.value = contratista;
    actividadInput.value = actividad;
    inicioInput.value = inicio;
    finInput.value = fin;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    edicion = true;
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

    //console.log(policia);
}