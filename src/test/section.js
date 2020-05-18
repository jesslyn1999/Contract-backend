import sectionModel from '../models/section';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Sections', () => {
    beforeEach(done => {
        //Before each test we empty the database
        sectionModel.deleteMany({}, () => {
            done();
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET all sections', () => {
        it('it should GET all the sections', done => {
            chai.request(server)
                .get('/api/section/all')
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
     * Test the GET section with the specified page & paginations
     */
    describe('/GET/:page', () => {
        it('it should GET all sections with the specified page', done => {
            let section = new sectionModel({
                title: 'Title test',
                description: 'Just a test',
                content: 'Test',
            });
            section.save(() => {
                let section2 = new sectionModel({
                    title: 'Title test2',
                    description: 'Just a test2',
                    content: 'Test2',
                });
                section2.save(() => {
                    chai.request(server)
                        .get('/api/section/1?perpage=1')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('data');
                            res.body.should.have.property('pages');
                            res.body.pages.should.be.eql(2);
                            res.body.data.should.be.a('array');
                            res.body.data[0].title.should.be.eql('Title test');
                            done();
                        });
                });
            });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST section', () => {
        it('it should POST a section', done => {
            let section = {
                title: 'Title test',
                description: 'Just a test',
                content: 'Test',
            };
            chai.request(server)
                .post('/api/section')
                .send(section)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('request');
                    res.body.request.should.have.property('success');
                    res.body.request.success.should.be.eql(true);
                    done();
                });
        });
    });

    /*
     * Test the GET section with a specified id, then update it
     */
    describe('/GET/:id and /POST section', () => {
        it('it should GET a section with the specified id', done => {
            let section = new sectionModel({
                title: 'Test with id',
                description: 'Just a test',
                content: 'Test',
            });
            section.save((err, section) => {
                chai.request(server)
                    .get('/api/section/?id=' + section.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.should.have.property('success');
                        res.body.success.should.be.eql(true);
                        res.body.data.should.be.a('object');
                        res.body.data.title.should.be.eql('Test with id');
                        done();
                    });
            });
        });
    });

    /*
     * Test the /POST route to update the section
     */
    describe('/POST update section', () => {
        it('it should POST to update section', done => {
            let section = new sectionModel({
                title: 'Test with id',
                description: 'Just a test',
                content: 'Test',
            });
            section.save((err, section) => {
                let sectionUpdated = {
                    id: section.id,
                    title: 'Updated title',
                    description: 'Just a test',
                    content: 'Test',
                };

                // Update the section
                chai.request(server)
                    .post('/api/section')
                    .send(sectionUpdated)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('request');
                        res.body.request.should.have.property('success');
                        res.body.request.success.should.be.eql(true);

                        // Get the updated section
                        chai.request(server)
                            .get('/api/section/?id=' + section.id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('data');
                                res.body.should.have.property('success');
                                res.body.success.should.be.eql(true);
                                res.body.data.should.be.a('object');
                                res.body.data.title.should.be.eql('Updated title');
                                done();
                            });
                    });
            });
        });
    });

    /*
     * Test to delete a section
     */
    describe('/DELETE delete section', () => {
        it('it should DELETE a section', done => {
            let section = new sectionModel({
                title: 'Test delete a section',
                description: 'Just a test',
                content: 'Test',
            });
            section.save((err, section) => {
                chai.request(server)
                    .delete('/api/section/' + section.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('request');
                        res.body.request.should.have.property('success');
                        res.body.request.success.should.be.eql(true);
                        done();
                    });
            });
        });
    });
});
