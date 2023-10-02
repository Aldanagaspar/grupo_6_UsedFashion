const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../public/img/users'), 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/profile', authMiddleware,usersController.profile)

router.get('/register', guestMiddleware,usersController.registerView);
router.post('/register', upload.single('profilePicture'),usersController.register);

router.get('/:id/myProducts',productsController.listadoProductosUsuario);

router.get('/login', guestMiddleware,usersController.loginView);
router.post('/login', usersController.login)

module.exports = router;