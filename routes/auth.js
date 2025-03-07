const router = require("express").Router()
const authController = require("../controller/authController")
// const Joi = require('joi');
// const bcrypt = require('bcrypt')



router.post('/signup', authController.signup)
router.post ('/signin', authController.signin)


module.exports = router;