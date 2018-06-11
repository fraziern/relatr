const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", storyController.homePage);
// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get("/add", storyController.addStory);

router.post(
  "/add",
  //   storeController.upload,
  //   catchErrors(storeController.resize),
  catchErrors(storyController.createStory)
);
// router.get('/stores/:id/edit', catchErrors(storeController.editStore));

// router.post(
//   '/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore)
// );

module.exports = router;
