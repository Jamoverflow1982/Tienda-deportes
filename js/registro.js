const API_URL = "http://localhost:8080/api/usuarios";

document.getElementById("registroForm").addEventListener("submit", guardarUsuario);

function guardarUsuario(event) {
    
    event.preventDefault();
    
    const nombre = document.getElementById("InputName").value;
    const email = document.getElementById("InputEmail1").value;
    const password = document.getElementById("InputPassword1").value;
    const password2 = document.getElementById("InputPassword2").value;
    const admin = false;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const usuario = {
    "email": email,
    "username": nombre,
    "password": password2,
    "admin": false
    };

    fetch(API_URL, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        const existeUsuario = data.find(usuario => usuario.email === email);
        if (existeUsuario) {
            alert("El correo ya está registrado");
            return;
        }
        else {
            fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Usuario registrado con éxito");
                window.location.href = "../pages/login.html";
            })
            .catch(error => {
                console.error(error);
                alert("Error al registrar el usuario");
            });
        }
    });

}