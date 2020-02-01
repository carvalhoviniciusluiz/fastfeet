require('../bootstrap');

export default {
  secret: process.env.APP_SECRET || 'secret',
  expiresIn: '7d',
};
