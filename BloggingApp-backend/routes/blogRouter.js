const blogRouter = require('express').Router()
const blog = require('../controllers/blogController')
const { upload } = require('../middleware/imageStorage')

blogRouter.get('/blogs', blog.allBlogs)
blogRouter.post('/likes/:id/', blog.blogLike)
blogRouter.get('/details/:id', blog.blogDetails)
blogRouter.delete('/delete/:id', blog.deleteBlog)
blogRouter.post('/create', upload.single('blogPic'), blog.createBlog)

module.exports = blogRouter
