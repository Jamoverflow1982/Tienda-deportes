const pagina = document.querySelector('title');

function cantidadItems() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.querySelector('.carrito');
    let numItems = 0;
    carrito.forEach(item => {
        numItems += item.cantidad;
    });
    console.log(pagina)
    if (pagina.textContent === 'Home - Tienda de Arqueros Clemente') {
        console.log('Pagina home');
        if (numItems === 0) {
            carritoItems.innerHTML = `
            <a class="nav-link" href="./pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-xl" style="color: #f5a8a8;"></i></a>
            `;
        }
        else
        {
            carritoItems.innerHTML = `
                <a class="nav-link" href="./pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-bounce fa-xl" style="color: #f5a8a8;"></i></a>
                <div class="carritoItems">
                    <a href="./pages/carrito.html"><span class="badge rounded-pill bg-danger">${numItems}</span></a>
                </div>
            `;
        }
    }else{
        console.log('Otra pagina');
        if (numItems === 0) {
            carritoItems.innerHTML = `
            <a class="nav-link" href="../pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-xl" style="color: #f5a8a8;"></i></a>
            `;
        }
        else
        {
            carritoItems.innerHTML = `
                <a class="nav-link" href="../pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-bounce fa-xl" style="color: #f5a8a8;"></i></a>
                <div class="carritoItems">
                    <a href="../pages/carrito.html"><span class="badge rounded-pill bg-danger">${numItems}</span></a>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botonAgregar = document.querySelectorAll('.btnAgregar');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidadItems();

    botonAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = e.target.dataset.nombre;
            const precio = e.target.dataset.precio;
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const productoExistente = carrito.find(item => item.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            const toast = document.getElementById('toastCarrito');
            const toastBody = toast.querySelector('.toast-body');
            if (pagina.textContent === 'Home - Tienda de Arqueros Clemente') {
                toastBody.innerHTML = `
                <img src="./assets/img/checkmark-transparent.gif" class="rounded me-2" alt="Check">
                <p>${nombre} agregado al carrito</p>
            `;
            }else{
                toastBody.innerHTML = `
                <img src="../assets/img/checkmark-transparent.gif" class="rounded me-2" alt="Check">
                <p>${nombre} agregado al carrito</p>
            `;
            }

            const toastBootstrap = new bootstrap.Toast(toast);
            toastBootstrap.show();  
        });
    });
    document.onclick = (e) => {
        cantidadItems();
    }
});
