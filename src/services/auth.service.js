const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Users = require('../models/Users');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
     process.env.SECRET,
    { expiresIn: '24h' }
  );
};

function validateLogin(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(user);
}

function validateSignup(user) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(user);
}

const signup = async ({ first_name, last_name, email, username, password }) => {
  const { error } = validateSignup({ first_name, last_name, email, username, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    const newUser = await User.create({ first_name, last_name, email, username, password });
    const token = generateToken(newUser);
    return { token };
  } catch (error) {
    throw new Error('Error in signup');
  }
};

const login = async ({ username, password }) => {
  const { error } = validateLogin({ username, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }

    const token = generateToken(user);
    return { token };
  } catch (error) {
    throw new Error('Error in login');
  }
};

module.exports = { signup, login };
