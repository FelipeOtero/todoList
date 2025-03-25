let vectorTareas=[];


function agregarTarea() {
    let inputText = document.getElementById("escribirTarea").value;
    if (inputText === "") {
        console.log("Vacio");
    }
    else
    {
        let listatareas = document.getElementById("listatareas");
        vectorTareas.push(inputText);
        listatareas.innerHTML = listatareas.innerHTML += "<li>" + inputText + "</li>";
    }

}
