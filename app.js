const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")

const authRouter = require("./routes/auth")
const blogRouter = require("./routes/blog")
const BlogController = require("./controllers/blog")
require("dotenv").config()
require("./middleware/Auth") // for authentication




const app = express()


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())


app.use('/',authRouter)
app.use('/blog',  passport.authenticate('jwt', {session:false}),blogRouter)


//Get all Published blogs
app.get('/blogs', BlogController.getAllBlogs)
app.get('/',(req,res)=>{
    res.status(200).send({status:true})
})


app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

module.exports = app;
