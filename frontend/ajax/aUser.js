import toast from "../js/exports/toast.js"


const aUser = {
    signinUser: async (form)=>{
        try {
            let name = form.nameRegistro.value
            let email = form.emailRegistro.value
            let password = form.passwordRegistro.value
            console.log({name, email, password});
            alert("funciona antes de la peticion")

            // peticion
            let res = await fetch("http://localhost:3000/signin", {
                method: "POST",
                credentials: "include",
                headers: {"content-type" : "application/json"},
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            
            })



            console.log(res)
            // alert("funciona despues de la peticion")
            let data = await res.json()

            if (!res.ok) throw {status: res.status, message: res.statusText}
            alert(data)
            console.log("Usuario registrado exitosamente");


        } catch (error) {
            alert(error)
            alert("se activo la alarma en el ajax catch")
            
            let message = error.message || "Ha ocurrido un error"

            if(error.status === 409){
                toast("Correo ya registrado", toastContainer)
            }
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    loginUser: async (form, toastContainer) =>{
        try {
            let email = form.email.value
            let password = form.password.value
            
            let res = await fetch("http://localhost:3000/login",{
                method: "POST",
                credentials: "include",
                headers: {"Content-Type":"application/json; charset=utf-8"},
                body: JSON.stringify({
                    email, 
                    password
                })
            })

            let data = await res.json()
            console.log(data);
            console.log(res);
            if (!res.ok) throw { status: res.status, message: res.statusText };
            

            if(!data.success) { 
                alert("Credenciales incorrectas");
            }else{
                alert("Usuario autenticado correctamente");
                window.location.href = "http://localhost:3000/";
            }
        
        } catch (error) {
            let message = error.statusText || "Ha ocurrido un error"
            if(error.status === 401){
                toast("Usuario no registrado", toastContainer)
            }
            if(error.status === 403){
                toast("Contraseña incorrecta", toastContainer)
            }
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    logoutUser: async ()=>{
        try {
            let res = await fetch("http://localhost:3000/logout",{
                method: "POST",
                credentials: "include"
            })
            let data = await res.json()
            if(!res.ok) throw {status: res.status, message: res.statusText}
            alert(data.message)
            window.location.href = "http://localhost:3000/inicio-sesion.html"
        } catch (error) {
            let message = error.message || "ha ocurrido un error al cerrar sesion"
            console.log(`Error ${error.status}: ${message}`);
        }
    },
    verificationUser: async ()=>{
        try {
            
        } catch (error) {
            
        }
    }
}


export default aUser;
