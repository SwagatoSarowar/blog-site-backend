const router = require("express").Router();
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

router.use(authController.protect);

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    authController.restrictTo("admin", "super-admin"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
