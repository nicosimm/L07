const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

app.set('view engine', 'ejs');

// In-memory data for students
let products= [
    {id:1, productname: 'Apples', quantity:100, price:1.50},
    {id:2, productname: 'Bananas', quantity:75, price:0.80},
    {id:3, productname: 'Milk', quantity:50, price:3.50},
    {id:4, productname: 'Bread', quantity:80, price:1.80}
];


//---------------------------------------------------------
//web pages (reading, creating, updating, deleting)

// Display the list of products
app.get('/', (req, res) => {
  res.render('index', { products: products });
});

// Display a product's details
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.render('productInfo', { product: product });
});


//Insert a Product
app.get('/products/add', (req, res) => { 
    res.send('/addNewProduct');
});

app.post('/products/add', (req, res) => {
  const productname =req.body.productname;
  const quantity = req.body.quantity;
  const price = req.body.price;    
  const id = products.length + 1;
  const newProduct = { productname, quantity, price, id};
 
  students.push(newProduct);
  res.redirect('/');
});


//Edit a product
app.get('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.render('updateProduct', { product: product });
});

app.post('/products/:id/edit', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product.productname = req.body.productname;
  product.quantity = req.body.quantity;
  product.price = req.body.price;

  res.redirect('/');
});

//Delete a product
app.get('/products/:id/delete', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.post('/products/:id/delete', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully started
  console.log(`Server is running at http://localhost:${port}`);
});

