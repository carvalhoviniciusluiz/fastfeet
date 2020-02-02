import factory from '../factories';
import truncate from '../util/truncate';

const bcrypt = require('bcryptjs');

describe('User', () => {
  beforeEach(truncate);

  it('should check user password is valid', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const checkPassword = await user.checkPassword('123456');
    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(checkPassword).toBe(true);
    expect(compareHash).toBe(true);
  });
});
