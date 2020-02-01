import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(truncate);

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate with invalid credentials', async () => {
    try {
      const user = await factory.create('User', {
        password: '123123',
      });

      await request(app)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456',
        });
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  it('should not authenticate with user not found', async () => {
    const { email, password } = await factory.attrs('User');
    try {
      await request(app)
        .post('/sessions')
        .send({
          email,
          password,
        });
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    try {
      await request(app).get('/users');
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    try {
      await request(app)
        .get('/users')
        .set('Authorization', `Bearer 123123`);
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });
});
