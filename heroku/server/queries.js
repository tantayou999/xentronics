const { Pool } = require("pg");
const config = require("./config.json");

const pool = new Pool(config.db);

const getProductCategories = (request, response) => {
  pool.query(
    "SELECT * FROM productcategories ORDER BY id ASC",
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getProducts = (request, response) => {
  const { category_id } = request.params;
  pool.query(
    "SELECT * FROM products WHERE category_id = $1 ORDER BY id ASC",
    [category_id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getProductsById = (request, response) => {
  const { product_id } = request.params;
  pool.query(
    "SELECT * FROM products WHERE id = $1 ORDER BY id ASC",
    [product_id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCartById = (request, response) => {
  const { user_id } = request.params;

  pool.query(
    "SELECT * FROM productsincart LEFT JOIN (SELECT * FROM products) p ON (productsincart.product_id = p.id) WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addToCart = (request, response) => {
  const { user_id } = request.params;
  const { product_id } = request.body;
  const { qty } = request.body;
  pool.query(
    "INSERT INTO productsincart(product_id, user_id, qty) VALUES ($1,$2,$3) ON CONFLICT (product_id, user_id) DO UPDATE SET qty=$3;",
    [product_id, user_id, qty],
    (error) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response
        .status(200)
        .send(`Added: ${qty} PRODUCT ${product_id} to ${user_id}'s cart`);
    }
  );
};

const removeFromCart = (request, response) => {
  const { user_id, product_id } = request.params;

  pool.query(
    "DELETE FROM productsincart WHERE user_id = $1 AND product_id = $2",
    [user_id, product_id],
    (error) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response
        .status(200)
        .send(`Deleted: PRODUCT ${product_id} in ${user_id}'s cart`);
    }
  );
};

const checkOut = (request, response) => {
  const { user_id } = request.params;
  pool.query("CALL checkout($1)", [user_id], (error) => {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.status(200).send(`User ${user_id} checked out`);
  });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  pool.query(
    "SELECT * FROM productspurchased LEFT JOIN (SELECT * FROM products) p ON (productspurchased.product_id = p.id) WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.status(200).json(results.rows);
    }
  );
};
module.exports = {
  getProductCategories,
  getProducts,
  getProductsById,
  getCartById,
  addToCart,
  removeFromCart,
  checkOut,
  getUser,
};
