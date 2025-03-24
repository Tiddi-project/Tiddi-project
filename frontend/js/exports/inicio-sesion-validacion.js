const d = document
export default function validacionInicioSesion (form){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,20}$/;
    // let password = e.target.value
    // let passwordTest = passwordRegex.test(password)
    
    
    d.addEventListener("submit", (e)=>{
        // let email = form.querySelector("#password").value
        let confirmEmail = validEmail()
        let confirmPassword = validPassword()
        if(confirmEmail && confirmPassword){
            form.submit()
        }else{
            e.preventDefault()
        }
    })
    
    form.querySelector("#email").addEventListener("keyup", validEmail)
    
    function validEmail(){
        
        let email = form.querySelector("#email").value
        let emailTest = emailRegex.test(email)
        if(email === ""){
            form.querySelector(".testFail").textContent = " "
            return false
        }else if(!emailTest){
            form.querySelector(".testFail").textContent = "El correo no tiene un formato válido "
            return false
        }else {
            form.querySelector(".testFail").textContent = " "
            return true
        }
    }

    function validPassword(){
        let email = form.querySelector("#password").value
        if(email === ""){
            form.querySelector(".testFail").textContent = "Debe ingresar una contraseña"
            return false
        }else {
            form.querySelector(".testFail").textContent = " "
            return true
        }
    }

}
