import User from '../models/registration.js';
import bcrypt from 'bcryptjs';
import { TokenManager } from '../utils/jwtTokenManager.js'; 

export class UserController {

  async register(req, res) {
    const { firstName, lastName, email, password, profileImage } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        throw new Error('User with this email already exists.');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,  
        profileImage,
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.', user: newUser });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password.');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid email or password.');
      }

      const token = TokenManager.generateToken({ email: user.email });

      res.status(200).json({ message: 'Login successful.', token });

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  logout(req, res) {
    res.status(200).json({ message: 'Logout successful.' });
  }

  async protectedRoute(req, res) {
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
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  }
}
