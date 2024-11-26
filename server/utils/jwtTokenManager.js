import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = '1h'; // Token expiration time

export class TokenManager {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SIGNATURE_KEY, { expiresIn: TOKEN_EXPIRATION });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new Error('Invalid or expired token.');
    }
  }
}
