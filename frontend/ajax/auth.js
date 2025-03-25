
export const checkAuth = async () =>{
    try {
        let res = await fetch("http://localhost:3000/check", {
            method: "GET",
            credentials: "include"
        })
        if(!res.ok) throw {status:res.status, message:res.statusText}
        console.log(res);
        let data = await res.json()
        console.log(data);

        if (data.authenticated) {
            console.log("Usuario autenticado", data.user);
            return data.user; 
        } else {

            return null;
        }
        return data

        // if(data.authenticated){
        //     window.location.href = "http://localhost:3000/inicio-sesion.html"
        // }else{
        // }
    } catch (error) {
        let message = error.statusText || "Ha ocurrido un error"
        console.log(`Error: ${error.status}: ${message}`);
    }
}