import express from 'express';
import { 
  deleteUser, 
  getUsers, 
  getUser,
  login, 
  logout, 
  protectedRoute, 
  register,
  updatePassword,
  updateUserLanguage, 
  updateUser 
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js'
import {upload} from "../middleware/uploadProfile.js";
import path from "path";
import fs from "fs";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/protected', protectedRoute);

router.get('/getUsers',verifyToken, getUsers);            
router.get('/getUserById/:id', getUser);     
// router.put('/updateUser/:id',verifyToken, updateUser);
const uploadPath = path.join(process.cwd(), 'upload');
router.use('/upload', express.static(uploadPath));
router.put("/updateUser/:id", upload.single("profileImage"), updateUser);      
router.delete('/deleteUserById/:id',verifyToken, deleteUser);

router.put('/:id/language', verifyToken, updateUserLanguage);
router.put('/updatePassword/:userId', updatePassword);

export default router;
