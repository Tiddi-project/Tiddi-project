const d = document

export default function panelActive(panelTask, button){
    button.addEventListener("click",(e)=>{
        panelTask.classList.add("isActive")

    })
    
    d.addEventListener("click",(e)=>{

        // // permite visualizar el panel
        // if(e.target.matches(".btn-task-sider")){
        //     panelTask.classList.add("isActive")
        // }

        // permite esconder el panel
        if(e.target.matches(".button-cancel")){
            panelTask.classList.remove("isActive")
            panelTask.reset()
        }

        // asigna los valores de la tarea en el panel para su edicion
        if(e.target.matches(".btn-more")){
            panelTask.classList.add("isActive")

            // asignacion de valores:
            panelTask.querySelector("legend").textContent = "Editar tarea"
            panelTask.titletask.value = e.target.dataset.title
            panelTask.desciptiontask.value = e.target.dataset.description
            panelTask.id.value = e.target.dataset.id

        }
        
    })
}
