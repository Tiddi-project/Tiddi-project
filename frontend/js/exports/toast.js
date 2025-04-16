// Toast para determinar la ventana de mensaje
export default function toast(message, contenedor){
    const divElement = document.createElement("div")
    divElement.classList.add("toast")
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
        ${message}
    `
    contenedor.appendChild(divElement)

    setTimeout(()=>{
        divElement.remove()
    },5000)
}