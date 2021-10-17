# Xentronics by Edward

Hi! Welcome to Xentronics! Since the sample README file isn't accessible (https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)​, I'll try to present all important information in a concise format right here.


## Demo
I have deployed the application here:
https://tantayou999.github.io/ - Frontend
https://xentronics.herokuapp.com/api - Backend

Happy testing!


## Building locally
After pulling from Git, run

    npm install
Then run

    npm run dev
That would default to building both client and server to port 3000 and 3001 respectively.

## Project documentation
The aim of this project is to create an application that holds the data of an online electronic e-commerce store. For the purpose of simplification, the client can only access the page as a single user (id: 1)


### ERD

![ERD diagram](blob:https://i.imgur.com/VkWAVZV.png)
The database is built on PostgreSQL
A simple ERD design with Products grouped by Product Categories, having many-to-many relationships with users in terms of product currently in cart, and products already purchased.

### API
Express.js (Node) is selected as the framework of choice here.
[Swagger-hosted API documentation through OpenAPI specification](https://app.swaggerhub.com/apis-docs/TE-TOTAL-SOLUTIONS/Xentronics/1.0.0#/)

### Web application

The web application is built on React.
 1. Home page - Where the user selects a product category
 2. Category page - Where the user sees all the products under that category
 3. Product page - Where user sees details of the particular product, and where they could select a quantity to add to cart.
 4. Cart page - Where user can see a subtotal, edit the quantity of items, or remove items from cart. User can also proceed to checkout.
 5. Payment page - User makes payment here.
 6. History page - User can view their transaction history on this page.

## Tooling

    npm test

The command above would run nyc with mocha/chai on the backend application. Code coverage for the unit test writtern is over 90%.

    npm run lint

The above command is set up for the backend application to lint with ESLint over [Prettier](https://prettier.io/)

git-pre-push is configured to run the above two tests before pushing

## Security
The API is coded in such a way (Using SQL functions) that the risks on MySQL injection is low. One of the tests in Mocha was written to attempt injecting an SQL DROP TABLE statement into the API.
