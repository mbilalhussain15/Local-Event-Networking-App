import express from 'express';
import { UserManager } from '../controllers/userController.js'; // Import the UserManager class
import { TokenManager } from '../utils/jwtTokenManager.js'; // Import TokenManager class

const router = express.Router();

const userManager = new UserManager();

  router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, profileImage } = req.body;

  try {
    const newUser = await userManager.registerUser(firstName, lastName, email, password, profileImage);
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userManager.authenticateUser(email, password);
    
    const token = TokenManager.generateToken({ email: user.email });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    TokenManager.verifyToken(token);
    res.status(200).json({ message: 'Logout successful. Token removed from client side.' });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});



router.get('/protected', (req, res) => {
  const { token } = req.body; 

  if (!token) {
    return res.status(401).json({ message: 'Token is missing.' });
  }

  try {
    const decoded = TokenManager.verifyToken(token);

    res.status(200).json({ message: `Welcome ${decoded.email}!`, data: decoded });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router; 
