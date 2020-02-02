import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(truncate);

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to registro with duplicated email', async () => {
    const user = await factory.attrs('User');
    try {
      await request(app)
        .post('/users')
        .send(user);

      await request(app)
        .post('/users')
        .send(user);
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });
});
