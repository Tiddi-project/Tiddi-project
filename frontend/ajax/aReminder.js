// toast para recordatorio
function toastReminder(contenedor, titulo, fecha){
    const divElement = document.createElement("div")
    divElement.classList.add("toast__content")
    divElement.innerHTML = `
        <svg class="bell-shake" width="30" height="30" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.067 2 8.5 3.567 8.5 5.5V6.291C5.991 7.353 4 9.953 4 13V17L2 19V20H22V19L20 17V13C20 9.953 18.009 7.353 15.5 6.291V5.5C15.5 3.567 13.933 2 12 2Z"
                    fill="#FBBF24" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 21C14 21.5523 13.5523 22 13 22H11C10.4477 22 10 21.5523 10 21"
                    stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div>${titulo} vence a las ${fecha}</div>
        
    `
    contenedor.appendChild(divElement)

    setTimeout(()=>{
        divElement.remove()
    },5000)

}




export const aReminder = async (contenedorToast) =>{
    try {
       // Peticion
        let res = await fetch("http://localhost:3000/tasks",{
            method: "GET",
            credentials: "include"
        })

        // convertir datos del backend en formato que se usa en js
        let data = await res.json()
        if(!res.ok){
            throw {status: res.status, message: res.statusText, dir:res}
        }

        // const contenedor = document.querySelector(".toast__reminder")
        data.forEach(tarea => {
            // administrar las horas
            // console.log(tarea.reminder_min);
            if(tarea.reminder_min > 0 ){
                const fechaDeTarea = new Date(tarea.deadline);
                const minRecordar = parseInt(tarea.reminder_min);
                const fechaARecordar = new Date(fechaDeTarea.getTime() - minRecordar * 60000);
                const ahora = new Date();
                const msARecordar = fechaARecordar - ahora
                
                
                // Si la tarea ya venció o el recordatorio ya pasó, no hacer nada
                if (fechaDeTarea < ahora || msARecordar <= 0) {
               
                    return;
                }
                setTimeout(() => {
                    toastReminder(contenedorToast, tarea.title, fechaDeTarea.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

                    // Reproducir sonido
                    const sonido = new Audio("../assets/alarma-reminder.mp3");
                    sonido.play();
                }, msARecordar);
                
                
            }
        });
    } catch (error) {
        let message = error.statusText || "Ha ocurrido un error"
        console.log(`Error: ${error.status}: ${message}`);
    }
}