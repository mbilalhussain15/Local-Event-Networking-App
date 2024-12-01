import { TokenManager } from '../utils/jwtTokenManager.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;  // Get token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Token is missing.' });
  }

  try {
    // Decode and verify the token
    const decoded = TokenManager.verifyToken(token);

    // Attach the decoded token data to the request object for further use
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
