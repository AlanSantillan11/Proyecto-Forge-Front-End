
    function donacion(){
    alert("¡Gracias por donar a AdoptaTuÁrbol!")
}

    function adoptado(input){
    input.innerText = "Adoptado";
    input.style.background = "green";
    input.style.color = "white";
}


    function tipoSeleccionado(selectElement) {
    document.getElementById("tipo").innerText = selectElement.value;
}