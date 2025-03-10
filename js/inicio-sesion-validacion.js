const d = document
export default function validacionInicioSesion (){
    const $form = d.querySelector(".acceso-form"),
    $inputs = d.querySelectorAll(".acceso-form [required]")
    console.log($form);
    console.log($inputs);

    $inputs.forEach(input =>{
        const $span = d.createElement("span")
        $span.id = input.name
        $span.innerText = input.title
        $span.classList.add("formulario-error", "none")
        input.after($span)
    })

    d.addEventListener("keyup", (e)=>{
        if(e.target.matches(".acceso-form [required]")){
            let $input = e.target,
            pattern = $input.pattern
            console.log($input);
            if(pattern && $input.value !== ""){
                console.log("el input tiene patron");
                let regex = new RegExp(pattern)
                console.log(regex.exec($input.value));
                return !regex.exec($input.value)
                ?d.getElementById($input.name).classList.add("is-active")
                :d.getElementById($input.name).classList.remove("is-active")
                
            }
            if(!pattern){
                return $input.value === ""
                ?d.getElementById($input.name).classList.add("is-active")
                :d.getElementById($input.name).classList.remove("is-active")
            }
        }
    })
    


}
