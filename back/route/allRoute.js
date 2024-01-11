const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/addData', userController.addData);
router.post('/getData', userController.getData);
module.exports = router;
