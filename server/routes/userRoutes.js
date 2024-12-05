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

router.get('/getUsers',verifyToken, getUsers);            
router.get('/getUserById/:id', getUser);     
router.put('/updateUser/:id',verifyToken, updateUser);      
router.delete('/deleteUserById/:id',verifyToken, deleteUser);

router.put('/:id/language', verifyToken, updateUserLanguage);
router.put('/updatePassword/:userId', updatePassword);

export default router;
