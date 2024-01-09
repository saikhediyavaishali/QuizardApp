const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment : {
        type : String,
        require : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref: 'userData',
        require : true
    },
    blogId : {
        type : mongoose.Types.ObjectId,
        ref: 'blogData',
        require : true
    },
    isActive : {
        type : Boolean,
        require : true
    }
}) 
commentSchema.set('timestamps', true)

module.exports = mongoose.model('commentData', commentSchema)
