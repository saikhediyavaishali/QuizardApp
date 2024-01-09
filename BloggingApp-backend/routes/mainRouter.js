const router = require('express').Router()
const userRouter = require('../routes/userRouter')
const blogRouter = require('../routes/blogRouter')
const commentRouter = require('./commentRouter')
const validateToken = require('../middleware/validateToken')

router.use('/user', userRouter)
//router.use(validateToken)
router.use('/blog', blogRouter)
router.use('/comment', commentRouter)

module.exports = router
