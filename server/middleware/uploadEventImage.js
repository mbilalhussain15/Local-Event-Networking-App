import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define storage for multer
const uploadEventPath = path.join(process.cwd(), 'upload', 'events');

if (!fs.existsSync(uploadEventPath)) {
  fs.mkdirSync(uploadEventPath, { recursive: true });
}

const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { userId } = req.params; // Access userId from the URL parameter
      const eventId = req.params.eventId; // Access eventId from the URL parameter
  
      // Log to check if the userId and eventId are present
    //   console.log("userId: ", userId);  // Check if user_id is available
    //   console.log("eventId: ", eventId);  // Check if eventId is available
    //   console.log("req.params: ", req.params);
      if (!userId || !eventId) {
        return cb(new Error('userId or eventId is missing'));
      }
  
      const eventDir = path.join(uploadEventPath, userId, eventId); // Folder will be created based on userId and eventId
  
      if (!fs.existsSync(eventDir)) {
        fs.mkdirSync(eventDir, { recursive: true });
      }
  
      console.log("Image upload directory: ", eventDir); // Debugging statement
      cb(null, eventDir); // Save in the event-specific folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `event_image_${Date.now()}${ext}`); // Save with a unique name
    },
  });
  

// Initialize multer with the storage configuration
export const uploadEvent = multer({ storage: eventStorage });

