import sppbjModel from '../models/sppbj';
import templateModel from '../models/template';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('SPPBJ Document', () => {
    beforeEach(done => {
        templateModel.deleteMany();
        sppbjModel.deleteMany({}, () => {
            done();
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET all SPPBJ Document', () => {
        it('it should GET all the SPPBJ Document', done => {
            chai.request(server)
                .get('/api/sppbj/get_all_sppbj')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the GET SPPBJ with the specified page & paginations
     */
    describe('/GET/:page SPPBJ Document', () => {
        it('it should GET all SPPBJ Document within the specified page', done => {
            let sppbj = new sppbjModel({
                no_sppbj: '25/400J',
                template_id: '',
                data_pemenang: {},
                data_form: {},
            });
            sppbj.save(() => {
                let sppbj2 = new sppbjModel({
                    no_sppbj: '25/400J2',
                    template_id: '',
                    data_pemenang: {},
                    data_form: {},
                });
                sppbj2.save(() => {
                    chai.request(server)
                        .get('/api/sppbj/get_sppbj/1?perpage=1')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('data');
                            res.body.should.have.property('pages');
                            res.body.pages.should.be.eql(2);
                            res.body.data.should.be.a('array');
                            res.body.data[0].no_sppbj.should.be.eql('25/400J');
                            done();
                        });
                });
            });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST SPPBJ', () => {
        it('it should POST a SPPBJ Document and receive a .docx file', done => {
            let template = new templateModel({
                title: 'Title test',
                description: 'Just a test',
                content: 'Test',
            });
            template.save(function(err) {
                if (!err) {
                    let sppbj = {
                        no_sppbj: '25/400J',
                        id_template: template.id,
                        data_pemenang: {},
                        data_form: {},
                    };
                    chai.request(server)
                        .post('/api/sppbj/generate_sppbj')
                        .send(sppbj)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.header['content-type'].should.be.eql(
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            );
                            res.header['content-disposition'].should.be.eql(
                                'attachment; filename= SPPBJ.docx',
                            );
                            res.body.should.be.a('object');
                            done();
                        });
                }
            });
        });
    });
});
