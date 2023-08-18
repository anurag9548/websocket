import express from 'express';
import {loginUser, signupUser} from '../controllers/UserController.js';
import {createMessage, getData} from '../controllers/MessageController.js';
import {auth} from '../middleware/auth.js';
import { fileURLToPath} from 'url';
import path, { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();


router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../../index.html');
    res.sendFile(filePath);
    
});
router.get('/test', (req, res) => {
    
    res.json({
        "sucsess": true
    });
    
});
router.post('/login', loginUser);
router.post('/signup', signupUser);
// router.post('/message', auth, createMessage);
router.get('/message/:text', createMessage);
router.get('/get-data/:symbol', getData);

export default router;