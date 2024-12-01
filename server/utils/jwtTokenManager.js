import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = '1h'; // Token expiration time

export class TokenManager {
  // Method to generate JWT token with userId and email in the payload
  static generateToken(userId, email) {
    const payload = { 
      userId,  // Ensure userId is just a string or ObjectId
      email
    };

    return jwt.sign(payload, process.env.SIGNATURE_KEY, { expiresIn: TOKEN_EXPIRATION });
  }

  // Method to verify the token
  static verifyToken(token) {
    try {
      console.log('Verifying token...'); // Debug log
      return jwt.verify(token, process.env.SIGNATURE_KEY); // Verify the token
    } catch (err) {
      console.error('Token verification failed:', err); // Error log

      // Rethrow specific JWT errors for the caller (middleware) to handle
      if (err.name === 'TokenExpiredError') {
        throw new jwt.TokenExpiredError('Token has expired.', err.expiredAt);
      } else if (err.name === 'JsonWebTokenError') {
        throw new jwt.JsonWebTokenError('Invalid token.');
      } else {
        throw new Error('Token verification failed.'); // Fallback for unexpected errors
      }
    }
  }
}
