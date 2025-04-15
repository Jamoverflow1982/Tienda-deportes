function cantidadItemsCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.querySelector('.carrito');
    let numItems = 0;
    carrito.forEach(item => {
        numItems += item.cantidad;
    });
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
                <a href="./pages/carrito.html"><span class="badge rounded-pill bg-danger">${numItems}</span></a>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cantidadItemsCarrito();
});