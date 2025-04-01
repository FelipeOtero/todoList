let vectorTareas = [];

function mostrarError(mensaje) {
    alert(mensaje);
}

function limpiarError(elemento) {
    let error = obtenerElementoError(elemento);
    if (error) {
        error.remove();
    }
}

function obtenerElementoError(elemento) {
    let error = elemento.nextElementSibling;
    if (error && error.classList.contains("error")) {
        return error;
    }
    return null;
}

function agregarTarea() {
    let inputText = obtenerTextoTarea();
    if (esTextoVacio(inputText)) {
        console.log("Vacio");
        return;
    }

    if (esTextoValido(inputText)) {
        let fechaCreacion = new Date();
        limpiarErrorDeElemento("escribirTarea");
        agregarTareaAlVector(inputText, fechaCreacion);
        limpiarInputTarea();
        renderizarTareas();
    }
}

function obtenerTextoTarea() {
    return document.getElementById("escribirTarea").value;
}

function esTextoVacio(texto) {
    return texto === "";
}

function esTextoValido(texto) {
    if (texto.length < 3) {
        mostrarError("La tarea debe tener al menos 3 caracteres");
        return false;
    }
    return true;
}

function limpiarErrorDeElemento(idElemento) {
    let inputElement = document.getElementById(idElemento);
    limpiarError(inputElement);
}

function agregarTareaAlVector(texto, fechaCreacion) {
    vectorTareas.push({
        texto: texto,
        fechaCreacion: fechaCreacion,
        fechaTachado: null,
        completada: false
    });
}

function limpiarInputTarea() {
    document.getElementById("escribirTarea").value = "";
}

function renderizarTareas() {
    let listatareas = document.getElementById("listatareas");
    listatareas.innerHTML = "";

    for (let i = 0; i < vectorTareas.length; i++) {
        let tarea = vectorTareas[i];
        let tareaHTML = crearHTMLDeTarea(tarea, i);
        listatareas.innerHTML += tareaHTML;
    }
}

function crearHTMLDeTarea(tarea, indice) {
    let checkedClass = obtenerClaseChecked(tarea);
    let checkedSymbol = obtenerSimboloChecked(tarea);
    let tachadoClass = obtenerClaseTachado(tarea);
    let fechaTexto = obtenerFechaTexto(tarea);

    return `
        <div>
            <span class="checkbox-btn ${checkedClass}" onclick="tacharTarea(${indice})">${checkedSymbol}</span>
            <label id="tarea${indice}" class="${tachadoClass}">${tarea.texto}</label>
            <br>
            <small>${fechaTexto}</small>
        </div>
    `;
}

function obtenerClaseChecked(tarea) {
    if (tarea.completada) {
        return "checked";
    }
    return "";
}

function obtenerSimboloChecked(tarea) {
    if (tarea.completada) {
        return "✔";
    }
    return "";
}

function obtenerClaseTachado(tarea) {
    if (tarea.completada) {
        return "tachado";
    }
    return "";
}

function obtenerFechaTexto(tarea) {
    if (tarea.completada && tarea.fechaTachado) {
        return "Tachado: " + tarea.fechaTachado.toLocaleString();
    }
    return tarea.fechaCreacion.toLocaleString();
}

function tacharTarea(posTarea) {
    let tarea = vectorTareas[posTarea];
    cambiarEstadoDeTarea(tarea);
    renderizarTareas();
}

function cambiarEstadoDeTarea(tarea) {
    if (!tarea.completada) {
        tarea.fechaTachado = new Date();
    }
    tarea.completada = !tarea.completada;
}

function mostrarMasRapida() {
    let tareaRapida = obtenerTareaMasRapida();
    let mensaje = crearMensajeDeTareaRapida(tareaRapida);
    document.getElementById("tareaRapida").innerText = mensaje;
}

function obtenerTareaMasRapida() {
    let tareaRapida = null;
    let tiempoMinimo = Infinity;

    for (let tarea of vectorTareas) {
        if (tarea.completada && tarea.fechaTachado) {
            let tiempoTomado = tarea.fechaTachado - tarea.fechaCreacion;
            if (tiempoTomado < tiempoMinimo) {
                tiempoMinimo = tiempoTomado;
                tareaRapida = tarea;
            }
        }
    }

    return tareaRapida;
}

function crearMensajeDeTareaRapida(tareaRapida) {
    if (tareaRapida) {
        let tiempoMinimo = tareaRapida.fechaTachado - tareaRapida.fechaCreacion;
        return `La tarea más rápida fue "${tareaRapida.texto}" en ${Math.round(tiempoMinimo / 1000)} segundos.`;
    } else {
        return "Aún no hay tareas completadas.";
    }
}
