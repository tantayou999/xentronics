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

app.get('/users', db.getUsers)
app.get('/products/categories', db.getProductCategories)
app.get('/products/:product_id', db.getProductsById)
app.get('/products/categories/:category_id', db.getProducts)
app.get('/users/:user_id/cart', db.getCartById)
app.post('/users/:user_id/cart', db.addToCart)
app.delete('/users/:user_id/cart', db.removeFromCart)
app.get('/users/:user_id/cart/checkout', db.checkOut)
app.get('/users/:user_id', db.getUser)

