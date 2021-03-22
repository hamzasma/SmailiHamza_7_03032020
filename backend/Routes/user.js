const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
//configuration des routages//
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/connected',auth, userCtrl.isConnetcted);
router.get('/allusers',auth, userCtrl.getAlluser);
router.put('/update',auth, userCtrl.updateUser);
router.delete('/delete',auth, userCtrl.deleteUser);
router.put('/activite/:Id',auth, userCtrl.activiteUserByAdmin);
router.put('/disactivite/:Id',auth, userCtrl.disactiviteUserByAdmin);
module.exports = router;