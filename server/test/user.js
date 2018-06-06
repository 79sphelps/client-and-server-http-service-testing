//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST user', () => {
        it('it should not POST a user without name field', (done) => {
            let user = {
                editable: "false"
            }
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('name');
                    res.body.errors.name.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST a user ', (done) => {
            let user = {
                name: "Rick Crenshaw",
                editable: "false"
            }
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('User successfully added!');
                    res.body.user.should.have.property('name');
                    res.body.user.should.have.property('editable');
                    done();
                });
        });

    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            let user = new User({
                name: "Burt Crenshaw",
                editable: "false"
            });
            user.save((err, user) => {
                chai.request(server)
                    .get('/api/users/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('editable');
                        res.body.should.have.property('_id').eql(user.id);
                        done();
                    });
            });

        });
    });


    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id user', () => {
        it('it should UPDATE a user given the id', (done) => {
            let user = new User({
                name: "Nicole Phelps",
                editable: "false"
            })
            user.save((err, user) => {
                chai.request(server)
                    .put('/api/users/' + user.id)
                    .send({
                        name: "Nicole Phelpsy",
                        editable: "false"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User updated!');
                        //res.body.user.should.have.property('rawData').eql("{ n: 1, nModified: 1, ok: 1 }");
                        chai.request(server)
                            .get('/api/users/' + user.id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('name').eql('Nicole Phelpsy');
                            });
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
            let user = new User({
                name: "Talicia Phelps",
                editable: "false"
            })
            user.save((err, user) => {
                chai.request(server)
                    .delete('/api/users/' + user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User successfully deleted!');
                        console.log(res.body);
                        console.log(typeof res.body.rawData);
                        //res.body.result.should.have.property('ok').eql(1);
                        //res.body.result.should.have.property('n').eql(1);
                        //res.body.result.should.have.property('rawData').eql({ n: 1, ok: 1})
                        done();
                    });
            });
        });
    });


});