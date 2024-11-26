import User from '../models/registration.js'; // Import User model
import bcrypt from 'bcryptjs';  // Import bcryptjs for password hashing

export class UserManager {
  async registerUser(firstName, lastName, email, password, profileImage) {
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
    return newUser;
  }

  // Authenticate user
  async authenticateUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    return user; // Return the user object for token generation
  }

  // Get all users
  async getUsers() {
    return await User.find();
  }
}
