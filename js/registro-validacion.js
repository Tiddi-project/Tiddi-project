const d = document
export default function validacionRegistro (){
    const $form = d.querySelector(".registro-form"),
    $inputs = d.querySelectorAll(".registro-form [required]")
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
        if(e.target.matches(".registro-form [required]")){
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
