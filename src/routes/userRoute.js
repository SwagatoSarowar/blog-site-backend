const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.use(authController.protect);
router.get("/", userController.getUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(/* userController.uploadProfileImage, */ userController.updateUser);

module.exports = router;
