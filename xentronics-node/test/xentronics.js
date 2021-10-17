process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Xentronics', () => {
    describe('/GET heartbeat', () => {
      it('it should GET a heartbeat', (done) => {
            chai.request(server)
            .get('/api')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
    });

    describe('/GET productCategories', () => {
      it('it should GET all the product categories', (done) => {
            chai.request(server)
            .get('/api/products/categories')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
    });

    describe('/GET products by category', () => {
        it('it should not GET all the product in a category given non-int id', (done) => {
              chai.request(server)
              .get('/api/products/categories/asd')
              .end((err, res) => {
                    res.should.have.status(500);
                done();
              });
        });

        it('it should GET all the product in a category', (done) => {
              chai.request(server)
              .get('/api/products/categories/1')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
        });
      });

    describe('/GET product', () => {
        it('it should not GET a product given non-int id', (done) => {
            chai.request(server)
            .get('/api/products/asd')
            .end((err, res) => {
                    res.should.have.status(500);
                done();
            });
        });

        it('it should GET a product given id', (done) => {
            chai.request(server)
            .get('/api/products/1')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.be.a('object');
                done();
            });
        });
    });

    describe('/GET cart by user id', () => {

        it('it should GET all the products in a users cart with non-int user id', (done) => {
            chai.request(server)
            .get('/api/users/asd/cart')
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
      });

        it('it should GET all the products in a users cart', (done) => {
              chai.request(server)
              .get('/api/users/0/cart')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
        });
      });
  
    describe('/POST cart', () => {
        it('it should not ADD product to cart without product id', (done) => {
            let item = {
            }
                chai.request(server)
                .post('/api/users/0/cart')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(500);
                done();
                });
        });
        it('it should ADD product to cart', (done) => {
            let item = {
                product_id: 1,
                qty: 4
            }
                chai.request(server)
                .post('/api/users/0/cart')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.have.property('text').eql("Added: 4 PRODUCT 1 to 0's cart");
                done();
                });
        });
    });

    describe('/DELETE cart', () => {

        it('it should not DELETE a cart item when not given int user id', (done) => {

            chai.request(server)
            .delete('/api/users/asd/cart/1')
            .end((err, res) => {
                res.should.have.status(500);
            done();
            });
        });

        it('it should DELETE a cart item given user and product id', (done) => {


            let item = {
                product_id: 1,
                qty: 4
            }
            chai.request(server)
            .post('/api/users/0/cart')
            .send(item)
            .end((err, res) => {
                    chai.request(server)
                    .delete('/api/users/0/cart/1')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.should.have.property('text').eql("Deleted: PRODUCT 1 in 0's cart");
                    done();
                    });
            });
        });
    });


    describe('/GET checkout by user id', () => {

        it('it should not CHECKOUT all the products with a non-int user id', (done) => {
            chai.request(server)
            .get('/api/users/asd/cart/checkout')
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
      });

        it('it should CHECKOUT all the products in a users cart', (done) => {
              chai.request(server)
              .get('/api/users/0/cart/checkout')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql("User 0 checked out");
                done();
              });
        });
      });


    describe('/GET purchase history by user id', () => {

        it('it should not GET all the products in a users purchase history with a non-int user id', (done) => {
            chai.request(server)
            .get('/api/users/asd')
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
        });

        it('it should GET all the products in a users purchase history', (done) => {
              chai.request(server)
              .get('/api/users/0')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
        });
      });

    describe('SQL injection test', () => {
        it('it should return error when SQL injected', (done) => {
            let item = {
                product_id: 1,
                qty: '; DROP TABLE users;'
            }
                chai.request(server)
                .post('/api/users/0/cart')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(500);
                done();
                });
        });
    });
});