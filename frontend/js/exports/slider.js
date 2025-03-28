const d = document
export function slider(logo, slidebar, slidebarBtn,spans){
    
    slidebarBtn.addEventListener("click", ()=>{
        slidebar.classList.toggle("slidebar-mini")
        slidebarBtn.classList.toggle("btn-task-mini")
        spans.forEach((span)=>{
            span.classList.toggle("ocult")
            span.classList.toggle("span-hover")
        })
    })
}
// logo.addEventListener("click", ()=>{
//     slidebar.classList.toggle("slidebar-mini")
//     slidebarBtn.classList.toggle("slidebar-mini")
//     spans.forEach((span)=>{
//         span.classList.toggle("ocult")
//     })
// })