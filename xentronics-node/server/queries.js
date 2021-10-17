const Pool = require('pg').Pool
const config = require('./config.js')
const pool = new Pool(config.db)

const getUsers = (request, response) => {
pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
})
}

const getProductCategories = (request, response) => {
    pool.query('SELECT * FROM productcategories ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProducts = (request, response) => {
    const category_id = parseInt(request.params.category_id)
    pool.query('SELECT * FROM products WHERE category_id = $1 ORDER BY id ASC', [category_id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProductsById = (request, response) => {
    const product_id = parseInt(request.params.product_id)
    pool.query('SELECT * FROM products WHERE id = $1 ORDER BY id ASC', [product_id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCartById = (request, response) => {
    const user_id = parseInt(request.params.user_id)
  
    pool.query('SELECT * FROM productsincart LEFT JOIN (SELECT * FROM products) p ON (productsincart.product_id = p.id) WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const addToCart = (request, response) => {
    const user_id = parseInt(request.params.user_id)
    const product_id = parseInt(request.body.product_id)
    const qty = parseInt(request.body.qty)
    pool.query('INSERT INTO productsincart(product_id, user_id, qty) VALUES ($1,$2,$3) ON CONFLICT (product_id, user_id) DO UPDATE SET qty=$3;', [product_id, user_id, qty], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`Added: ${qty} PRODUCT ${product_id} to ${user_id}'s cart'`)
    })
}


const removeFromCart = (request, response) => {
    const user_id = parseInt(request.params.user_id)
    const product_id = parseInt(request.body.product_id)

    pool.query('DELETE FROM productsincart WHERE user_id = $1 AND product_id = $2', [user_id, product_id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`Deleted: PRODUCT ${product_id} to ${user_id}'s cart`)
    })
}

const checkOut = (request, response) => {
    const user_id = parseInt(request.params.user_id)
    // not done
    pool.query('CALL checkout($1)', [user_id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const getUser = (request, response) => {
    const user_id = parseInt(request.params.user_id)
    pool.query('SELECT * FROM productspurchased WHERE user_id = $1 ORDER BY id ASC', [user_id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getUsers,
    getProductCategories,
    getProducts,
    getProductsById,
    getCartById,
    addToCart,
    removeFromCart,
    checkOut,
    getUser
}