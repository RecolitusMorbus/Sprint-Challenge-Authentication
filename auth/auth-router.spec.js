const server = require('../api/server.js');
const request = require('supertest');

describe('router\'s', function(){
  describe('POST /login', function() {
    it('should return status(401) without property token.', function() {
      const user = {
        username: '',
        password: 'password',
        }
      
      return request(server)
        .post('/api/auth/login')
        .send(user)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it('should return status(401) message without property token.', function() {
      const user = {
        username: '',
        password: 'password',
        }
      
      return request(server)
      .post('/api/auth/login')
        .send(user)
        .then(res => {
          console.log('token', res.body.token);
          expect(res.body).toStrictEqual({ message: 'Invalid credentials.' });
        });
    });
  });
});