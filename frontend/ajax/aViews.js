// Funcion creada para la visualizacion de las diferentes vistas ej: dia, mes, etc.

export default async function aView(contenedor, vista) {
    try {
        let res = await fetch(`${vista}`)

        if (!res.ok) throw new Error("No se pudo cargar la vista");
        const html = await res.text();
        
        contenedor.innerHTML = html
        contenedor.dataset.vistaActiva = vista
        
        // Si hay un JS asociado, lo cargamos dinámicamente:
        const nombreVista = vista.split("/").pop().split(".")[0]; // 'vistaDia'
        // Importar dinámicamente el archivo JS correspondiente
        const modulo = await import(`../js/${nombreVista}.js`);

        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        
        // Ejecutar una función especial que debe exportar cada vista (ej: initVistaDia)
        const nombreFuncion = `init${capitalize(nombreVista)}`;
        if (typeof modulo[nombreFuncion] === "function") {
            modulo[nombreFuncion](); // Ejecuta la función que inicializa la vista
        } else {
            console.warn(`No se encontró la función ${nombreFuncion}`);
        }


    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar la vista: ${error.message}</p>`;
    }
};

