// server/index.js

const express = require("express");
const db = require('./queries')

var cors = require('cors')

var bodyParser = require('body-parser')
 
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

app.get('/api/users', db.getUsers)
app.get('/api/products/categories', db.getProductCategories)
app.get('/api/products/:product_id', db.getProductsById)
app.get('/api/products/categories/:category_id', db.getProducts)
app.get('/api/users/:user_id/cart', db.getCartById)
app.post('/api/users/:user_id/cart', db.addToCart)
app.delete('/api/users/:user_id/cart', db.removeFromCart)
app.get('/api/users/:user_id/cart/checkout', db.checkOut)
app.get('/api/users/:user_id', db.getUser)

