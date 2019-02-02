const expect = require('chai').expect;
const request = require('supertest');

const makeServer = require('./makeServer');
let server;

describe('Route controllers test', () => {
  beforeEach((done) => {
    makeServer()
      .then(s => {
        server = s;
        done();
      })
  });

  afterEach(() => {
    server.close((done) => {
      done();
    })
  })

  describe('Unknown route', () => {
    it('Should return error for unknown route', (done) => {
      request(server)
        .get('/random')
        .expect(404, done);
    })
  })

  describe('GET /object/key', () => {
    it('Should get the latest value of \'mykey\'', (done) => {
      request(server)
        .get(`/object/${key}`)
        .expect(200)
        .expect(res => {
          // expect()
        })
        .end(done)
    });
  })

  describe('POST /object no nesting', () => {
    it('Should add a string', (done) => {
      request(server)
        .post('/object')
        .send({ mykey: 'awesome!' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          request(server)
            .get('/object/mykey')
            .expect(200)
            .expect(res => {
              expect(res.body.value).to.equal('awesome!')
            })
            .end(done);
        })
    });

    it('Should not accept empty body', (done) => {
      request(server)
        .post('/object')
        .send({})
        .expect(400, done)
    });
  });
  
  describe('POST /object nested', () => {
    it('Should add a string', (done) => {
      request(server)
        .post('/object')
        .send({ mykey: { feeling: 'awesome' } })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          request(server)
            .get('/object/mykey')
            .expect(200)
            .expect(res => {
              expect(res.body.value.feeling).to.equal('awesome')
            })
            .end(done);
        })
    });
  });
});
