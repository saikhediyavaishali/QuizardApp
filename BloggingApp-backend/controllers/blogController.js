const blogSchema = require("../models/blogSchema");
const commentSchema = require("../models/commentSchema");

const createBlog = async (req, res) => {
  // console.log(req.body);
  // console.log("userId",req.body.userId);
  const blogData = new blogSchema(req.body);
  try {
    if (blogData) {
      if (req.file !== undefined) {
        const filePath = `/uploads/${req.file.filename}`;
        blogData.blogPic = filePath;
        //blogData.blogPic = req.file.path;
      }
      blogData.userId = req.body.userId;
      await blogData.save();
      res.status(201).json({
        success: true,
        message: "Blog published successfully",
        blog: blogData,
      });
      console.log(blogData)
    } else {
      res.status(402).json({
        success: false,
        message: "All fields required",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`, 
    });
  }
};

const allBlogs = async (req, res) =>{
  try {
    const blogs = await blogSchema.find()
    .populate({
              path: "userId",
              select: "userName profilePIc",
            });
            // console.log(userId);
    const totalBlogs = await blogSchema.find().count();
    res.status(200).json({
      success: true,
      message: "All blogs found successfully!",
      count: totalBlogs,
      blog: blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// const allBlogs = async (req, res) => {
//   try {
//     const blogs = await blogSchema
//       .find(
//         {
//         $or: [
//           { title: { $regex: req.query.search, $options: "i" } },
//           { description: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//       )
//       .populate({
//         path: "userId",
//         select: "userName profilePIc",
//       });
//     if (blogs[0] !== undefined) {
//       res.status(200).json({
//         success: true,
//         message: "All blog fetched successfully",
//         blog: blogs,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Blogs not available",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error occur ${error.message}`,
//     });
//   }
// };

const deleteBlog = async (req, res) => {
  try {
    const deleteBlog = await blogSchema.findByIdAndDelete(req.params.id);
    if (deleteBlog) {
      res.status(202).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const blogLike = async (req, res) => {
  const { like } = req.query;
  console.log(like);
  try {
    const blog = await blogSchema.findById(req.params.id);
    if (like == "true") {
      await blogSchema.findByIdAndUpdate(
        req.params.id,
        { like: ++blog.like },
        { new: true }
      );
      res.status(202).json({
        success: true,
        message: "You have liked this blog",
        like: blog.like,
      });
    } else {
      await blogSchema.findByIdAndUpdate(
        req.params.id,
        { like: --blog.like },
        { new: true }
      );
      res.status(202).json({
        success: true,
        message: "You have disliked this blog",
        like: blog.like,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const blogDetails = async (req, res) => {
  console.log("Blog details api")
  try {
    const blogData = await blogSchema
      .findById(req.params.id)
      .populate({ path: "userId", select: "userName profilePic" });
    const commentData = await commentSchema
      .find({ blogId: req.params.id })
      .populate({ path: "userId", select: "userName profilePic" });
    if (blogData !== null) {
      res.status(200).json({
        success: true,
        message: "Fetched blog details",
        blog: blogData,
        comment: commentData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { createBlog, allBlogs, deleteBlog, blogLike, blogDetails };
