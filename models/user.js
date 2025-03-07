const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const passwordComplexity = require('joi-password-complexity')
const Joi = require('joi')


const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLenght: [8, "Minimum password lenght must be 8 characters"],
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password must'nt contain password")
            }
        },
    },

})


// userSchema.methods.generateToken = function() {
//     const token = jwt.sign({_id: this._id}, process.env.JWT_SECRETE,{
//       expiresIn: '24h'
//      })

//      return token
// }

const User = mongoose.model('user', userSchema);



module.exports = User