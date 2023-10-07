const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('../Clase08'));

app.use(bodyParser.json());

// Leer productos desde el archivo JSON
function readProducts() {
  return JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8'));
}

// Guardar productos en el archivo JSON
function saveProducts(productos) {
  fs.writeFileSync('./data/productos.json', JSON.stringify(productos, null, 2));
}

// Leer clientes desde el archivo JSON
function readClientes() {
  return JSON.parse(fs.readFileSync('./data/clientes.json', 'utf-8'));
}

// Guardar clientes en el archivo JSON
function saveClientes(clientes) {
  fs.writeFileSync('./data/clientes.json', JSON.stringify(clientes, null, 2));
}

// Leer ventas desde el archivo JSON
function readVentas() {
  return JSON.parse(fs.readFileSync('./data/ventas.json', 'utf-8'));
}

// Guardar ventas en el archivo JSON
function saveVentas(ventas) {
  fs.writeFileSync('./data/ventas.json', JSON.stringify(ventas, null, 2));
}

// Ruta para obtener todos los productos
app.get('./data/productos', (req, res) => {
  const productos = readProducts();
  res.json(productos);
});

// Ruta para agregar un producto
app.post('./data/productos', (req, res) => {
  const productos = readProducts();
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1; // Asignar un ID único
  productos.push(nuevoProducto);
  saveProducts(productos);
  res.json({ message: 'Producto agregado con éxito', producto: nuevoProducto });
});

// Ruta para eliminar un producto por ID
app.delete('./data/productos/:id', (req, res) => {
  const productos = readProducts();
  const productoId = parseInt(req.params.id);
  const productoIndex = productos.findIndex((producto) => producto.id === productoId);
  if (productoIndex !== -1) {
    productos.splice(productoIndex, 1);
    saveProducts(productos);
    res.json({ message: 'Producto eliminado con éxito' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Ruta para obtener todos los clientes
app.get('./data/clientes', (req, res) => {
  const clientes = readClientes();
  res.json(clientes);
});

// Ruta para agregar un cliente
app.post('./data/clientes', (req, res) => {
  const clientes = readClientes();
  const nuevoCliente = req.body;
  nuevoCliente.id = clientes.length + 1; // Asignar un ID único
  clientes.push(nuevoCliente);
  saveClientes(clientes);
  res.json({ message: 'Cliente agregado con éxito', cliente: nuevoCliente });
});

// Ruta para eliminar un cliente por ID
app.delete('./data/clientes/:id', (req, res) => {
  const clientes = readClientes();
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === clienteId);
  if (clienteIndex !== -1) {
    clientes.splice(clienteIndex, 1);
    saveClientes(clientes);
    res.json({ message: 'Cliente eliminado con éxito' });
  } else {
    res.status(404).json({ message: 'Cliente no encontrado' });
  }
});

// Ruta para obtener todas las ventas
app.get('./data/ventas', (req, res) => {
  const ventas = readVentas();
  res.json(ventas);
});

// Ruta para agregar una venta
app.post('./data/ventas', (req, res) => {
  const ventas = readVentas();
  const nuevaVenta = req.body;
  nuevaVenta.id = ventas.length + 1; // Asignar un ID único
  ventas.push(nuevaVenta);
  saveVentas(ventas);
  res.json({ message: 'Venta agregada con éxito', venta: nuevaVenta });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

