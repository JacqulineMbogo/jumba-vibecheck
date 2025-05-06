const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const signup = async (req, res, next) => {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
      }
  const { username, email, password } = req.body;

try{
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    console.log("existingUser:", existingUser);
    return next(new HttpError('User exists already, please login instead.', 422));
  }
 
} catch (err) {
  console.log(err);
  return next(new HttpError('Creating user failed, please try again.', 500));
}

  const createdUser = new User({
    username,
    email,
    password
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Creating user failed, please try again.', 500));
  }
  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
      }
  const { email, password } = req.body;

  try{
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser || existingUser.password !== password) {
      return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }

  } catch (err) {
    console.log(err);
    return next(new HttpError('Creating user failed, please try again.', 500));
  }



  res.json({message: 'Logged in!'});
};

exports.signup = signup;
exports.login = login;