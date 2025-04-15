function cantidadItemsCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.querySelector('.carrito');
    let numItems = 0;
    carrito.forEach(item => {
        numItems += item.cantidad;
    });
    if (numItems === 0) {
        carritoItems.innerHTML = `
        <a class="nav-link active" href="../pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-xl" style="color: #f5a8a8;"></i></a>
        `;
    }
    else
    {
        carritoItems.innerHTML = `
            <a class="nav-link active" href="../pages/carrito.html"><i class="fa-solid fa-cart-shopping fa-bounce fa-xl" style="color: #f5a8a8;"></i></a>
            <div class="carritoItems">
                <a href="./pages/carrito.html"><span class="badge rounded-pill bg-danger">${numItems}</span></a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tablaCarrito = document.querySelector('.tablaCarrito')
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []

    cantidadItemsCarrito();
    const rederizarCarrito = () => {
        tablaCarrito.innerHTML = '';
    }
    
    if (carrito.length === 0) {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td colspan="4">No hay productos en el carrito</td>
        `
        tablaCarrito.appendChild(row);
    }
    
    carrito.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td><button class="btn btn-danger btnEliminar" data-nombre="${item.nombre}">Eliminar</button> <button class="btn btn-success btnAgregar" data-nombre="${item.nombre}" data-precio="${item.precio}">Agregar</button></td>
        `
        tablaCarrito.appendChild(row);
    })

    const btnEliminar = document.querySelectorAll('.btnEliminar');
    btnEliminar.forEach(btn => {    
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = e.target.dataset.nombre;
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const nuevoCarrito = carrito.filter(item => item.nombre !== nombre);
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            location.reload();
        })
    })

    const btnAgregar = document.querySelectorAll('.btnAgregar');
    btnAgregar.forEach(btn => {
        btn.addEventListener('click', (e) => {
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
            location.reload();
        });
    })

    const totalCompra = document.querySelector('#totalCompra');
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalCompra.textContent = total;

    const vaciarCarrito = document.querySelector('#vaciarCarrito');
    vaciarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        location.reload();
    })

    const comprarCarrito = document.querySelector('#comprarCarrito');
    comprarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        location.reload();
    })
})