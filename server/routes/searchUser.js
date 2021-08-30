var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');

// allow admin/moderators to search users
router.post('/searchuser', celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().required(),
    email: Joi.string(),
    mode: Joi.string().required()
  })
}), checkToken, async (req, res) => {
  if (!["email", "moneyback"].includes(req.body.mode))
    return res.status(403).send("invalid mode");
  user.findById(req.body.token._id)
    .then((doc) => {
      if (!doc) return res.status(404).send("could not find user");
      if (!["admin", "moderator"].includes(doc.role))
        return res.status(403).send("access denied");
      if (req.body.mode === "email") {
       
        if (!req.body.email) return res.status(400).send("missing target email");
        user.find({ email: req.body.email })
          .then((doc1) => {
            if (!doc1.length) return res.status(404).send("no results for this search");
            return res.status(200).send({ data: doc1 });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...");
          });
      } else if (req.body.mode === "moneyback") {
        user.find().where('mouneyBack').gt(0).then((doc1) => {
          if (!doc1.length) return res.status(404).send("no results for this search");
          return res.status(200).send({ data: doc1 });
        })
          .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("something went wrong...");
    });
});

module.exports = router

// find({ h: "true", $text: { $search: req.body.email.replace('', '') } },
//           { score: { $meta: "textScore" } })
//           .sort({ score: { $meta: "textScore" } })