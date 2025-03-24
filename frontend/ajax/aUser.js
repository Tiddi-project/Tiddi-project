

const aUser = {
    signinUser: async (form)=>{
        try {
            let name = form.nameRegistro.value
            let email = form.emailRegistro.value
            let password = form.passwordRegistro.value

            let res = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {"content-type" : "application/json"},
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            let data = await res.json()
            if (!res.ok) throw {status: res.status, message: res.statusText}
        } catch (error) {
            let message = error.message || "Ha ocurrido un error"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    loginUser: async (form) =>{
        try {
            let res = await fetch("http://localhost:3000/usuarios")
            let data = await res.json()

            if(!res.ok) throw {status:res.status, message:res.statusText}
            let email = form.email.value
            let password = form.password.value
            
            const existEmail = data.some(user => user.email === email)
            const existPass = data.some(user => user.password === password)

            if(existEmail && existPass){
                alert("Usuario encontrado")
                window.location.href = "http://127.0.0.1:5501/frontend/"
            }else{
                alert("No coincide el correo o contraseña")
            }
            
        } catch (error) {
            let message = error.statusText || "Ha ocurrido un error"
            console.log(`Error ${error.status}: ${message}`);
        }
    }
}


export default aUser;
