import mongoose from 'mongoose';

// Use the MONGO_URI from the .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No additional options needed
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
