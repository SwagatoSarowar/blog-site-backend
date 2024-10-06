const router = require("express").Router();
const upload = require("../utils/multer");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.use(authController.protect);
router.get("/", userController.getUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(upload.single("profileImage"), userController.updateUser);

module.exports = router;
