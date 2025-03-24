const w = window,
n = navigator,
d = document

export default function conexion(){
    // creacion de ventana
    let notificacion = (color, mensaje)=>{
        const ventanaEmergente = d.createElement("div");
        ventanaEmergente.style.position = "fixed"
        ventanaEmergente.style.top = "0"
        ventanaEmergente.style.zIndex = "999"
        ventanaEmergente.style.width = "100%"
        ventanaEmergente.style.height = "5vh"
        ventanaEmergente.style.backgroundColor = color
        ventanaEmergente.style.color = "white"
        ventanaEmergente.style.padding = "1rem"
        ventanaEmergente.style.textAlign = "center"
        ventanaEmergente.innerText = mensaje
        d.body.appendChild(ventanaEmergente)
        
        setTimeout(() => {
            ventanaEmergente.remove();
        }, 3000);
    }


    w.addEventListener("offline",()=>{
        if(!n.onLine) return notificacion("red","Conexión perdida")  
    })
    w.addEventListener("online",()=>{
        if(n.onLine) return notificacion("#16C47F","Conexión reestablecida")  
    })
}