import multer from "multer";
import path from "path";
import fs from "fs";

// Use the UPLOAD_PATH from environment variable
const uploadPath = process.env.UPLOAD_PATH || './uploads';

// Create storage destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get userId and eventId from the request body or params
        const userId = req.body.userId || req.params.userId;
        const eventId = req.body.eventId || req.params.eventId;

        // Dynamically create the file path using the userId and eventId
        const dir = path.join(uploadPath, 'users', userId, 'events', eventId);

        // Ensure the directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Pass the directory path to multer
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Generate filename with timestamp to ensure uniqueness
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed!"), false);
    }
};

export default multer({ storage, fileFilter });
