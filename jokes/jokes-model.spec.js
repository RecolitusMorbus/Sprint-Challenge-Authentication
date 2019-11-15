const request = require('supertest');
const db = require('../database/dbConfig.js');
const { add } = require('./jokes-model.js');

describe('joke-model\'s', function() {
  describe('POST /register', function() {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should return add a user.', async function() {
      await add({
        username: 'Dad1',
        password: 'password'
      });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('Should add the provided user', async function() {
      await add({
        username: 'Dad1',
        password: 'password'
      });
      await add({
        username: 'Dad2',
        password: 'password'
      });

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('Dad1');
      expect(users[1].username).toBe('Dad2');
    });
  });
});