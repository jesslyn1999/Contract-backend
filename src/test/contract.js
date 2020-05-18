import contractModel from '../models/contract';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Contract', () => {
    beforeEach(done => {
        //Before each test we empty the database
        contractModel.deleteMany({}, () => {
            done();
        });
    });

    describe('GET /download/:id', () => {
        it('should response with 400 bad request because id not found', done => {
            chai.request(server)
                .get('/api/contract/download/5e9863d277cd0f0349899c3b')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(400);
                    res.body.success.should.be.equal(false);
                    done();
                });
        });
    });

    describe('GET /get_contract/:page?perpage=', () => {
        it('should response with 200 ok but gives back empty data', done => {
            chai.request(server)
                .get('/api/contract/get_contract/1?perpage=5')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('GET /get_all_contract', () => {
        it('should response with 200 ok but gives back empty data', done => {
            chai.request(server)
                .get('/api/contract/get_all_contract')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});
