const Joi = require('joi');

const validateSignup = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

const validateEntry = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    sleep: Joi.number().min(0),
    calories: Joi.number().min(0),
    steps: Joi.number().min(0),
    mood: Joi.string().valid('happy','neutral','sad','angry')
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

module.exports = { validateSignup, validateLogin, validateEntry };
