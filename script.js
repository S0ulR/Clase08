// Función para cargar la lista de productos
function cargarProductos() {
    fetch('./data/productos.json')
      .then((response) => response.json())
      .then((data) => {
        const productosList = document.getElementById('productosList');
        productosList.innerHTML = '';
        data.forEach((producto) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Stock: ${producto.stock}`;
          productosList.appendChild(li);
        });
      });
  }
  
  // Función para cargar la lista de clientes
  function cargarClientes() {
    fetch('./data/clientes.json')
      .then((response) => response.json())
      .then((data) => {
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = '';
        data.forEach((cliente) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${cliente.id}, Nombre: ${cliente.nombre}, Email: ${cliente.email}`;
          clientesList.appendChild(li);
        });
      });
  }
  
  // Función para cargar la lista de ventas
  function cargarVentas() {
    fetch('./data/ventas.json')
      .then((response) => response.json())
      .then((data) => {
        const ventasList = document.getElementById('ventasList');
        ventasList.innerHTML = '';
        data.forEach((venta) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${venta.id}, Cliente ID: ${venta.clienteId}`;
          ventasList.appendChild(li);
        });
      });
  }
  
  // Envío del formulario de producto
  document.getElementById('productoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('productoForm'));
    fetch('./data/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        cargarProductos();
        document.getElementById('productoForm').reset();
      });
  });
  
  // Envío del formulario de cliente
  document.getElementById('clienteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('clienteForm'));
    fetch('./data/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        cargarClientes();
        document.getElementById('clienteForm').reset();
      });
  });
  
  // Envío del formulario de venta
  document.getElementById('ventaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('ventaForm'));
    fetch('./data/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        cargarVentas();
        document.getElementById('ventaForm').reset();
      });
  });
  
  // Clic en el botón de cargar productos
  document.getElementById('cargarProductos').addEventListener('click', () => {
    cargarProductos();
  });
  
  // Clic en el botón de cargar clientes
  document.getElementById('cargarClientes').addEventListener('click', () => {
    cargarClientes();
  });
  
  // Clic en el botón de cargar ventas
  document.getElementById('cargarVentas').addEventListener('click', () => {
    cargarVentas();
  });
  