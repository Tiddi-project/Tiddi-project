const d = document

export default function checkbox(){

    d.addEventListener("click", async (e)=>{
        // console.log(e.target);
        if(e.target.matches(".checkbox")){
            let taskContainer =  e.target.closest(".task-container") 
            // closest: trae al contenedor padre
            let unitTask = taskContainer.querySelector(".task");
            let checkbox = taskContainer.querySelector(".checkbox").checked
            unitTask.classList.toggle("completed", checkbox)
            window.location.reload()
        }
        if(e.target.matches(".subtask-checkbox")){
            let taskContainer =  e.target.closest(".subtask-item") 
            // closest: trae al contenedor padre
            let unitTask = taskContainer.querySelector(".subtask-item-content");
            let checkbox = taskContainer.querySelector(".subtask-checkbox").checked
            unitTask.classList.toggle("completed", checkbox)
            // window.location.reload()
        }
    })
}