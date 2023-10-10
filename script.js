// Función para cargar la lista de productos
var cargarProductos = function cargarProductos() {
    fetch('./data/productos.json')
      .then((response) => response.json())
      .then((data) => {
        var productosList = document.getElementById('productosList');
        productosList.innerHTML = '';
        data.forEach((producto) => {
          var li = document.createElement('li');
          li.textContent = `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Stock: ${producto.stock}`;
          productosList.appendChild(li);
        });
      });
  }
  
  // Función para cargar la lista de clientes
  var cargarClientes = function cargarClientes() {
    fetch('./data/clientes.json')
      .then((response) => response.json())
      .then((data) => {
        var clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = '';
        data.forEach((cliente) => {
          var li = document.createElement('li');
          li.textContent = `ID: ${cliente.id}, Nombre: ${cliente.nombre}, Email: ${cliente.email}`;
          clientesList.appendChild(li);
        });
      });
  }
  

  var cargar = function cargar()
  {
      cargarProductos();
      cargarClientes();
  }
  

  // agregar producto
  document.getElementById('productoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('productoForm'));
    fetch('/productos', {
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
  
  // Eagregar cliente
  document.getElementById('clienteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('clienteForm'));
    fetch('/clientes', {
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

  // borrar producto
  document.getElementById('productoFormDelete').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('productoFormDelete'));
    var id = JSON.parse(JSON.stringify(Object.fromEntries(formData))).id;

    fetch('/productos/'+id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        cargarProductos();
        document.getElementById('productoFormDelete').reset();
      });
  });

  // borrar cliente
  document.getElementById('clienteFormDelete').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('clienteFormDelete'));
    var id = JSON.parse(JSON.stringify(Object.fromEntries(formData))).id;

    fetch('/clientes/'+id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        cargarClientes();
        document.getElementById('clienteFormDelete').reset();
      });
  });


  window.addEventListener('load', cargar());
