const express = require('express')

const BlogController = require("../controllers/blog")

const blogRouter = express.Router()

blogRouter.post('/',BlogController.createBlog)

blogRouter.get('/',BlogController.getBlogs)

blogRouter.put('/:id', BlogController.updateBlog)

blogRouter.delete("/:id", BlogController.deleteBlog)

blogRouter.get('/:id',BlogController.getBlog)
module.exports = blogRouter