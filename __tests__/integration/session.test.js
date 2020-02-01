import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(truncate);

  it('should return jwt token when authenticated', async () => {
    const {
      body: { email },
    } = await request(app)
      .post('/users')
      .send({
        name: 'Vinicius Carvalho',
        email: 'carvalho.viniciusluiz@gmail.com',
        password: '123123',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate with invalid credentials', async () => {
    try {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'Vinicius Carvalho',
          email: 'carvalho.viniciusluiz@gmail.com',
          password: '123123',
        });

      await request(app)
        .post('/sessions')
        .send({
          email: response.body.email,
          password: '123456',
        });
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  it('should not authenticate with user not found', async () => {
    try {
      await request(app)
        .post('/sessions')
        .send({
          email: 'carvalho.juliamarques@gmail.com',
          password: '123456',
        });
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  // @TODO
  // it('should be able to access private routes when authenticated', () => {});

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
