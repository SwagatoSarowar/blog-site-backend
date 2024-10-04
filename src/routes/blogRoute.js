const router = require("express").Router();
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");

router.route("/").get(blogController.getBlogs).post(
  /* authController.protect, */
  // blogController.uplodaBlogImage,
  blogController.createBlog
);

router.route("/:id").get(blogController.getBlog);

module.exports = router;
