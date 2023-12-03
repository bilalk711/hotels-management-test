const authService = require('../services/auth.service');
const HTTP_STATUSES = require("./HTTP_STATUSES.json");

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const token = await authService.signup({ first_name, last_name, email, username, password });

    res.status(HTTP_STATUSES.CREATED).json(token);
  } catch (error) {
    res.status(HTTP_STATUSES.BAD_REQUEST).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login({ username, password });

    res.status(HTTP_STATUSES.OK).json(token);
  } catch (error) {
    res.status(HTTP_STATUSES.BAD_REQUEST).send(error.message);
  }
};

module.exports = { signup, login };
