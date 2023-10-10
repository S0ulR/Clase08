const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
app.use(express.static('../Clase08'));
var clientes = require('./data/clientes.json');
var productos = require('./data/productos.json');

app.use(bodyParser.json());

// Guardar productos en el archivo JSON
function saveProducts(productos) {
  fs.writeFileSync('./data/productos.json', JSON.stringify(productos, null, 2));
}

// Guardar clientes en el archivo JSON
function saveClientes(clientes) {
  fs.writeFileSync('./data/clientes.json', JSON.stringify(clientes, null, 2));
}

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// Ruta para agregar un producto
app.post('/productos', (req, res) => {
  var nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1; 
  productos.push(nuevoProducto);
  saveProducts(productos);
  res.json({ message: 'Producto agregado con éxito', producto: nuevoProducto });
});

// Ruta para eliminar un producto por ID
app.delete('/productos/:id', (req, res) => {
  var productoId = parseInt(req.params.id);
  var productoIndex = productos.findIndex((producto) => producto.id === productoId);
  if (productoIndex !== -1) {
    productos.splice(productoIndex, 1);
    saveProducts(productos);
    res.json({ message: 'Producto eliminado con éxito' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Ruta para agregar un cliente
app.post('/clientes', (req, res) => {
  var nuevoCliente = req.body;
  nuevoCliente.id = clientes.length + 1; 
  clientes.push(nuevoCliente);
  saveClientes(clientes);
  res.json({ message: 'Cliente agregado con éxito', cliente: nuevoCliente });
});

// Ruta para eliminar un cliente por ID
app.delete('/clientes/:id', (req, res) => {
  var clienteId = parseInt(req.params.id);
  var clienteIndex = clientes.findIndex(cliente => cliente.id === clienteId);
  if (clienteIndex !== -1) {
    clientes.splice(clienteIndex, 1);
    saveClientes(clientes);
    res.json({ message: 'Cliente eliminado con éxito' });
  } else {
    res.status(404).json({ message: 'Cliente no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

