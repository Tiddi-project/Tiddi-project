const d = document,
w = window
export default function barraNavegacion(header){
    
    d.addEventListener("scroll", ()=>{
        const posicionDelScroll = w.scrollY
        // console.log(posicionDelScroll)
        if(posicionDelScroll > 50){
            d.querySelector(header).style.backgroundColor = "white"
            d.querySelector(header).style.boxShadow = `0 0.2rem 1rem 0.1rem grey`
        }else{
            d.querySelector(header).style.backgroundColor = "transparent";
            d.querySelector(header).style.boxShadow = `none`

        }
    })
}