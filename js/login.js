const API_URL = "http://localhost:8080/api/usuarios";
const formulario = document.getElementById("login");
const tituloLogin = document.getElementById("tituloLogin");

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario) {
    tituloLogin.innerHTML = `Bienvenido de nuevo, ${usuario.admin ? "Administrador" : "Usuario"} ${usuario.username}`;
    formulario.innerHTML = `
        <h3>TUS DATOS PERSONALES</h3>
        <form class="text-center formSesionIniciada">
            <p class="textCenter">Tu direccion de mail es: ${usuario.email}</p>
            <div class="mb-3 divForm">
                <label for="InputUserName" class="form-label">Usuario</label>
                <input type="text" id="InputUserName" value="${usuario.username}">
                <button type="button" class="btn btn-secondary" id="btnCambiarNombreUsuario">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputNombreCompleto" class="form-label">Nombre Completo</label>
                <input type="text" id="InputNombreCompleto" value="${usuario.nombreCompleto}">
                <button type="button" class="btn btn-secondary" id="btnCambiarNombreCompleto">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputTelefono" class="form-label">Telefono</label>
                <input type="text" id="InputTelefono" value="${usuario.telefono}">
                <button type="button" class="btn btn-secondary" id="btnCambiarTelefono">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputDireccion" class="form-label">Direccion</label>
                <input type="text" id="InputDireccion" value="${usuario.direccion}">
                <button type="button" class="btn btn-secondary" id="btnCambiarDireccion">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputCiudad" class="form-label">Ciudad</label>
                <input type="text" id="InputCiudad" value="${usuario.ciudad}">
                <button type="button" class="btn btn-secondary" id="btnCambiarCiudad">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputProvincia" class="form-label">Provincia</label>
                <input type="text" id="InputProvincia" value="${usuario.provincia}">
                <button type="button" class="btn btn-secondary" id="btnCambiarProvincia">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputCodigoPostal" class="form-label">Codigo Postal</label>
                <input type="text" id="InputCodigoPostal" value="${usuario.codigoPostal}">
                <button type="button" class="btn btn-secondary" id="btnCambiarCodigoPostal">Actualizar</button>
            </div>
            <div class="mb-3 divForm">
                <label for="InputPais" class="form-label">Pais</label>
                <input type="text" id="InputPais" value="${usuario.pais}">
                <button type="button" class="btn btn-secondary" id="btnCambiarPais">Actualizar</button>
            </div>
            <button type="button" class="btn btn-danger" id="btnEliminarCuenta">Eliminar Cuenta</button>
        </form>
        <form id="loginFormPass">
            <p class="text-center">Aca podes cambiar tu comtraseña</p>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="InputPassword1">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword2" class="form-label">Confirmar Contraseña</label>
                <input type="password" class="form-control" id="InputPassword2">
            </div>
            <button type="submit" class="btn btn-primary" id="btnCambiarContrasena">Cambiar Contraseña</button>
        </form>
        <p class="text-center">Puedes continuar navegando por nuestra tienda o cerrar sesion.</p>
        <div class="btnAbajo">
            <button class="btn btn-secondary" id="btnPanelAdmin" onclick="window.location.href='../pages/administrador.html';">Ir al panel de administrador</button>
            <button class="btn btn-primary" onclick="window.location.href='../index.html';">Ir a la tienda</button>
            <button class="btn btn-danger" onclick="localStorage.removeItem('usuario'); window.location.href='../index.html';">Cerrar sesión</button>
        </div>
    `;
}

function iniciarSesion(event) {
    event.preventDefault();

    const email = document.getElementById("InputEmail").value.trim();
    const password = document.getElementById("InputPassword").value.trim();

    fetch(API_URL, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    .then(response => response.json())
    .then(data => {
        const verificarMail = data.find(usuario => usuario.email === email);
        if (!verificarMail) {
            alert("Usuario no encontrado, por favor registrese");
            return;
        }
        const verificarPassword = data.find(usuario => usuario.password === password);
        if (!verificarPassword) {
            alert("Contraseña incorrecta, por favor intente de nuevo");
            return;
        }else{
            const usuario = data.find(usuario => usuario.email === email && usuario.password === password);
            
            if (usuario.admin) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
                alert("Bienvenido administrador " + usuario.username + ", ha iniciado sesión correctamente");
                window.location.href = "../pages/administrador.html";
            }else if (usuario) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
                alert("Inicio de sesión exitoso, bienvenido " + usuario.username);
                window.location.href = "../index.html";
            } else {
                alert("Mail o contraseña incorrectos, por favor intente de nuevo o registrese");
            }
        }
    })
    .catch(error => {
        console.error(error);
        alert("Error al iniciar sesión intente de nuevo");
    });
}

function cambiarContrasena(event) {
    event.preventDefault();

    const password1 = document.getElementById("InputPassword1").value.trim();
    const password2 = document.getElementById("InputPassword2").value.trim();
    
    if (password1 !== password2) {
        alert("Las contraseñas no coinciden, por favor intente de nuevo");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        usuario.password = password1;

        fetch(`${API_URL}/${usuario.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
                alert("Contraseña cambiada exitosamente");
                //window.location.href = "../index.html";
            } else {
                throw new Error("Error al cambiar la contraseña");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Error al cambiar la contraseña, intente de nuevo");
        });
    } else {
        alert("No hay usuario logueado");
    }
}

function guardaCambios(usuario){
    fetch(`${API_URL}/${usuario.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(usuario)
            })
            .then(response => {
                if (response.ok) {
                    localStorage.setItem("usuario", JSON.stringify(usuario));
                    alert("Usuario actualizado exitosamente");
                } else {
                    throw new Error("Error al actualizar!!!");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Error al actualizar, intente de nuevo");
            });
}

document.addEventListener("DOMContentLoaded", () => {
    const btnPanelAdmin = document.getElementById("btnPanelAdmin");
    if (btnPanelAdmin) {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario && usuario.admin) {
            btnPanelAdmin.classList.remove("d-none");
        } else {
            btnPanelAdmin.classList.add("d-none");
        }
    }
    
    const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener("click", iniciarSesion);
    }

    const btnCambiarContrasena = document.getElementById("btnCambiarContrasena");
    if (btnCambiarContrasena) {
        btnCambiarContrasena.addEventListener("click", cambiarContrasena);
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const btnCambiarNombreUsuario = document.getElementById("btnCambiarNombreUsuario");
    if (btnCambiarNombreUsuario) {
        btnCambiarNombreUsuario.addEventListener("click", () => {
            const nuevoNombre = document.getElementById("InputUserName").value.trim();
            usuario.username = nuevoNombre;
            guardaCambios(usuario);
        });
    }
    const btnCambiarNombreCompleto = document.getElementById("btnCambiarNombreCompleto");
    if (btnCambiarNombreCompleto) {
        btnCambiarNombreCompleto.addEventListener("click", () => {
            const nuevoNombreCompleto = document.getElementById("InputNombreCompleto").value.trim();
            usuario.nombreCompleto = nuevoNombreCompleto;
            guardaCambios(usuario);
        });
    }
    const btnCambiarTelefono = document.getElementById("btnCambiarTelefono");
    if (btnCambiarTelefono) {
        btnCambiarTelefono.addEventListener("click", () => {
            const nuevoTelefono = document.getElementById("InputTelefono").value.trim();
            usuario.telefono = nuevoTelefono;
            guardaCambios(usuario);
        });
    }
    const btnCambiarDireccion = document.getElementById("btnCambiarDireccion");
    if (btnCambiarDireccion) {
        btnCambiarDireccion.addEventListener("click", () => {
            const nuevaDireccion = document.getElementById("InputDireccion").value.trim();
            usuario.direccion = nuevaDireccion;
            guardaCambios(usuario);
        });
    }
    const btnCambiarCiudad = document.getElementById("btnCambiarCiudad");
    if (btnCambiarCiudad) {
        btnCambiarCiudad.addEventListener("click", () => {
            const nuevaCiudad = document.getElementById("InputCiudad").value.trim();
            usuario.ciudad = nuevaCiudad;
            guardaCambios(usuario);
        });
    }
    const btnCambiarProvincia = document.getElementById("btnCambiarProvincia");
    if (btnCambiarProvincia) {
        btnCambiarProvincia.addEventListener("click", () => {
            const nuevaProvincia = document.getElementById("InputProvincia").value.trim();
            usuario.provincia = nuevaProvincia;
            guardaCambios(usuario);
        });
    }
    const btnCambiarCodigoPostal = document.getElementById("btnCambiarCodigoPostal");
    if (btnCambiarCodigoPostal) {
        btnCambiarCodigoPostal.addEventListener("click", () => {
            const nuevoCodigoPostal = document.getElementById("InputCodigoPostal").value.trim();
            usuario.codigoPostal = nuevoCodigoPostal;
            guardaCambios(usuario);
        });
    }
    const btnCambiarPais = document.getElementById("btnCambiarPais");
    if (btnCambiarPais) {
        btnCambiarPais.addEventListener("click", () => {
            const nuevoPais = document.getElementById("InputPais").value.trim();
            usuario.pais = nuevoPais;
            guardaCambios(usuario);
        });
    }
    const btnEliminarCuenta = document.getElementById("btnEliminarCuenta");
    if (btnEliminarCuenta) {
        btnEliminarCuenta.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
                fetch(`${API_URL}/${usuario.id}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"}
                })
                .then(response => {
                    if (response.ok) {
                        localStorage.removeItem("usuario");
                        alert("Cuenta eliminada exitosamente");
                        window.location.href = "../index.html";
                    } else {
                        throw new Error("Error al eliminar la cuenta");
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Error al eliminar la cuenta, intente de nuevo");
                });
            }
        });
    }
});