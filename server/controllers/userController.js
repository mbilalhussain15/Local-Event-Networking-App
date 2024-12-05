import User from '../models/registration.js';
import bcrypt from 'bcryptjs';
import { TokenManager } from '../utils/jwtTokenManager.js'; 
import { sendNotificationToUser } from './notificationController.js';


export const register = async (req, res) => {
  const { firstName, lastName, email, password, profileImage, language = 'English', isActive = true, phone } = req.body;
 
  // Check if required fields are present
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'First name, last name, email, and password are required.' });
  }
 
  try {
    const userExists = await User.findOne({ email });
 
    if (userExists) {
      throw new Error('User with this email already exists.');
    }
 
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // Create new user with optional/default fields
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: profileImage || null, // Set to null if not provided
      isActive,
      language,
      phone: phone || null, // Set to null if not provided
    });
 
    await newUser.save();
 
    // Send notification (optional)
    sendNotificationToUser(newUser._id, 'Welcome to the app!');
 
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
 
  } catch (error) {
    res.status(400).json({ message: error.message });
   
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Step 2: Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Step 3: Generate a JWT token with user information (you may want to use user ID for better security)
    const token = TokenManager.generateToken({ userId: user._id, email: user.email });

    // Step 4: Set cookie with token, secure only in HTTPS and HttpOnly for security
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,  // 1 hour expiration
      path: '/',
    });

    // Step 5: Respond with success
    res.status(200).json({ message: 'Login successful.' });

  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(401).json({ message: 'Server error, please try again later.' });
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
  
  export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { userId } = req.params; // Assuming the userId is sent in the URL params
  
    try {
      // Step 1: Validate input
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match.' });
      }
  
      // Step 2: Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Step 3: Check if the old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect.' });
      }
  
      // Step 4: Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Step 5: Update the user's password in the database
      user.password = hashedNewPassword; // Update the password field with the new hashed password
  
      // **Important:** Ensure you're calling .save() to persist changes
      await user.save();  // This will save the updated user with the new password
  
      // Step 6: Generate a new token (optional but can be useful)
      const token = TokenManager.generateToken({ userId: user._id, email: user.email });
  
      // Set the token in cookies (or you can return it in the response if needed)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Ensures cookies are sent only over HTTPS in production
        maxAge: 60 * 60 * 1000,  // 1 hour expiration
        path: '/',  // Make the cookie available across the entire domain
      });
  
      // Step 7: Respond with success
      res.status(200).json({ message: 'Password updated successfully. Please log in again with the new password.' });
  
    } catch (error) {
      console.error(error);  // Log error for debugging
      res.status(400).json({ message: error.message });
    }
  };

