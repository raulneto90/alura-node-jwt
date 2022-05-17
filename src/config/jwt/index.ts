export default {
  secret: process.env.JWT_SECRET || 'development',
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
