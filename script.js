//cargar productos
var cargarProductos = function cargarProductos() {
  fetch('/productos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json()
    .then((data) => {
      var productosList = document.getElementById('productosList');
        productosList.innerHTML = '';
        data.forEach((producto) => {
          var li = document.createElement('li');
          li.textContent = `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Stock: ${producto.stock}`;
          productosList.appendChild(li);
        });
    }))
    .catch(e=>{
      alert(e);
    });
  }
  
  // cargar clientes
  var cargarClientes = function cargarClientes() {
    fetch('/clientes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })      
    .then((response) => response.json()
    .then((data) => {
      var clientesList = document.getElementById('clientesList');
      clientesList.innerHTML = '';
      data.forEach((cliente) => {
        var li = document.createElement('li');
        li.textContent = `ID: ${cliente.id}, Nombre: ${cliente.nombre}, Email: ${cliente.email}`;
        clientesList.appendChild(li);
      });
    }))
    .catch(e=>{
      alert(e);
    });
  }

  //cargar ventas
var cargarVentas = function cargarVentas() {
  fetch('/ventas', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json()
    .then((data) => {
      var ventasList = document.getElementById('ventasList');
      ventasList.innerHTML = '';
        data.forEach((venta) => {
          var li = document.createElement('li');
          li.textContent = `Fecha venta: ${venta.fecha}, Id cliente: ${venta.cliente_id}, Producto: ${venta.producto}, Cantidad: ${venta.cantidad}`;
          ventasList.appendChild(li);
        });
    }))
    .catch(e=>{
      alert(e);
    });
  }

  var cargar = function cargar()
  {
      cargarProductos();
      cargarClientes();
      cargarVentas();
  }
  
  // agregar producto
  document.getElementById('productoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('productoForm'));
    fetch('/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then((response) => response.json()
      .then((data) => {
        alert(data.message);
        cargarProductos();
        document.getElementById('productoForm').reset();
      }))
      .catch(e=>{
        document.getElementById('productoForm').reset();
        alert(e);
      });
  });
  
  // agregar cliente
  document.getElementById('clienteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('clienteForm'));
    fetch('/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then((response) => response.json()
      .then((data) => {
        alert(data.message);
        cargarClientes();
        document.getElementById('clienteForm').reset();
      }))
      .catch(e=>{
        document.getElementById('clienteForm').reset();
        alert(e);
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
    })
      .then((response) => response.json()
      .then((data) => {
        alert(data.message);
        cargarProductos();
        document.getElementById('productoFormDelete').reset();
      }))
      .catch(e=>{
        document.getElementById('productoFormDelete').reset();
        alert(e);
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
    })
      .then((response) => response.json()
      .then((data) => {
        alert(data.message);
        cargarClientes();
        document.getElementById('clienteFormDelete').reset();
      }))
      .catch(e=>{
        document.getElementById('clienteFormDelete').reset();
        alert(e);
      });
  });

  // consultar 1 producto
  document.getElementById('productoFormGetProducto').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('productoFormGetProducto'));
    var id = JSON.parse(JSON.stringify(Object.fromEntries(formData))).id;

    fetch('/productos/'+id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json()
      .then((data) => {
        var producto = document.getElementById('producto');
        producto.innerHTML = '';
        var li = document.createElement('li');
        li.textContent = `ID: ${data.id}, Nombre: ${data.nombre}, Precio: ${data.precio}, Stock: ${data.stock}`;
        producto.appendChild(li);
        document.getElementById('productoFormGetProducto').reset();
      }))
      .catch(e =>{
        var producto = document.getElementById('producto');
        producto.innerHTML = '';
        document.getElementById('productoFormGetProducto').reset();
        alert("Producto no encontrado");
      });
  });

  // consultar 1 cliente
  document.getElementById('clienteFormGet').addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(document.getElementById('clienteFormGet'));
    var id = JSON.parse(JSON.stringify(Object.fromEntries(formData))).id;

    fetch('/clientes/'+id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json()
      .then((data) => {
        var cliente = document.getElementById('cliente');
        cliente.innerHTML = '';
        var li = document.createElement('li');
        li.textContent = `ID: ${data.id}, Nombre: ${data.nombre}, Email: ${data.email}`;
        cliente.appendChild(li);
        document.getElementById('clienteFormGet').reset();
      }))
      .catch(e =>{
        var cliente = document.getElementById('cliente');
        cliente.innerHTML = '';
        document.getElementById('clienteFormGet').reset();
        alert("Cliente no encontrado");
      });
  });

  window.addEventListener('load', cargar());
