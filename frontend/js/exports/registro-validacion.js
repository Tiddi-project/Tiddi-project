const d = document
export default function validacionRegistro(form){
    
    const nombre = form.nameRegistro
    const email = form.emailRegistro
    const password = form.passwordRegistro
    const confirmPass = form.passwordConfirm

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,20}$/;

    // d.addEventListener("submit", (e)=>{
    //     let confNombre = validName()
    //     let confEmail = validEmail()
    //     let confPass = validPassword()
    //     let confConf = validConfirm()
    //     if(confNombre && confEmail && confPass && confConf){
    //         form.submit()
    //     }else{
    //         e.preventDefault()
    //     }

    // })

    // validacion nombre
    
    nombre.addEventListener("input", validName)

    function validName(){
        let nameTest = nameRegex.test(nombre.value)
        if(nombre.value.trim() === ""){
            form.querySelector(".nameSpan").textContent = ""
            return false
        }else if(!nameTest){
            form.querySelector(".nameSpan").textContent = "Por favor, ingresa un nombre válido."
            return false
        }else{
            form.querySelector(".nameSpan").textContent = ""
            return true
        }
    }
    
    // validacion email
    email.addEventListener("input", validEmail)

    function validEmail(){
        let emailTest = emailRegex.test(email.value)
        if(email.value.trim() === ""){
            form.querySelector(".emailSpan").textContent = ""
            return false
        }else if(!emailTest){
            form.querySelector(".emailSpan").textContent = "Por favor, ingresa un correo válido."
            return false
        }else{
            form.querySelector(".emailSpan").textContent = ""
            return true
        }
    }

    // validacion password
    password.addEventListener("input", validPassword)

    function validPassword(){
        let passwordTest = passwordRegex.test(password.value)
        if(password.value.trim() === ""){
            form.querySelector(".passSpan").textContent = ""
            return false
        }else if(!passwordTest){
            form.querySelector(".passSpan").textContent = "Debe tener entre 6 y 20 caracteres, al menos una letra, un número."
            return false
        }else{
            form.querySelector(".passSpan").textContent = ""
            return true
        }
    }
    
    // validacion de confirmacion de password

    confirmPass.addEventListener("input", validConfirm)

    function validConfirm(){
        let pass = password.value
        let conf = confirmPass.value
        if(conf.trim() === ""){
            form.querySelector(".confirmSpan").textContent = ""
            return false
        }else if(pass !== conf ){
            form.querySelector(".confirmSpan").textContent = "Las contraseñas no coinciden"
            return false
        }else{
            form.querySelector(".confirmSpan").textContent = ""
            return true
        }
    }

     // Devuelve una función que chequea TODO y retorna true/false
    return function validateAll() {
        const ok  = validName()
                & validEmail()
                & validPassword()
                & validConfirm();
        return Boolean(ok);
    };

}
