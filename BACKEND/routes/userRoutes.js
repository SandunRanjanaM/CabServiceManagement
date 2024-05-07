const { Router } = require('express');
const { loginController, registerController, authController} = require('../controllers/userCtrl.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = Router();

router.post('/login',loginController)
router.post('/register',registerController);
router.post('/getUserData',authMiddleware,authController);
module.exports = router;
