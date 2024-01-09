const userRouter = require("express").Router();
const user = require("../controllers/userController");
const { upload } = require("../middleware/imageStorage");

userRouter.post("/login", user.userLogin);
userRouter.post("/forgotpassword", user.forgetPassword);
userRouter.post("/resetpassword/:id/:token", user.resetPassword);
userRouter.post("/signup", upload.single("profilePic"), user.userSignup);

module.exports = userRouter;
