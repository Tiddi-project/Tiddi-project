//Mostrar meni menu de perfil
function toggleMenu() {
    var menu = document.getElementById("perfilMenu");
    var perfil = document.getElementById("perfil")
    menu.classList.toggle("active");
    perfil.classList.toggle("active");
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