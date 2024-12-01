import User from '../models/registration.js';
import bcrypt from 'bcryptjs';
import { TokenManager } from '../utils/jwtTokenManager.js'; 


export const register = async (req, res) => {
  const { firstName, lastName, email, password, profileImage, language = 'English', isActive = true, phone } = req.body;

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
      isActive,
      language,  // Set default language as English or user-provided
      phone, // Use phone instead of mobileNumber
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', user: newUser });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



  export const login = async (req, res) => {
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
  
      // Set cookie named 'token' with 1-hour expiration
      res.cookie('token', token, { 
        httpOnly: true, 
        maxAge: 60 * 60 * 1000,  // 1 hour
        path: '/',  
      });
  
      res.status(200).json({ message: 'Login successful.' });
  
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
  
  export const logout = (req, res) => {
    res.clearCookie('token', { 
      httpOnly: true, 
      path: '/',  // Consistent with login 
    });
  
    res.status(200).json({ message: 'Logout successful. Token removed from client side.' });
  };
  

  export const protectedRoute = (req, res) => {
    const token = req.cookies.authToken;  // Get token from cookie
  
    if (!token) {
      return res.status(401).json({ message: 'Token is missing.' });
    }
  
    try {
      const decoded = TokenManager.verifyToken(token);
      res.status(200).json({ message: `Welcome ${decoded.email}!`, data: decoded });
  
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
  

  export const getUsers= async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  }

  export const getUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id); // Changed from findOne to findById
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
  }
  

  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, profileImage } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id, 
        { firstName, lastName, profileImage }, 
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
  }
  

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id); // Changed to findByIdAndDelete
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: `Error deleting user: ${error.message}` });
    }
  }
  
  export const updateUserLanguage = async (req, res) => {
    const { id } = req.params;
    const { language } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { language },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({ message: 'Language updated successfully.', user: updatedUser });
  
    } catch (error) {
      res.status(500).json({ message: `Error updating language: ${error.message}` });
    }
  };
  
  export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Extract user information from JWT payload (req.user set by verifyToken middleware)
      const { userId, email } = req.user;
  
      // Find the user by userId (userId is stored in the JWT payload)
      const user = await User.findById(userId); // or use email if necessary
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the old password matches the hashed password stored in the database
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect old password.' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      user.password = hashedPassword;
  
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

