export default function toastComentario(estado, mensaje, contenedor){
    const divElement = document.createElement("div")
    divElement.classList.add("toast")
    if(estado === 200){

        divElement.innerHTML = `
            <svg class="svgToast" xmlns="http://www.w3.org/2000/svg"
                width="30" height="30"
                viewBox="0 0 24 24"
                fill="none">
            <circle cx="12" cy="12" r="12" fill="green"/>
            <path d="M7 13l3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${mensaje}
        `
    }
    if(estado === 500){
        divElement.innerHTML = `
        <svg class= svgToast xmlns="http://www.w3.org/2000/svg" 
        width="30" height="30" 
        viewBox="0 0 24 24" 
        fill="red">
        <circle cx="12" cy="12" r="12" fill="red" />
        <line x1="16" y1="8" x2="8" y2="16" 
                stroke="white" stroke-width="2" stroke-linecap="round" />
        <line x1="8" y1="8" x2="16" y2="16" 
                stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
        ${mensaje}
    `
    }
    contenedor.appendChild(divElement)

    setTimeout(()=>{
        divElement.remove()
    },5000)
}