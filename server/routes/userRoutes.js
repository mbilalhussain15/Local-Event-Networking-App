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

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/protected', protectedRoute);

router.get('/users',verifyToken, getUsers);            
router.get('/users/:id',verifyToken, getUser);     
router.put('/users/:id',verifyToken, updateUser);      
router.delete('/users/:id',verifyToken, deleteUser);

router.put('/users/:id/language', verifyToken, updateUserLanguage);
router.put('/updatePassword/:userId', updatePassword);

export default router;
