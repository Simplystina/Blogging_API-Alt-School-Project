const joi = require("joi")

const validateBlogMiddleware = async(req,res,next)=>{
    const bookPayload = req.body
    try {
        await bookValidator.validateAsync(bookPayload)
        next()
    } catch (error) {
        console.log(error)
        return res.status(406).send(error.details[0].message)
    }
}

const blogValidator = joi.object({
    email: joi.string()
    .required()
   ,
    firstName: joi.string()
    .min(5)
    .max(50)
    .required(),
    lastName: joi.string()
    .min(5)
    .max(50)
    .required(),
    password: joi.string()
    .required
})

module.exports = validateBlogMiddleware