var express = require('express');

var router = express.Router();

var home = require("../models/home")

router.get('/gethome', (req, res) => {
  home.findOne({}).then((doc) => {
    if (!doc) return res.status(500).send("something went wrong...");
    return res.status(200).send(doc);
  })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("something went wrong...");
    });
});

module.exports = router;