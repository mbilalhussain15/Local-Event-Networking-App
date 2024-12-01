import jwt from 'jsonwebtoken';

const TOKEN_EXPIRATION = '1h'; // Token expiration time

export class TokenManager {
  // Method to generate JWT token with userId and email in the payload
  static generateToken(userId, email) {
    const payload = { 
      userId, 
      email 
    };

    return jwt.sign(payload, process.env.SIGNATURE_KEY, { expiresIn: TOKEN_EXPIRATION });
  }

  // Method to verify the token
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SIGNATURE_KEY);  // Use the same key as in generateToken
    } catch (err) {
      throw new Error('Invalid or expired token.');
    }
  }
}




// import jwt from 'jsonwebtoken';

// const TOKEN_EXPIRATION = '1h'; // Token expiration time

// export class TokenManager {
//   static generateToken(payload) {
//     return jwt.sign(payload, process.env.SIGNATURE_KEY, { expiresIn: TOKEN_EXPIRATION });
//   }

//   static verifyToken(token) {
//     try {
//       return jwt.verify(token, SECRET_KEY);
//     } catch (err) {
//       throw new Error('Invalid or expired token.');
//     }
//   }
// }
