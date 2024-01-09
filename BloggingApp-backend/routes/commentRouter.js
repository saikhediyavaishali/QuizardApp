const commentRouter = require('express').Router()
const comment = require('../controllers/commentController')

commentRouter.post('/add/:id', comment.addComment)
commentRouter.post('/show/:id', comment.getComments)
commentRouter.patch('/edit/:id', comment.editComment)
commentRouter.delete('/delete/:id', comment.deleteComment)

module.exports = commentRouter
