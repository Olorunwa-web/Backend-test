const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const createError = require('../Utils/appError')



exports.signup = async (req, res, next) =>{
   try {
       const user = await User.findOne({ email: req.body.email})

       if (user) {
           return next (new createError('user already exists!', 400))
       }

       const hashedpassword = await bcrypt.hash(req.body.password, 12);

       const newUser = await User.create({
           ...req.body,
           password: hashedpassword
       })

       const token = jwt.sign({_id: newUser._id}, 'secretkey123' ,{
           expiresIn: '24h'
       })

       res.status(201).json({
           status: 'success',
           message: 'user registered successfully',
           token,
           user: {
               _id: newUser._id,
               firstName: newUser.firstName,
               email: newUser.email,
               role: newUser.role,
           }
       })
   } catch (error) {
       next(error)
   }
}



exports.signin = async (req, res, next) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if (!user) return next(new createError('User not found', 404));

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return next (new createError("invalid email or password", 401))
        }

        const token = jwt.sign({ id: user._id}, 'secretkey123' ,{
            expiresIn: '24h'
        })

        res.status(200).json({
           status: 'success',
           token,
           message: 'Logged in successfully',
           user : {
               _id: user._id,
               fullName: `${user.firstName} ${user.lastName}`,
               email: user.email,
               role: user.role
           }
        })
    } catch (error) {
        next(error)
    }
}