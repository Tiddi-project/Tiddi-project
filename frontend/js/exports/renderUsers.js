import aUser from "../../ajax/aUser.js";
/*
export default async function getAndRenderUsers(contenedorTable){
    let resultadoAjax = await aUser.allUsers()

    renderUsers(resultadoAjax, contenedorTable)
}

function renderUsers(usuarios, contenedor){
    let listUsers = usuarios
    let contenedorTable = contenedor
    contenedorTable.innerHTML = "";

    // Paginacion
    const porPagina = 5;
    let paginaActual = 1;

    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;
    const usuariosPagina = listUsers.slice(inicio, fin);

    usuariosPagina.forEach(usuario => {
        
        const $fila = document.createElement("tr");
        $fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.status}</td>
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.role}</td>
        <td>
            <button class="btn-eliminar" data-id="${usuario.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="red"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-eliminar">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            </button>
        </td>
        `;
        contenedorTable.appendChild($fila);

    });

}

function actualizarBotones() {
  const totalPaginas = Math.ceil(usuarios.length / porPagina);
  const $contenedor = document.querySelector(".paginacion");
  $contenedor.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      paginaActual = i;
      renderizarPagina(paginaActual);
    };
    if (i === paginaActual) btn.disabled = true;
    $contenedor.appendChild(btn);
  }
}
  */


// import aUser from "../../ajax/aUser.js";

export default async function getAndRenderUsers(resultado, contenedorTable) {
  const resultadoAjax = resultado;

  const listUsers = resultadoAjax;
  const porPagina = 9;
  let paginaActual = 1;

  const renderPagina = (pagina) => {
    contenedorTable.innerHTML = "";
    const inicio = (pagina - 1) * porPagina;
    const fin = inicio + porPagina;
    const usuariosPagina = listUsers.slice(inicio, fin);

    usuariosPagina.forEach(usuario => {
      const $fila = document.createElement("tr");
      $fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.status}</td>
        <td>${usuario.name}</td>
        <td>${usuario.email}</td>
        <td>${usuario.role}</td>
        <td>
            <button class="editarUser" title="Editar" data-id="${usuario.id}" data-name="${usuario.name}" data-email="${usuario.email}" data-role="${usuario.role}" data-status="${usuario.status}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="green"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-editarUser">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            </button>
            <button class="eliminarUser" title="Eliminar" data-id="${usuario.id}" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="red"
                stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon-eliminarUser">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
            </button>
        </td>
      `;
      contenedorTable.appendChild($fila);
    });

    actualizarBotones();
  };

//   const actualizarBotones = () => {
//     const totalPaginas = Math.ceil(listUsers.length / porPagina);
//     const $contenedor = document.querySelector(".paginacion"); // Asegúrate de tener este div en tu HTML
//     $contenedor.innerHTML = "";

//     for (let i = 1; i <= totalPaginas; i++) {
//       const btn = document.createElement("button");
//       btn.textContent = i;
//       if (i === paginaActual) btn.disabled = true;
//       btn.onclick = () => {
//         paginaActual = i;
//         renderPagina(paginaActual);
//       };
//       $contenedor.appendChild(btn);
//     }
//   };

    const actualizarBotones = () => {
        const totalPaginas = Math.ceil(listUsers.length / porPagina);
        const $contenedor = document.querySelector(".paginacion");
        $contenedor.innerHTML = "";

        // Botón "Anterior"
        if (paginaActual > 1) {
            const btnAnterior = document.createElement("button");
            btnAnterior.textContent = "Anterior";
            btnAnterior.onclick = () => {
            paginaActual--;
            renderPagina(paginaActual);
            };
            $contenedor.appendChild(btnAnterior);
        }

        // Botones numéricos
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === paginaActual) btn.disabled = true;
            btn.onclick = () => {
            paginaActual = i;
            renderPagina(paginaActual);
            };
            $contenedor.appendChild(btn);
        }

        // Botón "Siguiente"
        if (paginaActual < totalPaginas) {
            const btnSiguiente = document.createElement("button");
            btnSiguiente.textContent = "Siguiente";
            btnSiguiente.onclick = () => {
            paginaActual++;
            renderPagina(paginaActual);
            };
            $contenedor.appendChild(btnSiguiente);
        }
    };

  renderPagina(paginaActual);
}