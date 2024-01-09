const commentSchema = require("../models/commentSchema");

// const addComment = async (req, res) => {
//   // console.log("......", req.body)
//   const commentData = new commentSchema(req.body);
//   // console.log("comment controller", commentData)
//   try {
//     if (commentData) {
//       commentData.userId = commentData.userId;
//       commentData.blogId = commentData.blogId;
//       await commentData.save();
//       res.status(201).json({
//         success: true,
//         message: "Comment added successfully",
//         comment: commentData,
//       });
//       // console.log("testing", commentData);
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Something went wrong",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error occur ${error.message}`,
//     });
//   }
// };

const addComment = async (req, res) => {
  const commentData = new commentSchema(req.body);
  try {
    if (commentData != null) {
      await commentData.save();
      res.status(201).json({
        status: true,
        message: "Comment Add successfully...",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};


const getComments = async (req, res) => {
  const blogId = req.params.id;
  console.log(blogId)
  try {
    const BlogData = await blogSchema.find({ blog_id: blogId });
    res.status(200).json({
      status: true,
      message: BlogData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const comment = await commentSchema.findById(req.params.id);
    if (comment !== null) {
      if (req.user._id == comment.userId.toString()) {
        await commentSchema.findByIdAndUpdate(req.params.id, req.body);
        res.status(202).json({
          success: true,
          message: "Comment update successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Yor are not authorized",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await commentSchema.findById(req.params.id);
    if (comment !== null) {
      if (req.user._id == comment.userId.toString()) {
        await commentSchema.findByIdAndDelete(req.params.id);
        res.status(203).json({
          success: true,
          message: "Comment deleted successfully",
        });
      } else {
        res.status(409).json({
          success: false,
          message: "You are not authorized",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { addComment, editComment, deleteComment, getComments };
