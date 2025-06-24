import aUser from "../ajax/aUser.js"
import getAndRenderUsers from "./exports/renderUsers.js"


export async function initVistaAdmin() {
    // Definicion de variables
    const d = document
    const $busqueda = d.querySelector(".icon-lupa")
    const $inputBusqueda = d.querySelector(".filter__users")
    const $tableBody = d.querySelector(".table__body")
    const $usersLength = d.querySelector(".total__users")
    const $modalEdicion = d.querySelector(".modal__users")
    const $modalForm = d.querySelector(".modal__users-form")
    const $toastContainer = d.querySelector(".adminToast")
    // toast__reminder
    
    // Busqueda de usuarios
    let resultadoAjax = await aUser.allUsers();

    // Asignacion del enunacio con la cantidad de usuarios registrados
    $usersLength.textContent = `${resultadoAjax.length} Usuarios`

    // Activacion de la barra de busqueda
    $busqueda.addEventListener("click", (e)=>{
        $inputBusqueda.classList.toggle("filter__active")
    })

    // Renderizado de usuarios a la vista de administrador
    getAndRenderUsers(resultadoAjax, $tableBody)
    
    //  Filtro para la busqueda de usuarios por nombre y correo
    $inputBusqueda.addEventListener("keyup", (e)=>{
        const termino = $inputBusqueda.value.toLowerCase();
        const filtrados = resultadoAjax.filter(usuario =>
        usuario.name.toLowerCase().includes(termino) ||
        usuario.email.toLowerCase().includes(termino)
        );
        getAndRenderUsers(filtrados, $tableBody)

    })

    // Evento para la activacion de la ventana modal y el cierre de la misma
    d.addEventListener("click", (e)=>{
        if(e.target.closest(".editarUser")){
            $modalEdicion.classList.add("modal__users-Active")
            const $boton = e.target.closest(".editarUser");
            const id = $boton.dataset.id;
            const nombre = $boton.dataset.name;
            const correo = $boton.dataset.email;
            const role = $boton.dataset.role;
            const status = $boton.dataset.status;

            // Asignacion de valores en el formulario
            $modalForm.querySelector(".span__idUser").textContent = `${id}`
            $modalForm.querySelector(".span__nombreUser").textContent = `${nombre}`
            $modalForm.querySelector(".span__correoUser").textContent = `${correo}`
            $modalForm.querySelector("#estadoUser").value = status
            $modalForm.querySelector("#rolUser").value = role
            // $modalForm.querySelector(".span__rolUser").textContent = `${role}`
        }
        if(e.target.closest("#cancelarModalUser")){
            $modalEdicion.classList.remove("modal__users-Active")
        }
        if(e.target.closest(".eliminarUser")){
            const $boton = e.target.closest(".eliminarUser");
            const id = $boton.dataset.id;
        }
    })

    $modalForm.addEventListener("submit", async (e)=>{
        e.preventDefault()
        let id = $modalForm.querySelector(".span__idUser").textContent
        let rol = $modalForm.rolUser.value
        let estado = $modalForm.estadoUser.value

        console.log(id);
        console.log(estado);
        console.log(rol);

        await aUser.modalUser({id, estado, rol}, $toastContainer)
        resultadoAjax = await aUser.allUsers();
    
        getAndRenderUsers(resultadoAjax, $tableBody)

        $modalEdicion.classList.remove("modal__users-Active")

    })
   


}