const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user-controller');
const User = require('../models/user');

const router = express.Router();

router.post('/signup',
    [
        check('username')
          .not()
          .isEmpty(),
        check('email')
        .not()
        .isEmpty(),
        check('password')
        .not()
        .isEmpty(),
      ],
    
    usersController.signup);

router.post('/login',
    [
        check('email')
        .not()
        .isEmpty(),
        check('password')
        .not()
        .isEmpty(),
      ],
    usersController.login);

module.exports = router;