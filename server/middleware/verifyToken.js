import { TokenManager } from '../utils/jwtTokenManager.js';  // Adjust the path based on your project structure

// Middleware to check if the token is valid
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;  // Get the token from the cookies

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing.' });
  }

  try {
    // Verify the token
    const decoded = TokenManager.verifyToken(token);
    req.user = decoded;  // Attach decoded user data to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
