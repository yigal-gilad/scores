var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var settings = require('../models/settings');
var product = require('../models/product')
var formatDate = require('../fuctions/formatdate')
var product = require('../models/product')

// save users new product
router.post('/saveproduct', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        product: Joi.any().required()
    })
}), checkToken, (req, res) => {

    user.findById(req.body.token._id)
        .then((doc) => {
            if (!doc) return res.status(404).send("could not find user");
            if (doc.isbanned)
                return res.status(403).send("acess denied: banned users can't add products");
            if (doc.role === 'user')
                return res.status(403).send("acess denied: only admins/moderators can add products");
            var Product = new product({
                publishDate: formatDate(new Date),
                title: req.body.product.title,
                description: req.body.product.description,
                mainImage: req.body.product.mainImage,
                images: req.body.product.images,
                price: req.body.product.price,
                oldPrice: req.body.product.oldPrice,
                discountPresent: req.body.product.discountPresent,
                shippingPrice: req.body.product.shippingPrice,
                shippingTime: req.body.product.shippingTime,
                shippingFrom: req.body.product.shippingFrom,
                shippingLimit: req.body.product.shippingLimit,
                condition: req.body.product.condition,
                keyWords: req.body.product.keywords,
                stock: req.body.product.stock,
                // paymentCurrency: "USD",
                isEvedible: true,
                sold: 0,
                unique: 0
            });
            Product.save().then(function () {
                return res.status(200).send({ messege: "New product saved" });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...");
        });
});

module.exports = router;