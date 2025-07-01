const API_URL = "http://localhost:8080/api/articulos";

const tablaArticulos = document.getElementById("tablaArticulos");
const formularioArticulo = document.getElementById("formularioArticulo");
const tituloFormulario = document.getElementById("tituloFormulario");
const botonGuardar = document.getElementById("botonGuardar");
const botonCancelar = document.getElementById("botonCancelar");
const botonEliminar = document.getElementById("botonEliminar");
const botonEditar = document.getElementById("botonEditar");
const botonAgregar = document.getElementById("botonAgregar");
const botonActualizar = document.getElementById("botonActualizar");
const botonEliminarTodo = document.getElementById("botonEliminarTodo");
const botonCerrarSesion = document.getElementById("botonCerrarSesion");
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario || !usuario.admin) {
    alert("Acceso denegado. Debes ser un administrador para acceder a esta página.");
    window.location.href = "../index.html";
}
function cargarArticulos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            tablaArticulos.innerHTML = "";
            data.forEach(articulo => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${articulo.id}</td>
                    <td>${articulo.nombre}</td>
                    <td>${articulo.precio}</td>
                    <td>${articulo.descripcion}</td>
                    <td><img src="${articulo.imagen}" alt="${articulo.nombre}" class="img-thumbnail" style="width: 100px;"></td>
                    <td>${articulo.cantidad}</td>
                    <td>${articulo.categoria}</td>
                    <td>${articulo.disponible ? "Sí" : "No"}</td>
                    <td>
                        <button class="btn btn-primary" onclick="editarArticulo(${articulo.id})">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
                    </td>
                `;
                tablaArticulos.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar los artículos:", error));
}
function agregarArticulo() {
    tituloFormulario.textContent = "Agregar Artículo";
    botonGuardar.classList.remove("d-none");
    botonActualizar.classList.add("d-none");
    botonEliminar.classList.add("d-none");
    formularioArticulo.reset();
}
function editarArticulo(id) {
    tituloFormulario.textContent = "Editar Artículo";
    botonGuardar.classList.add("d-none");
    botonActualizar.classList.remove("d-none");
    botonEliminar.classList.remove("d-none");

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(articulo => {
            formularioArticulo.id.value = articulo.id;
            formularioArticulo.nombre.value = articulo.nombre;
            formularioArticulo.precio.value = articulo.precio;
            formularioArticulo.descripcion.value = articulo.descripcion;
            formularioArticulo.imagen.value = articulo.imagen;
            formularioArticulo.cantidad.value = articulo.cantidad;
            formularioArticulo.categoria.value = articulo.categoria;
            formularioArticulo.disponible.value = articulo.disponible;
        })
        .catch(error => console.error("Error al cargar el artículo:", error));
}
function guardarArticulo(event) {
    event.preventDefault();
    const articulo = {
        nombre: formularioArticulo.nombre.value,
        precio: parseFloat(formularioArticulo.precio.value),
        stock: parseInt(formularioArticulo.cantidad.value)
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    })
        .then(response => response.json())
        .then(data => {
            alert("Artículo agregado exitosamente.");
            cargarArticulos();
            formularioArticulo.reset();
        })
        .catch(error => console.error("Error al agregar el artículo:", error));
}
function actualizarArticulo(event) {
    event.preventDefault();
    const articulo = {
        id: parseInt(formularioArticulo.id.value),
        nombre: formularioArticulo.nombre.value,
        precio: parseFloat(formularioArticulo.precio.value),
        stock: parseInt(formularioArticulo.cantidad.value)
    };

    fetch(`${API_URL}/${articulo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articulo)
    })
        .then(response => response.json())
        .then(data => {
            alert("Artículo actualizado exitosamente.");
            cargarArticulos();
            formularioArticulo.reset();
        })
        .catch(error => console.error("Error al actualizar el artículo:", error));
}
function eliminarArticulo(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    alert("Artículo eliminado exitosamente.");
                    cargarArticulos();
                } else {
                    alert("Error al eliminar el artículo.");
                }
            })
            .catch(error => console.error("Error al eliminar el artículo:", error));
    }
}
function eliminarTodosLosArticulos() {
    if (confirm("¿Estás seguro de que deseas eliminar todos los artículos?")) {
        fetch(API_URL, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    alert("Todos los artículos han sido eliminados exitosamente.");
                    cargarArticulos();
                } else {
                    alert("Error al eliminar los artículos.");
                }
            })
            .catch(error => console.error("Error al eliminar los artículos:", error));
    }
}
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    cargarArticulos();
    botonAgregar.addEventListener("click", agregarArticulo);
    botonGuardar.addEventListener("click", guardarArticulo);
    botonActualizar.addEventListener("click", actualizarArticulo);
    botonEliminar.addEventListener("click", () => {
        const id = parseInt(formularioArticulo.id.value);
        if (id) {
            eliminarArticulo(id);
        } else {
            alert("Debes seleccionar un artículo para eliminar.");
        }
    });
    botonEliminarTodo.addEventListener("click", eliminarTodosLosArticulos);
    botonCerrarSesion.addEventListener("click", cerrarSesion);
});
// File: js/administrador.js
