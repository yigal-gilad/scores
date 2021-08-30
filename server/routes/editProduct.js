var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var product = require('../models/product')


// admin/moderators can modify products from here
router.post('/editproduct', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        target_id: Joi.string().required(),
        changes: Joi.any().required()
    })
}), checkToken, (req, res) => {
    user.findById(req.body.token._id)
        .then((doc) => {

            if (!doc) return res.status(404).send("could not find user");

            if (!["admin", "moderator"].includes(doc.role))
                return res.status(403).send({ messege: "access denied" });

            product.findById(req.body.target_id)
                .then((doc1) => {
                    if (!doc1) return res.status(404).send("could target not find tpurnament");
                    doc1.title = req.body.changes.title,
                        doc1.description = req.body.changes.description,
                        doc1.mainImage = req.body.changes.mainImage,
                        doc1.images = req.body.changes.images,
                        doc1.price = req.body.changes.price,
                        doc1.oldPrice = req.body.changes.oldPrice,
                        doc1.discountPresent = req.body.changes.discountPresent,
                        doc1.shippingPrice = req.body.changes.shippingPrice,
                        doc1.shippingTime = req.body.changes.shippingTime,
                        doc1.shippingFrom = req.body.changes.shippingFrom,
                        doc1.shippingLimit = req.body.changes.shippingLimit,
                        doc1.condition = req.body.changes.condition,
                        doc1.keyWords = req.body.changes.keyWords,
                        doc1.stock = req.body.changes.stock,
                        doc1.isEvedible = req.body.changes.isEvedible


                    doc1.save().then(function () {
                        return res.status(200).send({
                            messege:
                                "Product successfully edited"
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