const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userpostCtrl = require('../controllers/userpost');
//configuration des routages//
router.get('/:id', auth ,userpostCtrl.getAllPost);
router.post('/', auth, userpostCtrl.createPost);
router.put('/:id', auth, userpostCtrl.modifyPost);
router.delete('/:id',auth,  userpostCtrl.deletePost);
module.exports = router;