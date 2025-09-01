

var botonCambiar = document.getElementById("login")


    botonCambiar.addEventListener("click", function () {
    
        this.innerText = "Cerrar sesion";
});

var deleteDefinicion = document.getElementById("agregar-btn") 

    deleteDefinicion.addEventListener("click", function () {
        this.remove() ;
});

var botonesLike = document.querySelectorAll(".like-btn");

botonesLike.forEach(function(boton) {

    boton.addEventListener("click", function() {
        var textoActual = this.innerText;

        var contadorLikes = parseInt(textoActual.split(" ")[0]);

        contadorLikes++;

        this.innerText = contadorLikes + " me gusta";

        var titulo = this.parentElement.querySelector(".titulo-mascota").innerText;

        alert(titulo + " was Liked");
    });
});
