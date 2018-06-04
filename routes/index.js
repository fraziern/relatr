const express = require("express");
const router = express.Router();
const msgController = require("../controllers/msgController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", catchErrors(msgController.homePage));
// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/stores/page/:page', catchErrors(storeController.getStores));
// router.get('/add', authController.isLoggedIn, storeController.addStore);

// router.post(
//   '/add',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.createStore)
// );
// router.get('/stores/:id/edit', catchErrors(storeController.editStore));

// router.post(
//   '/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore)
// );

module.exports = router;
