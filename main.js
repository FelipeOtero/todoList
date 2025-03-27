let vectorTareas = [];

function agregarTarea() {
    let inputText = document.getElementById("escribirTarea").value;

    if (inputText === "") {
        console.log("Vacio");
        return;
    }

    let fechaCreacion = new Date();

    vectorTareas.push({
        texto: inputText,
        fechaCreacion: fechaCreacion,
        fechaTachado: null,
        completada: false
    });

    document.getElementById("escribirTarea").value = "";
    renderizarTareas();
}

function renderizarTareas() {
    let listatareas = document.getElementById("listatareas");
    listatareas.innerHTML = "";

    for (let i = 0; i < vectorTareas.length; i++) {
        let tarea = vectorTareas[i];

        let checkedClass = "";
        let checkedSymbol = "";
        let tachadoClass = "";
        let fechaTexto = tarea.fechaCreacion.toLocaleString();

        if (tarea.completada) {
            checkedClass = "checked";
            checkedSymbol = "✔";
            tachadoClass = "tachado";
            fechaTexto = "Tachado: " + tarea.fechaTachado.toLocaleString();
        }

        listatareas.innerHTML += `
            <div>
                <span class="checkbox-btn ${checkedClass}" onclick="tacharTarea(${i})">${checkedSymbol}</span>
                <label id="tarea${i}" class="${tachadoClass}">${tarea.texto}</label>
                <br>
                <small>${fechaTexto}</small>
            </div>
        `;
    }
}

function tacharTarea(posTarea) {
    let tarea = vectorTareas[posTarea];

    if (!tarea.completada) {
        tarea.fechaTachado = new Date();
    }

    tarea.completada = !tarea.completada;
    renderizarTareas();
}

function mostrarMasRapida() {
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

    let mensaje = tareaRapida
        ? `La tarea más rápida fue "${tareaRapida.texto}" en ${Math.round(tiempoMinimo / 1000)} segundos.`
        : "Aún no hay tareas completadas.";

    document.getElementById("tareaRapida").innerText = mensaje;
}
