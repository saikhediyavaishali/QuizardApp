const joi = require('joi')

const userSchema = joi.object({
    userName : joi.string().joi.required().min(6).max(12)
})