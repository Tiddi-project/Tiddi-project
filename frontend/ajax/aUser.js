

const aUser = {
    signinUser: async (form)=>{
        try {
            let name = form.nameRegistro.value
            let email = form.emailRegistro.value
            let password = form.passwordRegistro.value

            let res = await fetch("http://localhost:3000/signin", {
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
            let email = form.email.value
            let password = form.password.value

            let res = await fetch("http://localhost:3000/login",{
                method: "POST",
                headers: {"Content-Type":"application/json; charset=utf-8"},
                body: JSON.stringify({
                    email, 
                    password
                })
            })

            let data = await res.json()
            if (!res.ok) throw { status: res.status, message: res.statusText };
            console.log(data);
            

            if(!data.success) { // <- Asegurar que el backend devuelve success
                    alert("Credenciales incorrectas");
            }
            alert("Usuario autenticado correctamente");
            window.location.href = "http://localhost:3000/";
           
        } catch (error) {
            let message = error.statusText || "Ha ocurrido un error"
            console.log(`Error ${error.status}: ${message}`);
        }
    }
}


export default aUser;
