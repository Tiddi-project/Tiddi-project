const d = document

export default function panelActive(panelTask, button){
    button.addEventListener("click",(e)=>{
        panelTask.classList.add("isActive")
        panelTask.querySelector(".add").textContent = "Agregar"

        // Limpiar campo oculto id al abrir para crear
        panelTask.querySelector('input[name="id"]').value = ""

        // Limpiar las imagenes
        panelTask.querySelector('.testTaskImageFail').style.display = "none"
        panelTask.querySelector('#imagen').value = ""

        // Limpiar las advertencias
        panelTask.querySelector('.testTaskTitleFail').value = ""
        panelTask.querySelector('.testTaskDescFail').value = ""
        panelTask.querySelector('.testTaskImageFail').value = ""

        // Limpiar subtareas al cancelar
        const subtasksContainer = panelTask.querySelector(".subtask__container").querySelectorAll(".subtask-item"); 
        subtasksContainer.forEach(subtask => {
            subtask.remove()
        });
        // se resetea el formulario
        panelTask.reset()

    })

    panelTask.querySelector(".button-cancel").addEventListener("click", (e)=>{
        panelTask.classList.remove("isActive")
        // permite que al hacer click en cancelar se elimine la imagen
        panelTask.querySelector(".imagen-insertada").src = ""
        panelTask.querySelector(".imagen-insertada").style.display = "none"
        panelTask.querySelector(".btn-eliminar-imagen").style.display = "none"
        // Limpiar campo oculto id al abrir para crear
        panelTask.querySelector('input[name="id"]').value = ""

        // Limpiar las imagenes
        panelTask.querySelector('.testTaskImageFail').style.display = "none"
        panelTask.querySelector('#imagen').value = ""

        // Limpiar las advertencias
        panelTask.querySelector('.testTaskTitleFail').value = ""
        panelTask.querySelector('.testTaskDescFail').value = ""
        panelTask.querySelector('.testTaskImageFail').value = ""
        // Limpiar subtareas al cancelar
        const subtasksContainer = panelTask.querySelector(".subtask__container").querySelectorAll(".subtask-item"); 
        subtasksContainer.forEach(subtask => {
            subtask.remove()
        });
        // se resetea el formulario
        panelTask.reset()
            
    })

    
    // d.addEventListener("click",(e)=>{

    //     // permite esconder el panel
    //     if(e.target.matches(".button-cancel")){
    //         panelTask.classList.remove("isActive")
    //         // permite que al hacer click en cancelar se elimine la imagen
    //         panelTask.querySelector(".imagen-insertada").src = ""
    //         panelTask.querySelector(".imagen-insertada").style.display = "none"
    //         panelTask.querySelector(".btn-eliminar-imagen").style.display = "none"
    //         // se resetea el formulario
    //         panelTask.reset()
    //         // ✅ Limpiar subtareas al cancelar
    //         const subtasksContainer = panelTask.querySelector(".subtask__container").querySelectorAll(".subtask-item"); 
    //         subtasksContainer.forEach(subtask => {
    //             subtask.remove()
    //         });
            
    //     }

    //     // asigna los valores de la tarea en el panel para su edicion
    //     /*
    //     if(e.target.matches(".btn-more")){
    //         panelTask.classList.add("isActive")

    //         // asignacion de valores:
    //         panelTask.querySelector("legend").textContent = "Editar tarea"
    //         // panelTask.querySelector(".add").textContent = "Editar"
    //         panelTask.titletask.value = e.target.dataset.title
    //         panelTask.desciptiontask.value = e.target.dataset.description
    //         panelTask.id.value = e.target.dataset.id

    //     }
    //     */
        
    // })
}
