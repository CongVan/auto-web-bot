const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  return res.json("Auto link server is started");
});

module.exports = router;
