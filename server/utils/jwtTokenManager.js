import jwt from 'jsonwebtoken';

const SECRET_KEY = 'andyBilalZabi'; // Directly using a hardcoded secret key
const TOKEN_EXPIRATION = '1h'; // Token expiration time

export class TokenManager {
  static generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new Error('Invalid or expired token.');
    }
  }
}
