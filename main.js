let vectorTareas = [];

function agregarTarea() {
    let inputText = document.getElementById("escribirTarea").value;

    if (inputText === "") {
        console.log("Vacio");
        return;
    }

    let listatareas = document.getElementById("listatareas");


    let fechaHora = new Date().toLocaleString(); 


    vectorTareas.push({ texto: inputText, fecha: fechaHora });

    document.getElementById("escribirTarea").value = "";

    listatareas.innerHTML = vectorTareas
        .map(tarea => `<li>${tarea.texto} <br> <small>${tarea.fecha}</small></li>`)
        .join(""); 
}
