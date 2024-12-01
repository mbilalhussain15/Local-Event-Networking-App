import http from 'http';
import { Server as socketIo } from 'socket.io';

// To store the Socket.IO instance
let io;
let users = {}; // Track connected users by userId

// Initialize socket.io with the HTTP server
export const initializeSocket = (server) => {
  io = new socketIo(server);  // Initialize Socket.IO with the HTTP server

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register user socket by userId
    socket.on('register', (userId) => {
      users[userId] = socket.id;
      console.log(`User with ID ${userId} connected`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          console.log(`User with ID ${userId} disconnected`);
          break;
        }
      }
    });
  });
};

// Send notification to a specific user
export const sendNotificationToUser = (userId, message) => {
  if (users[userId]) {
    io.to(users[userId]).emit('notification', { message });
  } else {
    console.log('User not connected');
  }
};

// API endpoint to send a notification
export const sendNotification = (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: 'User ID and message are required' });
  }

  sendNotificationToUser(userId, message);  // Send notification to the user
  res.status(200).json({ message: 'Notification sent successfully' });
};
