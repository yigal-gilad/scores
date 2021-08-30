var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var sale = require('../models/sales');

// allow admin/moderators to get the last 5 days sales:
router.post('/getsales', celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().required(),
    dates: Joi.any().required(),
  })
}), checkToken, async (req, res) => {
  if (!req.body.dates.length)
    return res.status(403).send("no dates provided");
  user.findById(req.body.token._id)
    .then((doc) => {
      if (!doc) return res.status(404).send("could not find user");
      if (!["admin", "moderator"].includes(doc.role))
        return res.status(403).send("access denied");
      sale.find({ date: { $in: req.body.dates } }).sort({$natural:-1})
        .then((doc1) => {
          return res.status(200).send(doc1);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("something went wrong...");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("something went wrong...");
    });
});

module.exports = router
