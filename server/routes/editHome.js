var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var home = require('../models/home')


// only admin can edit the site home
router.post('/edithome', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        carousel: Joi.array().required(),
        categories: Joi.array().required(),
        about_us: Joi.string().required(),
        contact_us: Joi.string().required()
    })
}), checkToken, (req, res) => {

    user.findById(req.body.token._id)
        .then((doc) => {

            if (!doc) return res.status(404).send("could not find user");

            if (doc.role !== "admin")
                return res.status(403).send({ messege: "access denied" });

            home.findOne({})
                .then((doc1) => {
                    if (!doc1) return res.status(404).send("Fatal! can't find any home!!!");

                    doc1.carousel = req.body.carousel;
                    doc1.categories = req.body.categories;
                    doc1.about_us = req.body.about_us;
                    doc1.contact_us = req.body.contact_us;
                    doc1.save().then(function () {

                        return res.status(200).send({
                            messege:
                                "home successfully edited"
                        });
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).send("something went wrong...")
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...")
        });
});

module.exports = router;