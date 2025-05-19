import toast from "../js/exports/toast.js"


const aUser = {
    signinUser: async (form, toastContainer)=>{
        try {
            let name = form.nameRegistro.value
            let email = form.emailRegistro.value
            let password = form.passwordRegistro.value

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
            let data = await res.json()
            if (!res.ok) throw {status: res.status, message: data.message}
            toast("Registro exitoso", toastContainer, res.status)
            form.reset()

        } catch (error) {
            let message = error.message || "Ha ocurrido un error"
            console.log(`Error ${error.status}: ${message}`);
            if(error.status === 409){
                // alert("error en el registro")
                toast("El correo ya está registrado", toastContainer, error.status)
            }
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
                // alert("Usuario autenticado correctamente");
                window.location.href = "http://localhost:3000/";
            }
           
        } catch (error) {
            let message = error.statusText || "Ha ocurrido un error"
            if(error.status === 401){
                toast("Usuario no registrado", toastContainer, error.status)
            }
            if(error.status === 403){
                toast("Contraseña incorrecta", toastContainer, error.status)
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
    // getOneUser: async (userId, form)=>{
    //     try {
    //         console.log(userId);

    //         let res = await fetch(`http://localhost:3000/user/${userId.id}`, {
    //             method: "GET",
    //             credentials: "include"
    //         })
    //         if(!res.ok) throw {status:res.status, message:res.statusText}
    //         let data = await res.json()
    //         // if (!data.authenticated) return 
            
    //         form.nombrePerfil.value = data.user.name
    //         form.emailPerfil.value = data.user.email
    //         form.querySelector(".fotoPerfil__imagen-foto").src = userId.profile_picture

    //         console.log(data);
    //     } catch (error) {
    //         let message = error.statusText || "Ha ocurrido un error"
    //         console.log(`Error: ${error.status}: ${message}`);
    //     }
    // },
    perfilUser: async (form)=>{
        try {
            let res = await fetch("http://localhost:3000/check", {
                method: "GET",
                credentials: "include"
            })
            if(!res.ok) throw {status:res.status, message:res.statusText}
            let data = await res.json()
            // console.log(data.user);
            if (!data.authenticated) return 
            
            // form.nombrePerfil.value = data.user.name
            // form.emailPerfil.value = data.user.email
            // console.log(data);
            // form.querySelector(".fotoPerfil__imagen-foto").src = data.user.
            return data.user
            
        } catch (error) {
            let message = error.statusText || "Ha ocurrido un error"
            console.log(`Error: ${error.status}: ${message}`);
        }
    },
    updateUser: async (dataUser, formulario)=>{
        try {
            /*
            // Informacion en base de datos del usuario
            let nombreOriginal = dataUser.name
            let correoOriginal = dataUser.email
            let userId = dataUser.id
            
            // Informacion del formulario en perfil
            let nombreNuevo = formulario.nombrePerfil.value
            let correoNuevo = formulario.emailPerfil.value
            let claveAnterior = formulario.passwordAfter.value
            let claveNueva = formulario.passwordNew.value
            let formData = new FormData();
            if(nombreOriginal !== nombreNuevo) formData.append("name", nombreNuevo);
            if(correoOriginal !== correoNuevo) formData.append("email", correoNuevo);
            if(claveAnterior) formData.append("passwordAfter", claveAnterior);
            if(claveNueva) formData.append("passwordNew", claveNueva);
            */
            // Manejo de imagenes
            let formData = new FormData();
            let userId = dataUser.id
            if (formulario.fotoDePerfilUsuario.files.length > 0) {
                formData.append("imagen", formulario.fotoDePerfilUsuario.files[0]);
            } 
            /*
            // peticion
            // Solo enviás si hay cambios
            if ([...formData.entries()].length === 0){
                alert('No hiciste ningún cambio.') 
                return
            }
            alert(formData);
            */
            let res = await fetch(`http://localhost:3000/user/${userId}`, {
                method: "PATCH",
                credentials: "include",
                body: formData
            });
            
            let data = await res.json()
            if(!res.ok)  throw {status: res.status, message: res.statusText, dir:res}

        } catch (error) {
            let message = error.statusText || "Se ha producido un error"
            let status = error.status || "404"
            console.log(`Error ${status}: ${message}`)
        }
    }
}


export default aUser;
