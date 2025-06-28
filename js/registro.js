const API_URL = "http://localhost:8080/api/usuarios";

document.getElementById("registroForm").addEventListener("submit", guardarUsuario);

function guardarUsuario(event) {
    
    event.preventDefault();
    
    const nombre = document.getElementById("InputName").value;
    const email = document.getElementById("InputEmail1").value;
    const password = document.getElementById("InputPassword1").value;
    const password2 = document.getElementById("InputPassword2").value;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const usuario = {
    "email": email,
    "username": nombre,
    "password": password2
};

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Usuario registrado con éxito");
        //window.location.href = "../pages/login.html";
    })
    .catch(error => {
        console.error(error);
        alert("Error al registrar el usuario");
    });
}