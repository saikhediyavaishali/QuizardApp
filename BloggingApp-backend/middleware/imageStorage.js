const { diskStorage } = require("multer");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: diskStorage({
    destination : (req, file, callback) =>{
      callback(null,path.join(__dirname, "..","/uploads"));
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  }),
});

module.exports = { upload };
