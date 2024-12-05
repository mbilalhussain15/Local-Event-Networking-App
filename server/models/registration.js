import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Optional field
  },
  language: {
    type: String,
    default: 'English', // Default value
  },
  isActive: {
    type: Boolean,
    default: true, // Default value
  },
  phone: {
    type: String, // Optional field
    required: false, // Make phone optional
  },
});


const User = mongoose.model('User', userSchema);

export default User;
