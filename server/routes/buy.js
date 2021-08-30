var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var env = require('../readenv');
var formatDate = require('../fuctions/formatdate')
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var settings = require('../models/settings');
var product = require('../models/product');
var sale = require('../models/sales');

router.post('/buy', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        cart: Joi.any().required()
    })
}), checkToken, (req, res) => {

    user.findById(req.body.token._id)
        .then((doc) => {

            if (!doc) return res.status(404).send({ messege: "could not find user, no money charged." });
            if (doc.isbanned) return res.status(403).send({ messege: "banned users can't preform this action, no money charged." });
            settings.findOne({})
                .then((set) => {

                    if (!set) return res.status(500).send({ messege: "something went wrong..." });
                    if (set.paymentdisabled) return res.status(403).send({ messege: "payment system disabled, no money charged." });
                    var index = 0;
                    var sum = 0;
                    var reco = function () {
                        if (req.body.cart.length > index) {
                            product.findById(req.body.cart[index].product._id)
                                .then((doc2) => {
                                    if (doc2 && doc2.stock > 0) {
                                        if (req.body.cart[index].amount > doc2.stock) {
                                            return res.status(403).send({ messege: "one or more of the products in this order is missing, no money charged." });
                                        } else {
                                            doc2.stock -= req.body.cart[index].amount;
                                            doc2.sold += req.body.cart[index].amount;
                                            if (req.body.cart[index].amount > 1) {
                                                doc2.unique += 1;
                                            }
                                            doc2.save().then(function () {
                                                sum += doc2.price * req.body.cart[index].amount
                                                    + doc2.shippingPrice;
                                                index += 1;
                                                reco();
                                            });
                                        }
                                    } else {
                                        return res.status(403).send({ messege: "one or more of the products in this order is missing, no money charged." });
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.status(500).send();
                                });
                        } else {
                            // console.log("end of reco: " + index);
                            var Sale = new sale({
                                date: formatDate(new Date),
                                sum: sum
                            });
                            Sale.save().then(function () {
                                return res.status(200).send({ messege: "purchased successfully" });
                            });
                        }
                    }
                    reco();


                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).send({ messege: "something went wrong... no money charged." });
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ messege: "something went wrong... no money charged." });
        });
});

module.exports = router;
