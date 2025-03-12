//Mostrar barra lateral
function mostrarBarraIzq() {
    var sidebar = document.getElementById("sidebar");
    var body = document.getElementById("body");
    sidebar.classList.toggle("ocultar");
    body.classList.toggle("ajustar");
}

//Mostrar mini menu de perfil
function toggleMenu() {
    var menu = document.getElementById("perfilMenu");
    var perfil = document.getElementById("perfil")
    menu.classList.toggle("active");
    perfil.classList.toggle("active");
}
//Mostrar creación de tarea
function mostrarCreacionTarea() {
    var creacionTarea = document.getElementById("creacionTarea");
    creacionTarea.classList.toggle("active");
}

// Cierra el menú si se hace clic fuera de él
document.addEventListener("click", function (event) {
    var menu = document.getElementById("perfilMenu");
    var perfil = document.getElementById("perfil");

    if (!menu.contains(event.target) && !perfil.contains(event.target)) {
        menu.classList.remove("active");
        perfil.classList.remove("active");
    }
});
//Selector de filtro❗❗❗
document.querySelectorAll("div").forEach((categoria) => {
    categoria.querySelectorAll(".botonFiltro").forEach((boton) => {
        boton.addEventListener("click", function () {
            // Remueve "active" de todos los botones dentro del mismo div
            categoria.querySelectorAll(".botonFiltro").forEach(b => b.classList.remove("active"));
            // Agrega "active" solo al botón presionado
            this.classList.add("active");
        });
    });
});