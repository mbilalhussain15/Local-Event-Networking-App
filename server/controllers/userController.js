// controllers/userController.js
import User from '../models/registration.js'; // Import User model

export class UserManager {
  // Register user in MongoDB
  async registerUser(firstName, lastName, email, password, profileImage) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User with this email already exists.');
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      profileImage,
    });

    await newUser.save();
    return newUser;
  }

  // Authenticate user
  async authenticateUser(email, password) {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    return user; // Return the user object for token generation
  }

  // Get all users
  async getUsers() {
    return await User.find();
  }
}
