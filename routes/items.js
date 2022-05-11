const express = require("express");

const {
  creteNewItem,
  getProfileInformation,
  deleteItem,
  buyItem,
  getAllItems,
  modifyItem,
} = require("../controllers/itemFunctions");

const router = express.Router();

router.route("/").post(creteNewItem).get(getAllItems).patch(modifyItem);
router
  .route("/:id")
  .get(getProfileInformation)
  .delete(deleteItem)
  .patch(buyItem);

//  Checks if user in DB.

module.exports = router;
