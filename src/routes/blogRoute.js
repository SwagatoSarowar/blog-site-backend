const router = require("express").Router();
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const upload = require("../utils/multer");

router
  .route("/")
  .get(blogController.getBlogs)
  .post(
    authController.protect,
    upload.single("blogImage"),
    blogController.createBlog
  );

router.route("/:id").get(blogController.getBlog);

module.exports = router;
